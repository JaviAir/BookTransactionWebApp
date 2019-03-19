import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() timeStarted = new EventEmitter<{gameTime: number}>();
  gameTime = 0;
  intervalRef;
  constructor() { }

  ngOnInit() {
  }

  startGame() {
     this.intervalRef = setInterval(this.eventFunction, 1000);
  }

  eventFunction = () => {
    this.timeStarted.emit({
      gameTime: this.gameTime++
    });
  }

  stopGame() {
    clearInterval(this.intervalRef);
  }

}
