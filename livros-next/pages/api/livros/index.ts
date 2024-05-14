import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const livros = await controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      const novoLivro = req.body;
      await controleLivro.incluir(novoLivro);
      res.status(200).json({ message: 'Livro adicionado com sucesso.' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
}
