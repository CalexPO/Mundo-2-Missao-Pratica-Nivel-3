import React from 'react';
import ControleEditora from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const controleEditora = new ControleEditora();

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.autores.join(", ")}</td>
      <td>{livro.resumo}</td>
      <td>{controleEditora.getNomeEditora(livro.codEditora)}</td>
      <td>
        <button onClick={() => excluir(livro.codigo)} className="btn btn-danger">Excluir</button>
      </td>
    </tr>
  );
};
