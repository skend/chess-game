import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Color } from '../other/constants';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) {
    gameService.subscribeToEvents();
  }

  getPieceColor() {
    return this.gameService.color != null ? Color[this.gameService.color] : '';
  }

  ngOnInit() {
  }

}
