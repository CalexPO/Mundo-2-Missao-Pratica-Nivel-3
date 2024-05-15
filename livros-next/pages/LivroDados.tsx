import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Menu } from "../componentes/Menu";
import { useRouter } from "next/router";
import styles from "../styles/LivroDados.module.css";
import ControleLivro from "../classes/controle/ControleLivros";
import { Livro } from "../classes/modelo/Livro";
import Editora from "../classes/modelo/Editora"; // Corrigindo a importação da interface Editora

const editorasURL = "http://localhost:3000/api/editoras";

const controleLivro = new ControleLivro();

const LivroDados: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [resumo, setResumo] = useState("");
  const [codEditora, setCodEditora] = useState<number | string>(""); // Inicialize com uma string vazia para evitar conflito de tipos
  const [editoras, setEditoras] = useState<Editora[]>([]);
  const [editoraSelecionada, setEditoraSelecionada] = useState<Editora | null>(null); // Estado para armazenar a editora selecionada

  const router = useRouter();

  useEffect(() => {
    const fetchEditoras = async () => {
      try {
        const response = await fetch(editorasURL);
        if (response.ok) {
          const data = await response.json();
          setEditoras(data);
          if (data.length > 0) {
            setCodEditora(String(data[0].id)); // Converta o ID para string
            setEditoraSelecionada(data[0]); // Defina a primeira editora como selecionada
          }
        } else {
          console.error("Erro ao buscar editoras:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao buscar editoras:", error);
      }
    };
    fetchEditoras();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: 0, // Defina um valor adequado para o código do livro
      titulo,
      autores: [autor], // Atualizado para utilizar um array de autores
      resumo,
      codEditora: parseInt(String(codEditora)) // Garantindo que seja número
    };
    if (editoraSelecionada) {
      livro.codEditora = editoraSelecionada.codEditora; // Atribua o id da editora ao codEditora
    }
    
    controleLivro.incluir(livro); // Utilizando o método incluir do controle de livros
    router.push("/LivroLista"); // Redirecionando para a tela LivroLista após incluir o livro
  };

  const handleEditoraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedEditora = editoras.find(editora => String(editora.codEditora) === selectedId);
    if (selectedEditora) {
      setCodEditora(selectedId);
      setEditoraSelecionada(selectedEditora);
    }
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
          <div className={styles.formGroup}>
            <label htmlFor="titulo">Título:</label>
            <input 
              type="text" 
              className={`form-control ${styles.input}`} 
              id="titulo" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="autor">Autor:</label>
            <input 
              type="text" 
              className={`form-control ${styles.input}`} 
              id="autor" 
              value={autor} 
              onChange={(e) => setAutor(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="resumo">Resumo:</label>
            <textarea 
              className={`form-control ${styles.textarea}`} 
              id="resumo" 
              value={resumo} 
              onChange={(e) => setResumo(e.target.value)} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="editora">Editora:</label>
            <select 
              className={`form-control ${styles.select}`} 
              id="editora" 
              value={codEditora} 
              onChange={handleEditoraChange}
            >
              {editoras.map(editora => (
                <option key={editora.codEditora} value={editora.codEditora}>{editora.nome}</option>
              ))}
            </select>
          </div>
          <button type="submit" className={`btn btn-primary ${styles.button}`}>Incluir</button>
        </form>
        <div className={styles.link}>
          <Link href="/LivroLista">Voltar para a Lista de Livros</Link>
        </div>
      </main>
    </div>
  );
};

export default LivroDados;
