import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LivroLista from './LivroLista';
import LivroDados from './LivroDados';
import 'bootstrap/dist/css/bootstrap.css'; // Importação da folha de estilo do Bootstrap
import './App.css'; // Importação do arquivo de estilos personalizados

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
          <div className="container">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Catalogo</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dados">Novo</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LivroLista />} />
          <Route path="/dados" element={<LivroDados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
