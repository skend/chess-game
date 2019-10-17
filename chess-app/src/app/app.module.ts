
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameService } from './services/game.service';
import { BoardService } from './services/board.service';
import { SocketService } from './services/socket.service';
import { GameComponent } from './game/game.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    GameService,
    BoardService,
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
