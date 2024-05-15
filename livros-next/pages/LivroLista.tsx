import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Menu } from "../componentes/Menu";
import styles from '../styles/Home.module.css';
import ControleLivro from '../classes/controle/ControleLivros';
import { LinhaLivro } from '../componentes/LinhaLivro';

interface Livro {
  codigo: number;
  titulo: string;
  autores: string[];
  resumo: string;
  codEditora: number;
}

const controleLivro = new ControleLivro();

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    const carregarLivros = () => {
      const livrosObtidos = controleLivro.obterLivros();
      setLivros(livrosObtidos);
      setCarregado(true);
    };

    carregarLivros();
  }, []);

  const excluir = (codigo: number) => {
    controleLivro.excluir(codigo);
    setLivros(prevLivros => prevLivros.filter(livro => livro.codigo !== codigo));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Catálogo de Livros</title>
        <meta name="description" content="Catálogo de Livros" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main>
        <h1 className={styles.title}>Catálogo de Livros</h1>

        {carregado ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autores</th>
                <th>Resumo</th>
                <th>Editora</th>
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
