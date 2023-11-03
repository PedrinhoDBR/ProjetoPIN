
const database = require('./src/db/db');
async () => { await database.sync()}
const { Op } = require("sequelize");
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const { resolve } = require('path');

const app = express();

app.use(session({ secret: "mysecretkey" }));

app.set('views', resolve('./src/views'));
app.set('view engine', 'ejs');

app.use(express.static('./src/public'));
app.use(express.urlencoded({ 'extended': true }));
app.use(methodOverride('_method'));

//routes requires
const computer = require('./src/routes/computer.routes')
const consultar = require('./src/routes/consultar.routes')
const esqueciasenha = require('./src/routes/esqueciASenha.routes')
const Favorito = require('./src/routes/favorito.routes')
const getusuario = require('./src/routes/getUsuario.routes')
const home = require('./src/routes/home.routes')
const index = require('./src/routes/index.routes')
const jogos = require('./src/routes/jogos.routes')
const login = require('./src/routes/login.routes')
const registro = require('./src/routes/register.routes')
const usuario = require('./src/routes/user.routes')

//use routes
app.use('/computer', computer)
app.use('/consultar', consultar)
app.use('/esqueciasenha', esqueciasenha)
app.use('/Favorito', Favorito)
app.use('/getusuario', getusuario)
app.use('/home', home)
app.use('/', index)
app.use('/jogo', jogos)
app.use('/login', login)
app.use('/registro', registro)
app.use('/usuario', usuario)



app.listen(3000, function () {
    console.log('Ok');
})



