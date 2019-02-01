import { Component } from '@angular/core';
import { TestService } from './test.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books;

  constructor(private myFirstService: TestService, private router: Router) {

  }

  onEditnumberOfBooks_Issued = 0;
  onEditBookId = "empty";
  onEditBookIsbn = 0;

  public editBook(bookId, numberOf_Books_Issued) {
    this.router.navigate(['/']).then(data => { this.router.navigate(['edit-view']) });
    for (let book of this.books) {
      if (bookId == book.bookId) {
        this.onEditBookId = bookId;
        this.onEditBookIsbn = book.isbnCode;
        this.onEditnumberOfBooks_Issued = numberOf_Books_Issued;
      }
    }
  }

  public deleteBook(bookId) {
    this.myFirstService.deleteBook(bookId).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });    
  }

  onTransactionNumberOfBooks_Issued = 0;
  onTransactionBookId = "empty";
  onTransactionBookIsbn = 0;

  public showBookTransactions(bookId, numberOf_Books_Issued) {
    this.router.navigate(['/']).then(data => { this.router.navigate(['transaction-view'])});
    for (let book of this.books) {
      if (bookId == book.bookId) {
        console.log(bookId);
        this.onTransactionBookId = bookId;
        this.onTransactionBookIsbn = book.isbnCode;
        this.onTransactionNumberOfBooks_Issued = numberOf_Books_Issued;
      }
    }
  }

  ngOnInit() {
    this.myFirstService.getBooks().subscribe(data => {
      console.log(data);
      this.books = data;
      
    });
  }

}
