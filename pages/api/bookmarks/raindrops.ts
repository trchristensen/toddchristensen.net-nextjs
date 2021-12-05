import { getRaindropsFromCollection } from "lib/raindrop";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const query = req.query.collectionId;

  console.log(typeof query)

  // @ts-ignore
  const response = await getRaindropsFromCollection(query);
  return res.status(200).json(response);
}
