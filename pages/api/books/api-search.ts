import type { NextApiRequest, NextApiResponse } from "next";
import { searchBooks } from "lib/openLibrary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let q = req?.query.query ? req.query.query : "";
    const books = await searchBooks(q);
    return res.json(
      books.map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name,
        subjects: book?.subject || book?.subject_facet || null,
        publish_date: book?.publish_date || null,
        cover:
          (book?.cover_i &&
            `https://covers.openlibrary.org/b/id/${book.cover_i.toString()}-L.jpg`) ||
          book?.cover ||
          null,
      }))
    );
  }

  return res.send("Method not allowed.");
}
