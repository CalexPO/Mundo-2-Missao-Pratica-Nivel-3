// componentes/Menu.tsx
import React from "react";
import Link from "next/link";
import styles from '../styles/Menu.module.css';

export const Menu: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/" legacyBehavior>
            <a className={styles.navlink}>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/LivroLista" legacyBehavior>
            <a className={styles.navlink}>Lista de Livros</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
