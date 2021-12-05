import querystring from "querystring";
import { env } from "config/env.config";

const token = env.RAINDROPS_TOKEN;

export const getRaindropsFromCollection = async (collectionID: string) => {
  return fetch(`https://api.raindrop.io/rest/v1/raindrops/${collectionID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.json());
};
