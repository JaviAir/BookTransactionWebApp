using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FirstWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {

        private static IList<Book> _books = null;
        private static IList<BookTransaction> _bookTransactions = null;

        public ShopController()
        {
            if (_books==null) {
                _books = new List<Book>();
                _books.Add(new Book
                {
                    BookId = Guid.NewGuid().ToString(),
                    BookName = "bookname1",
                    AuthorName = "aname1;",
                    IsbnCode = 111,
                    NumberOf_Books = 1,
                    PublishDate = "date1",
                    Category = "category1",
                    NumberOf_Books_Issued = 0
                });

                _books.Add(new Book
                {
                    BookId = Guid.NewGuid().ToString(),
                    BookName = "bookname2",
                    AuthorName = "aname2;",
                    IsbnCode = 222,
                    NumberOf_Books = 2,
                    PublishDate = "date2",
                    Category = "category2",
                    NumberOf_Books_Issued = 0
                });

                _books.Add(new Book
                {
                    BookId = Guid.NewGuid().ToString(),
                    BookName = "bookname3",
                    AuthorName = "aname3;",
                    IsbnCode = 333,
                    NumberOf_Books = 3,
                    PublishDate = "date3",
                    Category = "category3",
                    NumberOf_Books_Issued = 0
                });
            }

            if (_bookTransactions == null)
            {
                _bookTransactions = new List<BookTransaction>();

            }


        }
    
        // GET api/shop
        [HttpGet]
        public ActionResult<List<Book>> Books() {

            return new ObjectResult(_books);

        }

        [HttpGet("transaction-view/{bookId}")]
        public ActionResult<List<BookTransaction>> BookTransactions(string bookId)
        {
            IList<BookTransaction> tempList = new List<BookTransaction>();

            foreach (var bt in _bookTransactions)
            {
                if (bookId == bt.BookId)
                {
                    tempList.Add(bt);
                }
            }
            return new ObjectResult(tempList);
        }

        // POST api/shop
        [HttpPost]
        public ActionResult<string> Book([FromBody] Book b)
        {
            _books.Add(new Book {

                BookId = Guid.NewGuid().ToString(),
                BookName = b.BookName,
                AuthorName = b.AuthorName,
                IsbnCode = b.IsbnCode,
                NumberOf_Books = b.NumberOf_Books,
                PublishDate = b.PublishDate,
                Category = b.Category,
                NumberOf_Books_Issued = b.NumberOf_Books_Issued
            });
            return "{\"BookName\":\"POST\"}";
            
        }

        [HttpPost("transaction-create/{bookId}")]
        public ActionResult<string> CreateBookTransaction(string bookId)
        {
            int bookQuantity = 0;

            foreach (var book in _books)
            {
                if (bookId == book.BookId)
                {
                    bookQuantity = book.NumberOf_Books;
                    if (bookQuantity > 0 && book.NumberOf_Books_Issued < bookQuantity)
                    {
                        _bookTransactions.Add(new BookTransaction
                        {
                            BookId = bookId,
                            TransactionId = Guid.NewGuid().ToString(),
                            TransactionDateCreated = DateTime.Now,
                            TransactionType = "Issue",
                            TransactionDateTyped = DateTime.Now
                        });
                        book.NumberOf_Books_Issued = book.NumberOf_Books_Issued + 1;
                        break;
                    }
                }               
            }
            return "{\"BookTransactionStatus\":\"ISSUED\"}";
        }

        [HttpPost("transaction-return/{bookId}/{transactionId}")]
        public ActionResult<string> ReturnBookTransaction(string bookId, string transactionId)
        {

            foreach (var book in _books)
            {
                if (bookId == book.BookId)
                {
                    if (book.NumberOf_Books_Issued == 0)
                    {
                        break;
                    }
                    else
                    {
                        book.NumberOf_Books_Issued = book.NumberOf_Books_Issued - 1;
                        break;
                    }                    
                }                
            }
            foreach (var bt in _bookTransactions)
            {
                if (transactionId == bt.TransactionId)
                {
                    bt.TransactionType = "Return";
                }
            }
            return "{\"BookTransactionStatus\":\"RETURNED\"}";
        }

        // PUT api/shop/id/quantity
        [HttpPut("{bookId}/{numberOf_books}")]
        public ActionResult<string> Book(string bookId, int numberOf_books)
        {
            foreach (var book in _books)
            {
                if (bookId == book.BookId)
                {
                    book.NumberOf_Books = numberOf_books;
                    break;
                }
            }
            return "{\"BookName\":\"PUT\"}";
        }

        // DELETE api/shop/id
        [HttpDelete("{bookId}")]
        public ActionResult<string> Book(string bookId)
        {
            foreach (var book in _books)
            {
                if (bookId == book.BookId && book.NumberOf_Books_Issued == 0)
                {                  
                    _books.Remove(book);
                    break;
                }
            }
            return "{\"BookName\":\"DELETE "+ bookId + " \"}";
        }
    }

    public class Book
    {
        public string BookId { get; set; }

        public string BookName { get; set; }

        public string AuthorName { get; set; }

        public int IsbnCode { get; set; }

        public int NumberOf_Books { get; set; }

        public string PublishDate { get; set; }

        public string Category { get; set; }

        public int NumberOf_Books_Issued { get; set; }
    }

    public class BookTransaction
    {
        public string BookId { get; set; }

        public string TransactionId { get; set; }

        public DateTime TransactionDateCreated { get; set; }

        public string TransactionType { get; set; }

        public DateTime TransactionDateTyped { get; set; } 
    }

}
