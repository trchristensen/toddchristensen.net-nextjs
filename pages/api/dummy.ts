// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = await getDummyData(req?.query.userId);
  console.log("RESULTS!!!", users);
  res.status(200).json(users);
}

const getDummyData = async (userId: any) => {
  let uri = `http://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  // if (!inputValue) uri = `http://jsonplaceholder.typicode.com/posts`;

  const users: any = await fetch(uri)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return users;
};
