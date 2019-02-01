import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent implements OnInit {

  transactions;
  
  constructor(private myFirstService: TestService, private myAppComponent: AppComponent, private myModalService: NgbModal) { }

  onTransactionBookId;
  onTransactionBookIsbn;
  onTransactionNumberOf_Books_Issued;
  onTransactionDateCreated;
  onTransactionType;
  onTransactionDateTyped;

  modalBookId;
  transactionDateCreated;
  transactionType;
  transactionDateTyped;

  ngOnInit() {
    this.onTransactionBookId = this.myAppComponent.onTransactionBookId;
    this.onTransactionBookIsbn = this.myAppComponent.onTransactionBookIsbn;
    this.onTransactionNumberOf_Books_Issued = this.myAppComponent.onTransactionNumberOfBooks_Issued;
    
    //fetchList to populate transacitons array
    this.myFirstService.getBookTransactions(this.onTransactionBookId).subscribe(data => {
      this.transactions = data;
      this.fillModalBody();
      this.disablePopupMethod();
      this.enablePopupMethod();
    });
  }


  fillModalBody() {
    for (let transaction of this.transactions) {
      if (this.myAppComponent.onTransactionBookId == transaction.bookId) {
        this.onTransactionDateCreated = transaction.transactionDateCreated;
        this.onTransactionType = transaction.transactionType;
        this.onTransactionDateTyped = transaction.transactionDateTyped;
      }
    }
    this.modalBookId = this.onTransactionBookId;
    this.transactionDateCreated = this.onTransactionDateCreated;
    this.transactionType = this.onTransactionType
    this.transactionDateTyped = this.onTransactionDateTyped;
  }

  disablePopup = false;

  disablePopupMethod() {
    for (let book of this.myAppComponent.books) {
      if (this.onTransactionBookId == book.bookId) {
        if (book.numberOf_Books_Issued == book.numberOf_Books) {
          console.log(book.numberOf_Books_Issued);
          console.log(book.numberOf_Books);
          this.disablePopup = true;
          break;
        }
        break;
      }
    }
  }

  enablePopupMethod() {
    for (let book of this.myAppComponent.books) {
      if (this.onTransactionBookId == book.bookId) {
        if (book.numberOf_Books_Issued < book.numberOf_Books) {
          console.log(book.numberOf_Books_Issued);
          console.log(book.numberOf_Books);
          this.disablePopup = false;
          break;
        }
      }
    }
  }
  
  createBookTransaction(Popup) {

    this.disablePopupMethod();

    this.myFirstService.createBookTransaction(this.onTransactionBookId).subscribe(data => {
      this.refreshList();
      this.myAppComponent.ngOnInit();
      this.myModalService.open(Popup, { centered: true });      

    });

  }

  closeModalPopup() {
    this.myModalService.dismissAll();
  }

  openEdit(Popup) {
    this.myModalService.open(Popup, { centered: true });
  }

  editBookTransaction(transactionId, editPopup) {

    this.myFirstService.returnBookTransaction(this.onTransactionBookId, transactionId).subscribe(data => {
      this.myModalService.open(editPopup, { centered: true });
      this.refreshList();
      this.myAppComponent.ngOnInit();
      this.fillModalBody();
      this.enablePopupMethod();
    });
  }


  refreshList() {
    this.onTransactionBookId = this.myAppComponent.onTransactionBookId;
    this.myFirstService.getBookTransactions(this.onTransactionBookId).subscribe(data => {
      this.transactions = data;
      this.fillModalBody();
      //this.disablePopupMethod();
      
    });
  }

}
