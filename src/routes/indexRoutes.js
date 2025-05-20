const {Router} = require("express")
const router = Router()

const homeController = require('../controller/homeController')
const loginController = require("../controller/loginController")
const livroController = require("../controller/livroController")

router.get('/', homeController.home)
router.post('/login', loginController.autenticacao)
router.get('/main', loginController.main)
router.get('/formLivro', livroController.formLivro)
router.post('/livros/createLivro', livroController.createLivro)
router.get('/livros/select/:id_livro', livroController.selectLivro); // **Agora funciona!**
router.post('/livros/alterar/:id_livro', livroController.updateLivro);
router.get('/livros/deletar/:id_livro', livroController.apagarLivro)

module.exports = router;


