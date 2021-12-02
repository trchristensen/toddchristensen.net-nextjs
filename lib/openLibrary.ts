import { Book } from "./types";
import { isValidHttpUrl } from "./utils";


export const searchBooks = async (query: string | any = null) => {
  const books: Book[] | any = await fetch(
    `http://openlibrary.org/search.json?q=${query}&limit=15`
  ).then((res) => res.json());
  return books?.docs.slice(0, 10);
};





// export const getISBNbyOLID = async (OLID: string) => {
//   const results = await fetch(
//     `https://openlibrary.org/works/${OLID}.json`
//   ).then((res) => res.json());

//   console.log('openLibrary > getISBNbyOLID.results => ', results)

//   const payload = {
//     title: results.title,
//     isbn10: results.isbn_10,
//     isbn13: results.isbn_13,
//   };

//   return {
//     payload,
//   };
// };

// export const getBookByISBN = async (QUERY: string) => {
//   const book: Book | any = await fetch(
//     `https://openlibrary.org/api/books?bibkeys=ISBN:${QUERY}&jscmd=data&format=json`
//   )
//     .then((res) => res.json())
//     .then((book) => {
//       // let book = d[Object.keys(d)[0]];
//       return {
//         title: book.title ? book.title : "",
//         author: book?.authors
//           ? JSON.stringify(book?.authors?.map((author) => author.name))
//           : "",
//         subjects:
//           book.subjects && typeof book.subjects != "undefined"
//             ? book.subjects.map((subject) => subject.name).join(", ")
//             : null,
//         description: book?.description ? book.description : null,
//         cover_src: book?.cover?.large ? book.cover.large : null,
//         publish_date: book?.publish_date ? book.publish_date : null,
//         key: book?.key ? `https://openlibrary.org${book?.key}` : null,
//       };
//     });

//   return book;
// };
