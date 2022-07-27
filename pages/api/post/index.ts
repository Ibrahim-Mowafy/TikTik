import type { NextApiRequest, NextApiResponse } from 'next';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { allPostsQuery } from './../../../utils/queries';
import { client } from './../../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const document = req.body;

    client
      .create(document)
      .then((result) => {
        res.status(201).json('Video Created!');
      })
      .catch((err) => {
        res.status(404).json('Video Created Field!');
      });
  }
}
