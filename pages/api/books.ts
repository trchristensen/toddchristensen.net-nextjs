import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const entries = await prisma.books.findMany({
      orderBy: {
        updated_at: "desc",
      },
    });

    return res.json(
      entries.map((entry) => ({
        id: entry.id.toString(),
        title: entry.title,
        subtitle: entry.subtitle,
        author: entry.author,
        mockAuthor: JSON.stringify(["author 1", "author 2", "author 3"]),
        description: entry.description,
        num_pages: entry.num_pages,
        cover_src: entry.cover_src,
        publish_date: entry.publish_date,
        subjects: entry.subjects,
        key: entry.key,
        comment: entry.comment,
        rating: entry.rating,
        created_at: entry.created_at,
        updated_at: entry.updated_at,
      }))
    );
  }

  const session = await getSession({ req });
  const { email, name } = session.user;

  if (!session) {
    return res.status(403).send("Unauthorized");
  }

  console.log("SESSION USER ====> ", session);

  const bodyData = {
    description: (req.body.description).slice(0, 500),
    rating: req.body.rating,
  };

  if (req.method === "POST") {
    //   only i can add books. maybe make a book recommendation table in the future, for guests to recommend me books?
    if (email === "toddchristensen@protonmail.com") {
      const isbn = req.body.isbn;

      try {
        const book = await fetch(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`
        )
          .then((res) => res.json())
          .then((d) => {
            let b = d[Object.keys(d)[0]];
            
            let title = null;
            let subtitle = null;
            let author = null;
            let description = null;
            let num_pages = null;
            let cover_src = null;
            let publish_date = null;
            let subjects = [];
            let key = null;
            let comment = null;
            let rating = null;

            
            let subjectsArr = typeof b.subjects != "undefined" ? (b.subjects.map((subject) => subject.name).slice(0, 4)) : null
            let data = {
              title: b.title,
              subtitle: b?.subtitle,
              author: b?.authors
                ? JSON.stringify(b?.authors?.map((author) => author.name))
                : null,
              description: (b?.description).slice(0, 500),
              num_pages: b?.number_of_pages,
              cover_src: b?.cover?.large,
              publish_date: b?.publish_date,
              subjects: typeof b?.subjects != "undefined"
                ? (JSON.stringify(subjectsArr))
                : null,
              key: `https://openlibrary.org${b?.key}`,
              comment: bodyData?.description,
              rating: bodyData?.rating,
            };
            return data;
          });

        const newEntry = await prisma.books.create({
          data: book,
        });

        return res.status(200).json({
          id: newEntry.id.toString(),
          ...newEntry,
        });
      } catch (err) {
        throw err;
      }
    }
  }

  return res.send("Method not allowed.");
}
