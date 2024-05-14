import ControleEditora from '../../../classes/controle/ControleEditora';
import { NextApiRequest, NextApiResponse } from 'next';

const controleEditora = new ControleEditora();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { codEditora } = req.query;
    if (req.method === 'GET') {
      const nomeEditora = controleEditora.getNomeEditora(
        Number(codEditora)
      );
      if (nomeEditora) {
        res.status(200).json({ nome: nomeEditora });
      } else {
        res.status(404).json({ error: 'Editora não encontrada' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
}
