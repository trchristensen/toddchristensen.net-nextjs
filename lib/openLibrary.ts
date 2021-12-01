import { Book } from "./types";

export const getBookByISBN = async (ISBN: string) => {
  const book: Book | any = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${ISBN}&jscmd=data&format=json`
  )
    .then((res) => res.json())
    .then((d) => {
      let book = d[Object.keys(d)[0]];
      
      return {
        title: book.title ? book.title : "",
        author: book?.authors
          ? JSON.stringify(book?.authors?.map((author) => author.name))
          : null,
        subjects:
          book.subjects && typeof book.subjects != "undefined"
            ? book.subjects.map((subject) => subject.name).join(", ")
            : null,
        description: book?.description ? book.description : null,
        cover_src: book?.cover?.large ? book.cover.large : null,
        publish_date: book?.publish_date ? book.publish_date : null,
        key: book?.key ? `https://openlibrary.org${book?.key}` : null,
      };
    });

  return book;
};
