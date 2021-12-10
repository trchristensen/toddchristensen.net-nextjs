import { book } from ".prisma/client";


export const searchBooks = async (query: string | any = null) => {
  const books: any | any = await fetch(
    `http://openlibrary.org/search.json?q=${query}&limit=15`
  ).then((res) => res.json());
  return books?.docs.slice(0, 10);
};