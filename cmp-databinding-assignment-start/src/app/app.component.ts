import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  printEven;
  printOdd;

  gameTimer(eventData: {gameTime: number}) {

  const currentNumber = (eventData.gameTime + 1);

  if (currentNumber % 2 === 0) {

    this.printEven = ('Even - ' + currentNumber);
  } else {

    this.printOdd = ('Odd - ' + currentNumber);
  }


  }

}
