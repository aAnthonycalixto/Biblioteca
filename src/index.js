const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const router = require('./routes/indexRoutes');
const session = require('express-session');
const db = require('./infraestrutura/conexao')

const app = express();


app.use(express.json());
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

app.use(router)

app.listen(8080, () => {
    console.log('http://localhost:8080');
})