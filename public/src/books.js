function findAuthorById(authors, id) {
  let result = {};
  authors.forEach(author => {
    if (author.id == id) {
      result = author;
    }
  })
  return result
}

function findBookById(books, id) {
  let result = {};
  books.forEach(book => {
    if (book.id == id) {
      result = book;
    }
  })
  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let borrowedBooks = [];
  let availableBooks = [];
  books.forEach((book) =>
    book.borrows[0].returned == false
      ? borrowedBooks.push(book)
      : availableBooks.push(book)
  );
  result.push(borrowedBooks, availableBooks);
  return result;
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.map((borrow) => {
    let account = accounts.find((account) => account.id === borrow.id);
    return {...account, returned: borrow.returned};
  }).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
