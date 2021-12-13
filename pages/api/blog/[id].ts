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
  const { name, email } = session.user;

  
  if (req.method === "DELETE") {

      console.log("HIT DELETE METHOD!!")

    await prisma.comment.delete({
      where: {
        id: Number(id),
      },
      include: {
        createdBy: true,
      },
    });

    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
