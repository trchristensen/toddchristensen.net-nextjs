import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { Book } from "lib/types";
import { getBookByISBN } from "lib/openLibrary";

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
      entries.map((entry: Book) => ({
        id: entry.id.toString(),
        title: entry.title,
        subtitle: entry.subtitle,
        author: entry.author,
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

  if (req.method === "POST") {
    if (email === "toddchristensen@protonmail.com") {
      const ISBN = req?.body?.isbn;

      const book = await getBookByISBN(ISBN);


      let data = {
        ...book,
        comment: req?.body?.comment ? req.body.comment : null,
        rating: req?.body?.rating ? req.body.rating : null,
      };

      const newEntry = await prisma.books.create({
        data,
      });

      console.log('DATA ===D~~~ ', data)

      return res.status(200).json({
        id: newEntry.id.toString(),
        ...newEntry,
      });
    }
  }

  return res.send("Method not allowed.");
}
