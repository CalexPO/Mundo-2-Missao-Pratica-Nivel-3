import Editora from '../modelo/Editora';

const editoras: Editora[] = [
    new Editora(1, 'Alta Books'),
    new Editora(2, 'Pearson'),
    new Editora(3, 'Addison Wesley')
];

class ControleEditora {
    getNomeEditora(codEditora: number): string | undefined {
        const editora = editoras.find(editora => editora.codEditora === codEditora);
        return editora ? editora.nome : undefined;
    }

    getEditoras(): Editora[] {
        return editoras;
    }
}

export default ControleEditora;
