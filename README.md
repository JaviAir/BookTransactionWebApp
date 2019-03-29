# BookTransactionWebApp
Web application that handles Book Transactions using Angular 7 for the front-end and ASP.NET Core for the back-end.


This C.R.U.D web app allows the user to add, read, edit, and delete books and their respective book transactions.

Books:
The user can 
        add a book.
        edit the number of books.
        delete the book listing.
        and view all the transactions of that book.
        
Book Transactions:
The user can
        create a book transaction by issuing a book.
        and edit transactions by returning already issued books.
        
Conditions:
  The number of books can not be less than the number of books issued.
  If no books are issued then that book listing can be deleted.



In the API, UI threads call the controller that populates the model and returns the values to the view.
