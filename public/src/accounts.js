function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() < nameB.name.last.toLowerCase() ? -1 : 1
  );
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id)
      result += 1;
    });
  });
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowedBooks = books.filter((book) =>
    book.borrows.find((borrow) =>
    borrow.returned === false && borrow.id === account.id
    )
  );
  return borrowedBooks.map((book) => {
    return {
      ...book,
      author: authors.find((author) => author.id === book.authorId),
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
