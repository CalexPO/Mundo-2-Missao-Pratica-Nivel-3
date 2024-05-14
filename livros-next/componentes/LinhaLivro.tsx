import React from 'react';
import ControleEditora from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';

interface LinhaLivroProps {
  livro: Livro;
  excluir: () => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;
  const controleEditora = new ControleEditora();

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{controleEditora.getNomeEditora(livro.codEditora)}</td>
      <td>{livro.autores}</td>
      <td>
        <button onClick={excluir} className="btn btn-danger">Excluir</button>
      </td>
    </tr>
  );
};
