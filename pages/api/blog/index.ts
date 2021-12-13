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
    const entries = await prisma?.comment.findMany({
      where: {
          post: {
              slug: req?.body.slug
          },
      },
      orderBy: {
          createdAt: "asc"
      },
      include: {
          createdBy: true
      }
    })

    const stringd = BigIntToString(entries)
    return res.json(stringd);
  }

    const session = await getSession({ req });
    const { email, name, image } = session.user;

    if (!session) {
      return res.status(403).send("Unauthorized");
    }

  if (req.method === "POST") {

    const newEntry = await prisma.comment.create({
        
        data: {
            body: req.body.body,
            post: {
                connectOrCreate: {
                    where: {
                        slug: req.body.postSlug
                    },
                    create: {
                        slug: req.body.postSlug
                    }
                },
            },
            createdBy: {
                connectOrCreate: {
                    where: {
                        email: session?.user.email
                    },
                    create: {
                        avatar: session?.user.image,
                        email: session?.user.email,
                        name: session?.user.name,
                    }
                }
            },
        }
    })
      
    const stringd = BigIntToString(newEntry)
    return res.status(200).json(stringd);
  }

  return res.send("Method not allowed.");
}
