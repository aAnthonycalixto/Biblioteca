const conexao = require('../infraestrutura/conexao');
const session = require('express-session');

module.exports = {
    verificacao: (email, senha) => {
        return new Promise((resolve, reject) => {
            console.log(email, senha);
            conexao.query('SELECT * FROM usuarios WHERE email = ? and senha = ?', [email,
senha], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length === 0) {
                    reject(new Error('Usuário não encontrado!'));
                    return;
                }
               
                const usuario = results[0];
                console.log(usuario.id_usuario);
                // guardando o id e nome do professor na sessão
                session.id_usuario = usuario.id_usuario;
                session.nome = usuario.nome;
 
                console.log("Sucesso ao entrar !!");
                console.log(usuario);
                resolve(usuario);
            });
        });
    },
    buscarLivro: () => {
        return new Promise((resolve, reject) => {
            //const id_usuario = session.id_usuario;
            conexao.query('SELECT * FROM livro',
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    console.log("Sucesso ao listar os Livros!!")
                    resolve(results)
                });
        });
    },
    inserirLivro: (titulo, autor, ano,statos) => {
        return new Promise((resolve, reject) => {
            //const id_professor = session.id_professor;
            conexao.query('INSERT INTO livro (titulo, autor, ano, statos) VALUES (?,?,?,?)',
                [titulo, autor, ano, statos],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao cadastrar Livro!!")
                    resolve(results)
                });
        });
    },
    delete: (id_livro) => {
        return new Promise((resolve, reject) => {
            conexao.query('DELETE FROM livro WHERE id_livro = ?',
                [id_livro],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao excluir o produto!!")
                    resolve(results)
                });
        });
    },

    select: (id_livro) => {
        return new Promise((resolve, reject) => {
            conexao.query('SELECT * FROM livro WHERE id_livro = ?',
                [id_livro],
                (error, results) => {
                    if (error) { reject(error); return; }
                    console.log("Sucesso ao selecionar o Livro!!")
                    resolve(results)
                });
        });
    },
    update: (id_livro, titulo, autor,ano, statos) => {
        return new Promise((resolve, reject) => {
            conexao.query(
                'UPDATE livro SET titulo = ?, autor = ?, ano = ?, statos = ? WHERE id_livro = ?',
                [titulo, autor, ano, statos, id_livro],
                (erro, results) => {
                    if (erro) { reject(erro); return; } // Corrigido 'erro' e não 'error'
                    console.log("Sucesso ao editar o Livro!!");
                    resolve(results);
                }
            );
        });
    }
}