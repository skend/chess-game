import { Component, OnInit } from '@angular/core';
import { SquareSize, Color } from '../other/constants';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  squareSize = SquareSize;
  Color = Color;

  squareNums = [];
  squareLetters = [];

  constructor(private boardService: BoardService) {
    console.log(this.boardService.boardData);
  }

  squareClicked(event: any, square: any) {
    this.boardService.squareSelected(square);
  }

  ngOnInit() {
    this.boardService.generateBoardData();
    this.squareNums = Object.keys(this.boardService.boardData);
    this.squareLetters = Object.keys(this.boardService.boardData[this.squareNums[0]]);
    this.boardService.generatePieceData();
  }

}
