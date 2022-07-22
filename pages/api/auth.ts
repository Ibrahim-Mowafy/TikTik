import type { NextApiRequest, NextApiResponse } from 'next';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from '../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = req.body;
    client
      .createIfNotExists(user)
      .then((result) => {
        res.status(200).json('Login Success');
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json('Login Failed');
      });
  }
}
