import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent implements OnInit {

  constructor(private myFirstService: TestService, private myAppComponent: AppComponent) { }
  books = [];

  onEditId;
  onEditIsbn;
    
  ngOnInit() {
    this.onEditId = this.myAppComponent.onEditBookId;
    this.onEditIsbn = this.myAppComponent.onEditBookIsbn;
  }

  warning_message = "";
  enableSave;

  checkInput(numberOfBooksInput) {
    if (numberOfBooksInput < this.myAppComponent.onEditnumberOfBooks_Issued) {
      this.warning_message = "Warning: # of books cannot go below # of books issued.";
      this.enableSave = false;
    } else {
      this.enableSave = true;
    }
  }

  public saveBook(numberOf_books) {
    if (this.enableSave) {
        var bookId = this.onEditId;
        this.myFirstService.editBook(bookId, numberOf_books).subscribe(data => {
          console.log(data);
          this.myAppComponent.ngOnInit();
          this.onEditId = 0;
      });      
    }
  }
}
