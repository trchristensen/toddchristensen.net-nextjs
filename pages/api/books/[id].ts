import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const { id } = req.query;
  const { email } = session.user;

  const entry = await prisma.books.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (req.method === "GET") {
    return res.json({
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
    });
  }

  if (!email || email !== entry.created_by) {
    return res.status(403).send("Unauthorized");
  }

  if (req.method === "DELETE") {
    await prisma.books.delete({
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
