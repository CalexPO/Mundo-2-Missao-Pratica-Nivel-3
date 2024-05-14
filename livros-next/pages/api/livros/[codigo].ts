import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'DELETE') {
      const { codigo } = req.query;
      await controleLivro.excluir(Number(codigo));
      res.status(200).json({ message: 'Livro excluído com sucesso.' });
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
}
