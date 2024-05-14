// LivroLista.js
import React, { useState, useEffect } from "react";
import ControleLivros from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LinhaLivro = ({ livro, excluir }) => {
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>{livro.titulo}</td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>{livro.autores.join(", ")}</td>
            <td><button onClick={() => excluir(livro.codigo)}>Excluir</button></td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        setLivros(controleLivro.obterLivros());
        setCarregado(true);
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main>
            <h1>Listagem de Livros</h1>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map(livro => (
                        <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
