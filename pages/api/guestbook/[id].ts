import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';
import { BigIntToString } from 'lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const { id } = req.query;
  const { name, email } = session.user;

  const entry = await prisma.guestbookEntry.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      createdBy: true
    }
  });

  const stringd = BigIntToString(entry)

  if (req.method === 'GET') {
    return res.json(stringd);
  }

  if (!email || email !== entry.createdBy.email) {
    return res.status(403).send('Unauthorized');
  }

  if (req.method === 'DELETE') {
    await prisma.guestbookEntry.delete({
      where: {
        id: Number(id)
      }, include: {
        createdBy: true
      }
    });

    return res.status(204).json({});
  }

 
  return res.send('Method not allowed.');
}
