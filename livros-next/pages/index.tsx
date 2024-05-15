// pages/index.tsx
import React from "react";
import Head from "next/head";
import { Menu } from "../componentes/Menu";
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Página inicial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main>
        <h1 className={styles.title}>Bem-vindo à Catálogo de Livros</h1>
        <p>
          Esta é a página inicial do projeto de gerenciamento de livros. Navegue até a lista de livros para ver e gerenciar seus livros.
        </p>
      </main>
    </div>
  );
};

export default Home;
