// pages/ListaLivros.tsx
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Menu } from "../componentes/Menu";
import styles from '../styles/Home.module.css';

interface Livro {
  codigo: number;
  titulo: string;
  autor: string;
  resumo: string;
  codEditora: number;
}

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);
  const baseURL: string = "http://localhost:3000/api/livros";

  const obter = async (): Promise<Livro[]> => {
    const response = await fetch(baseURL);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Erro ao buscar livros: " + response.statusText);
    }
  };

  const excluirLivro = async (codigo: number): Promise<boolean> => {
    const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
    return response.ok;
  };

  useEffect(() => {
    obter()
      .then((data) => {
        setLivros(data);
        setCarregado(true);
      })
      .catch(error => {
        console.error(error);
        // Poderia definir um estado de erro para exibir uma mensagem ao usuário
      });
  }, []);

  const excluir = async (codigo: number) => {
    await excluirLivro(codigo);
    setCarregado(false); // Força o redesenho da página
  };

  const LinhaLivro: React.FC<{ livro: Livro, excluir: (codigo: number) => void }> = ({ livro, excluir }) => (
    <tr key={livro.codigo}>
      <td>{livro.titulo}</td>
      <td>{livro.autor}</td>
      <td>{livro.resumo}</td>
      <td>{livro.codEditora}</td>
      <td>
        <button onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
    </tr>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de Livros</title>
        <meta name="description" content="Lista de Livros" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main>
        <h1 className={styles.title}>Lista de Livros</h1>

        {carregado ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Resumo</th>
                <th>Código da Editora</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros.map(livro => (
                <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>Carregando...</p>
        )}
      </main>
    </div>
  );
};

export default LivroLista;
