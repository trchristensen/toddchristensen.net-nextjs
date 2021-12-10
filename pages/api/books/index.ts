import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { book } from ".prisma/client";
import { BigIntToString } from "lib/utils";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const entries = await prisma.book.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        createdBy: true,
      },
    });

    const stringd = BigIntToString(entries);

    return res.json(stringd);
  }

  const session = await getSession({ req });
  const { email, name, image } = session.user;

  if (!session) {
    return res.status(403).send("Unauthorized");
  }

  if (req.method === "POST") {
    if (email === "toddchristensen@protonmail.com") {
      // @ts-ignore
      const payload: book = {
        title: req.body?.title,
        author:
          (req.body?.author &&
            // @ts-ignore
            [...new Set(req.body?.author)].toString()) ||
          null,
        // createdBy: email,
        subjects:
          req.body?.subjects != null && req.body?.subjects.length < 1
            ? req.body?.subjects.toString()
            : null,
        // subjects:
        //   req.body?.subjects != null && req.body?.subjects.length < 1
        //     ? req.body?.subjects[0]
        //     : null,
        publishDate:
          req.body?.publish_date[req.body?.publish_date.length - 1] || null,
        cover: req.body?.cover ? req.body?.cover.toString() : null,
        key: req.body?.id,
        comment: req?.body?.comment,
        rating: req?.body?.rating,
        readStatus: req?.body?.readStatus,
        subtitle: "",
        description: "",
      };

      console.log("PAYLOAD ==> ", payload);

      const newEntry = await prisma.book.create({
        // @ts-ignore
        data: {
          createdBy: {
            connectOrCreate: {
              where: {
                email: email,
              },
              create: {
                email,
                avatar: image,
              },
            },
          },
          ...payload,
        },
      });

      const stringd = BigIntToString(newEntry);

      return res.status(200).json(stringd);
    }
  }

  return res.send("Method not allowed.");
}
