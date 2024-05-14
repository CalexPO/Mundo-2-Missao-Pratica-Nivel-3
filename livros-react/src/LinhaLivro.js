import React from 'react';
import { ControleEditora } from './controle/ControleEditora';

const LinhaLivro = (props) => {
    const { livro, excluir } = props;

    const nomeEditora = ControleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <button onClick={excluir}>Excluir</button>
            </td>
            <td>{livro.titulo}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
            <td>{nomeEditora}</td>
            <td>{livro.ano}</td>
        </tr>
    );
};

export default LinhaLivro;
