import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { Book } from "lib/types";

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
      where: {
        created_by: {
          equals: "toddchristensen@protonmail.com",
        },
      },
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
        created_by: entry.created_by,
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
      const payload: Book = {
        title: req.body?.bookData.title,
        author: req.body?.bookData.author[req.body?.bookData.author.length - 1],
        created_by: email,
        subjects: req.body?.bookData.subjects.toString() || null,
        publish_date: req.body?.bookData.publish_date[0] || null,
        cover_src: req.body?.bookData.cover ? req.body?.bookData.cover.toString() : null,
        key: req.body?.bookData.id,
        comment: req?.body?.comment,
        rating: req?.body?.rating,
      };

      const newEntry = await prisma.books.create({
        data: payload,
      });

      return res.status(200).json({
        id: newEntry.id.toString(),
        ...newEntry,
      });
    }
  }

  return res.send("Method not allowed.");
}
