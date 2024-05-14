import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const editoras = await controleEditora.getEditoras();
      res.status(200).json(editoras);
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
}
