import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-view',
  templateUrl: './add-view.component.html',
  styleUrls: ['./add-view.component.css']
})
export class AddViewComponent implements OnInit {

  constructor(private myFirstService: TestService, private myAppComponent: AppComponent) { }

  books = [];
  public createBook(BookName, AuthorName, ISBNCode, numberOf_books, PublishDate, Category) {

    let book = {} as any;
    book.BookName = BookName;
    book.AuthorName = AuthorName;
    book.IsbnCode = ISBNCode;
    book.NumberOf_Books = numberOf_books;
    book.PublishDate = PublishDate;
    book.Category = Category;
    book.NumberOf_Books_Issued = 0;

    this.myFirstService.createBook(book).subscribe(data => {
      console.log(data);
      this.myAppComponent.ngOnInit();
    });
  }

  ngOnInit() {

  }
}
