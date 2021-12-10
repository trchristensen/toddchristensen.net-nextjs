import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const popularPosts = await prisma.view.findMany({
       orderBy: {
           count: "desc"
       }
    });

    return res.status(200).json(
        popularPosts.map((_) => ({
        slug: _.slug,
        count: _.count.toString()
    })
    ))
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
