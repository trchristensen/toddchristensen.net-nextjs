 // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");

function saveData(data) {
  fs.writeFileSync("data/github_heatmap.json", JSON.stringify(data, null, 4));
}

 export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
 ) {
   const githubHeatMap = await fetch(
     `https://github-contributions.vercel.app/api/v1/trchristensen`
   ).then((res) => res.json());

   saveData(githubHeatMap?.contributions)
   
   res.status(200).json(githubHeatMap);
 }