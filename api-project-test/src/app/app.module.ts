import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//import { PopupModule } from 'ng2-opd-popup';

//import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AddViewComponent } from './add-view/add-view.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';
import { TestService } from './test.service';
import { Routes, RouterModule } from '@angular/router';



const appRoutes: Routes = [
  
  { path: 'add-view', component: AddViewComponent },
  { path: 'edit-view', component: EditViewComponent },
  { path: 'transaction-view', component: TransactionViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AddViewComponent,
    EditViewComponent,
    TransactionViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
    

  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
