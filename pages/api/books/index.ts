import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { Book } from "lib/types";
import { books } from ".prisma/client";

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
      entries.map((entry: books) => ({
        id: entry.id.toString(),
        ...entry,
      }))
    );
  }

  const session = await getSession({ req });
  const { email } = session.user;

  if (!session) {
    return res.status(403).send("Unauthorized");
  }

  if (req.method === "POST") {
    if (email === "toddchristensen@protonmail.com") {
      const payload: Book = {
        title: req.body?.title,
        author:
          (req.body?.author &&
            // @ts-ignore
            [...new Set(req.body?.author)].toString()) ||
          null,
        created_by: email,
        // subjects:
        //   req.body?.subjects != null && req.body?.subjects.length < 1
        //     ? req.body?.subjects.toString()
        //     : null,
        subjects: req.body?.subjects != null && req.body?.subjects.length < 1 ? req.body?.subjects[0] : null,
        publish_date:
          req.body?.publish_date[req.body?.publish_date.length - 1] || null,
        cover_src: req.body?.cover ? req.body?.cover.toString() : null,
        key: req.body?.id,
        comment: req?.body?.comment,
        rating: req?.body?.rating,
        read_status: req?.body?.read_status
      };

      console.log('PAYLOAD ==> ', payload)

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
