const Livro = require("../model/livros");

module.exports = {
   formLivro:(req, res) => {
    res.render('livros/formLivro', { item: {} }); // Enviando um objeto vazio caso não haja dados
},
    createLivro: async (req, res) => {
        const { titulo, autor, ano, statos } = req.body;
        console.log(titulo, autor, ano, statos);
        
        await Livro.inserirLivro(titulo, autor, ano, statos);
        res.redirect('/main');
    },

    apagarLivro: async (req, res) => {
        const id_livro = req.params.id_livro;
        
        await Livro.delete(id_livro);
        res.redirect('/main');
    },
selectLivro: async (req, res) => {
        let id_livro = req.params.id_livro;
        try {
            let livro = await Livro.select(id_livro);
            if (livro.length > 0) {
                res.render("livros/formEditarlivro", { item: livro[0] }); // Enviar dados para a página EJS
            } else {
                res.redirect("/main"); // Caso o produto não seja encontrado
            }
        } catch (error) {
            console.error("Erro ao selecionar livro:", error);
            res.redirect("/main");
        }
    },
    updateLivro: async (req, res) => {
        let id_livro= req.params.id_livro
        let titulo = req.body.titulo
        let autor = req.body.autor
        let ano = req.body.ano
        let statos = req.body.statos

        try {
            let resultado = await Livro.update(id_livro, titulo, autor,ano,statos);
            if (resultado.affectedRows > 0) {
                res.redirect("/main"); // Redirecionar para a página principal após a alteração
            } else {
                res.redirect("/livros/select"); // Caso nenhum registro seja alterado
            }
        } catch (error) {
            console.error("Erro ao editar produto:", error);
            res.redirect("/livros/select");
        }
    }
}