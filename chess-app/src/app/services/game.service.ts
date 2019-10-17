import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Color } from '../other/constants';
import { BoardService } from './board.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  id: string = null;
  color: Color = null;
  isTurn = false;
  canPlay = false;

  constructor(private socketService: SocketService, private boardService: BoardService) {
    console.log('Game service running.');
    // this.id = gameData.id;
    // this.color = gameData.color == 'white' ? Color.LIGHT : Color.DARK;
  }

  subscribeToEvents() {
    this.socketService.getConnectedInfo().pipe(take(1)).subscribe(
      res => this.onJoin(res),
      err => console.error('error', err)
    );

    this.socketService.onGameStart().pipe(take(1)).subscribe(
      res => this.startGame(),
      err => console.error('error', err)
    );

    this.socketService.getMove().subscribe(
      res => this.playerMoved(res),
      err => console.error('error', err)
    );
  }

  playerMoved(res) {
    if (Color[res.color] == this.color.toString()) {
      return;
    }

    this.boardService.updateBoard(res.from_square, res.to_square);
    this.isTurn = !this.isTurn;
    this.boardService.canPlay = this.isTurn;
  }

  startGame() {
    this.canPlay = true;
    this.isTurn = this.color === Color.LIGHT;
    this.boardService.canPlay = this.canPlay && this.isTurn;
  }

  onJoin(res) {
    if (this.id !== null) {
      return;
    }

    console.log('response', res);
    if (res.success) {
      this.id = res.id;
      this.color = res.color === 'white' ? Color.LIGHT : Color.DARK;
    } else {
      console.error('Failed to join game successfully: ' + res.reason);
    }
  }

}
