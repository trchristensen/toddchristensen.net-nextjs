import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "lib/prisma";
import { id } from "date-fns/locale";
import { BigIntToString } from "lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const entries = await prisma?.guestbookEntry.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        createdBy: true,
      },
    });
    const stringd = BigIntToString(entries)
    console.log(stringd)
  

    return res.json(
      stringd
    );
  }

  const session = await getSession({ req });
  const { email, name, image } = session.user;

  if (!session) {
    return res.status(403).send("Unauthorized");
  }

  console.log("SESSION USER ====> ", session);

  if (req.method === "POST") {
    const newEntry = await prisma.guestbookEntry.create({
      data: {
        body: (req.body.body || "").slice(0, 500),
        createdBy: {
          connectOrCreate: {
            where: {
              email: email
            },
            create: {
              email,
              avatar: image,
            }
          },
        },
      },
    });

    return res.status(200).json({
      id: newEntry.id.toString(),
      body: newEntry.body,
      
    });
  }

  return res.send("Method not allowed.");
}
