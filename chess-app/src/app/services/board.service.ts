import { Injectable } from '@angular/core';
import { Point } from '../other/point';
import { ValidMoves, PiecePositions, Color } from '../other/constants';
import { Piece } from '../other/piece';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boardData = {};
  letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  selectedSquare1 = null;
  canPlay = false;

  constructor(private socketService: SocketService) {
    console.log('Board service running.');
  }

  generateBoardData() {
    let dark = true;
    for (let i = 8; i > 0; i--) {
      const row = {};
      for (const letter of this.letters) {
        row[letter] = {
          id: letter + i, piece: null, color: dark ? 'dark' : 'light', selected: false, point: this.squareToPoint(letter + i)
        };
        dark = !dark;
      }
      this.boardData['_' + i] = row;
      dark = !dark;
    }
  }

  generatePieceData() {
    if (Object.keys(this.boardData).length === 0 && this.boardData.constructor === Object) {
      this.generateBoardData();
    }

    for (let i = 8; i > 0; i--) {
      for (const letter of this.letters) {
        if (PiecePositions['_' + i][letter].piece != null) {
          this.boardData['_' + i][letter].piece = new Piece(PiecePositions['_' + i][letter].piece, PiecePositions['_' + i][letter].color);
        }
      }
    }
  }

  squareSelected(square) {
    console.log(square.id, this.selectedSquare1);
    if (!this.canPlay) {
      return;
    }

    if (this.selectedSquare1 === null) {
      if (square.piece !== null) {
        this.boardData['_' + square.id.charAt(1)][square.id.charAt(0)].selected = true;
        this.boardData['_' + square.id.charAt(1)][square.id.charAt(0)].color += ' selected';
        this.selectedSquare1 = square;
      } else {
        this.selectedSquare1 = null;
      }
    } else {
      console.log('move piece');
      this.movePiece(this.selectedSquare1, square);
      this.boardData['_' + this.selectedSquare1.id.charAt(1)][this.selectedSquare1.id.charAt(0)].selected = false;
      this.boardData['_' + this.selectedSquare1.id.charAt(1)][this.selectedSquare1.id.charAt(0)].color =
        this.boardData['_' + this.selectedSquare1.id.charAt(1)][this.selectedSquare1.id.charAt(0)].color.replace(' selected', '');
      this.selectedSquare1 = null;
      console.log(this.boardData);
    }
  }

  // will return the piece object that was taken (if there is one)
  movePiece(from, to) {
    if (!this.isValidMove(from, to)) {
      console.log('invalid move');
      return;
    }

    this.boardData['_' + to.id.charAt(1)][to.id.charAt(0)].piece =
        this.boardData['_' + from.id.charAt(1)][from.id.charAt(0)].piece;
    this.boardData['_' + from.id.charAt(1)][from.id.charAt(0)].piece = undefined;

    this.socketService.sendMove({
      piece: this.boardData['_' + to.id.charAt(1)][to.id.charAt(0)].piece.name,
      color: Color[this.boardData['_' + to.id.charAt(1)][to.id.charAt(0)].piece.color],
      from_square: from.id,
      to_square: to.id
    });
  }

  updateBoard(from, to) {
    console.log('from: ' + from);
    console.log('to: ' + to);

    this.boardData['_' + to.charAt(1)][to.charAt(0)].piece =
      this.boardData['_' + from.charAt(1)][from.charAt(0)].piece;
    this.boardData['_' + from.charAt(1)][from.charAt(0)].piece = undefined;
  }

  isValidMove(from, to): boolean {
    // TODO: check for blocking pieces (knights can jump pieces)
    // TODO: can't take same color pieces
    // TODO: would this result in check/checkmate

    const validMoves = this.getValidMovesForPiece(from.piece.name);
    console.log(validMoves);

    const translation = new Point(to.point.x - from.point.x, to.point.y - from.point.y);
    for (const move of validMoves) {
      if (move.x === translation.x && move.y === translation.y) {
        return true;
      }
    }

    return false;
  }

  getValidMovesForPiece(piece: string): Point[] {
    const points = [];
    for (const item of ValidMoves[piece]) {
      if (item.constructor.name === 'Point') {
        points.push(item);
      } else {
        for (const point of item.getPoints()) {
          points.push(point);
        }
      }
    }
    return points;
  }

  getBoardData() {
    return this.boardData;
  }

  squareToPoint(square: string) {
    return new Point(square.charCodeAt(0) - 97, parseInt(square.charAt(1), 10) - 1);
  }

}
