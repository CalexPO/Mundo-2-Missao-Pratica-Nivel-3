// types.d.ts
export interface Livro {
    codigo: number;
    titulo: string;
    resumo: string;
    codEditora: number;
    autores: string[];
  }
  
  export interface ControleLivros {
    obterLivros(): Livro[];
    excluir(codigo: number): void;
  }
  
  export interface ControleEditora {
    getNomeEditora(codEditora: number): string;
  }
  