const Livro = require('../model/livros');
const bcrypt = require('bcryptjs');
const session = require('express-session');
module.exports = {
    autenticacao: async (req, res) => {
        const email = req.body.email;
        const senha = req.body.senha;        
        console.log(email, senha);
        try {
            const usuario = await Livro.verificacao(email, senha);
            console.log(usuario)
            if (usuario) {
                res.redirect('/main');
            } else {
                res.send('Email ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro na autenticação:', error);
            res.status(500).send('Erro no servidor. Tente novamente mais tarde.');
            }
    },
    //fechando a função autenticacao
    main: async (_, res) => {
        if (!session.id_usuario) {
            return res.redirect('/');
        }
        const livros = await Livro.buscarLivro()
        res.render('livros/main', {
            nome: session.nome,
            livro: livros
        });
    }
}