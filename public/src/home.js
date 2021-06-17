function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = books.filter((book) => 
    book.borrows[0].returned === false);
  return result.length
 }

 function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) => {
    let genreIndex = genres.findIndex((genre) => {
      return genre.name === book.genre;
    });
    if (genreIndex !== -1) {
      genres[genreIndex].count++;
    } else {
      genres.push({ name: book.genre, count: 1 });
    }
  });
  genres.sort((a, b) => b.count - a.count);
  return genres.slice(0, 5);
} 

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach((book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  });
  popularBooks.sort((a, b) => b.count - a.count);
  return popularBooks.slice(0, 5);
}

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);

  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostPopularAuthors(books, authors) {
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  }, {});
 

  for (let id in count) {
    const sum = count[id].reduce((acc, b) => acc + b);
    count[id] = sum;
  }
 
  const sorted = _sortObjectByValues(count);

  let arr = sorted
    .map((authorId) => {
      const {
        name: { first, last },
      } = authors.find(({ id }) => id === Number(authorId));
      let name = `${first} ${last}`;
      return { name, count: count[authorId] };
    })
    .slice(0, 5);
  console.log(arr);
  return arr;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};