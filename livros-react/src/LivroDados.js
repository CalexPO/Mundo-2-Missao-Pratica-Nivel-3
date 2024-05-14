import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const LivroDados = () => {
  const controleLivro = new ControleLivros();
  const controleEditora = new ControleEditora();

  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  const navigate = useNavigate();

  const tratarCombo = (event) => {
    setCodEditora(parseInt(event.target.value));
  }

  const incluir = (event) => {
    event.preventDefault();
    const novoLivro = {
      codigo: 0, // Será gerado automaticamente no servidor
      titulo: titulo,
      resumo: resumo,
      autores: autores.split('\n'),
      codEditora: codEditora
    };
    controleLivro.incluir(novoLivro);
    navigate('/');
  }

  return (
    <div className="container mt-4">
      <h2>Cadastro de Livro</h2>
      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input type="text" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo:</label>
          <textarea className="form-control" id="resumo" value={resumo} onChange={(e) => setResumo(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="autores">Autores:</label>
          <textarea className="form-control" id="autores" value={autores} onChange={(e) => setAutores(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="editora">Editora:</label>
          <select className="form-control" id="editora" value={codEditora} onChange={tratarCombo}>
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default LivroDados;
