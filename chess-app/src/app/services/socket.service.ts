import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor() {
    console.log('Socket created.');
    this.socket = io('http://localhost:3000');
  }

  sendMove(move) {
    console.log('send');
    this.socket.emit('player_move', move);
  }

  getMove() {
    return fromEvent(this.socket, 'player_move');
  }

  getConnectedInfo() {
    return fromEvent(this.socket, 'player_join');
  }

  onGameStart() {
    return fromEvent(this.socket, 'game_start');
  }

  manualSocketDisconnect() {
    this.socket.emit('manual-disconnection', this.socket.id);

    this.socket.close();

    console.log('Socket Closed. ');
  }
}
