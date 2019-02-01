import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get('https://localhost:5001/api/shop');
  }

  createBook(book) {
    return this.http.post('https://localhost:5001/api/shop', book);
  }

  editBook(bookId, numberOf_books) {
    return this.http.put('https://localhost:5001/api/shop/' + bookId + '/' + numberOf_books, '');
  }

  deleteBook(bookId) {
    return this.http.delete('https://localhost:5001/api/shop/' + bookId);
  }

  //BookTransaction Calls

  getBookTransactions(bookId) {
    return this.http.get('https://localhost:5001/api/shop/transaction-view/' + bookId);
  }

  createBookTransaction(bookId) {
    return this.http.post('https://localhost:5001/api/shop/transaction-create/' + bookId, '');

  }

  returnBookTransaction(bookId, transactionId) {
    
    return this.http.post('https://localhost:5001/api/shop/transaction-return/' + bookId + '/' + transactionId, '');    

  }


}



