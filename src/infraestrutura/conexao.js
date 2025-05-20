const mysql = require('mysql');

const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'biblioteca'
});
/*
conexao.connect(erro =>{
    if(erro){
        console.erro('Erro ao conectar:',erro.message);
        return;
    }
    console.log('conexao com msyql estabelecida com sucesso');

    conexao.end();
});*/

module.exports = conexao;