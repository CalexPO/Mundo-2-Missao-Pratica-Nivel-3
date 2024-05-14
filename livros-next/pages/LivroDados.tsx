import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Menu } from "../componentes/Menu";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

interface Editora {
  id: number;
  nome: string;
}

interface Livro {
  titulo: string;
  autor: string;
  resumo: string;
  codEditora: number;
}

const baseURL = "http://localhost:3000/api/livros";
const editorasURL = "http://localhost:3000/api/editoras";

const LivroDados: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [resumo, setResumo] = useState("");
  const [codEditora, setCodEditora] = useState(0);
  const [editoras, setEditoras] = useState<Editora[]>([]);
  
  const router = useRouter();

  useEffect(() => {
    const fetchEditoras = async () => {
      try {
        const response = await fetch(editorasURL);
        if (response.ok) {
          const data = await response.json();
          setEditoras(data);
        } else {
          console.error("Erro ao buscar editoras:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar editoras:", error);
      }
    };
    fetchEditoras();
  }, []);

  const incluirLivro = async (livro: Livro) => {
    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      });
      const result = await response.ok;
      if (result) {
        router.push("/LivroLista");
      }
    } catch (error) {
      console.error("Erro ao incluir livro:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      titulo,
      autor,
      resumo,
      codEditora,
    };
    incluirLivro(livro);
  };

  const handleEditoraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(parseInt(event.target.value));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Incluir Livro</title>
        <meta name="description" content="Incluir Novo Livro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main>
        <h1 className={styles.title}>Incluir Novo Livro</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </label>
          <label>
            Autor:
            <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} />
          </label>
          <label>
            Resumo:
            <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} />
          </label>
          <label>
            Editora:
            <select value={codEditora} onChange={handleEditoraChange}>
              {editoras.map(editora => (
                <option key={editora.id} value={editora.id}>{editora.nome}</option>
              ))}
            </select>
          </label>
          <button type="submit">Incluir</button>
        </form>
        <Link href="/LivroLista">
          <div>Voltar para a Lista de Livros</div>
        </Link>
      </main>
    </div>
  );
};

export default LivroDados;
