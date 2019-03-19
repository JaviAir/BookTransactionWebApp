import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  buttonWasClicked = false;
  bc = 0;
  buttonClickLog = [];

  onDisplay() {

    this.buttonWasClicked = !this.buttonWasClicked;

    this.bc++;

    //this.buttonClickLog.push(this.bc);
    this.buttonClickLog.push(new Date());
  }

}
