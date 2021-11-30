import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const entries = await prisma.books.findMany({
      orderBy: {
        updated_at: 'desc'
      }
    });

    return res.json(
      entries.map((entry) => ({
        id: entry.id.toString(),
        title: entry.title,
        author: entry.author,
        description: entry.description,
        rating: entry.rating,
        created_at: entry.created_at,
        updated_at: entry.updated_at
      }))
    );
  }

  const session = await getSession({ req });
  const { email, name } = session.user;

  if (!session) {
    return res.status(403).send('Unauthorized');
  }

  console.log('SESSION USER ====> ', session);

  const data = {
    title: (req.body.title || '').slice(0, 200),
    author: (req.body.author || '').slice(0, 200),
    description: (req.body.description || '').slice(0, 500),
    rating: req.body.rating || null
  };

  if (req.method === 'POST') {
    //   only i can add books. maybe make a book recommendation table in the future, for guests to recommend me books?
    if (email === 'toddchristensen@protonmail.com') {
      const newEntry = await prisma.books.create({
        data
      });

      return res.status(200).json({
        id: newEntry.id.toString(),
        title: newEntry.title,
        author: newEntry.author,
        rating: newEntry.rating,
        description: newEntry.description,
        created_at: newEntry.created_at,
        updated_at: newEntry.updated_at
      });
    }
  }

  return res.send('Method not allowed.');
}
