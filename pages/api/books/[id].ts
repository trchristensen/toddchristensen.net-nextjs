import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { BigIntToString } from "lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const { id } = req.query;
  const { email } = session.user;

  const entry = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      createdBy: true
    }
  });

  const stringd = BigIntToString(entry)

  if (req.method === "GET") {
    return res.json(stringd);
  }

  if (!email || email !== entry.createdBy.email) {
    return res.status(403).send("Unauthorized");
  }

  if (req.method === "DELETE") {
    await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(204).json({});
  }

//   if (req.method === "PUT") {
//     const body = (req.body.body || "").slice(0, 500);

//     await prisma.guestbook.update({
//       where: {
//         id: Number(id),
//       },
//       data: {
//         body,
//         updated_at: new Date().toISOString(),
//       },
//     });

//     return res.status(201).json({
//       ...entry,
//       body,
//     });
//   }

  return res.send("Method not allowed.");
}
