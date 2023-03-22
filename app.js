(async()=>{
const database = require('./db')
const User = require('./models/Usuario')
const games = require('./models/games')
await database.sync()
    // await User.create({
    //     nome: 'admin',
    //     email: 'admin@admin.com',
    //     senha: 'admin123',
    //     tipo:   'admin'
    // })
    // await Games.create({
    //     id: '552520',
    //     nome: 'Far Cry® 5',
    //     imagem: 'https:\/\/cdn.akamai.steamstatic.com\/steam\/apps\/552520\/header.jpg?t=1678986050'
    // })
})();

const { Op } = require("sequelize");
const User = require('./models/Usuario')
const Games = require('./models/games')

const { spawn } = require('child_process');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override')
const { resolve } = require('path');

const app = express();
const port = 3000

app.set('views', resolve('./views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({'extended':true}))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.render("registro");
})

app.get('/home', async (req,res)=>{
    const jogos = await Games.findAll()
    res.render("home",{jogos})
})

app.get('/registro',(req,res)=>{
    res.render("registro");

})
app.get('/login',(req,res)=>{
    res.render("login");

})


app.get('/jogo', async (req,res)=>{
    res.render("jogo");
})

app.get('/steam/:steamID', async (req,res)=>{
    const steamID = req.params.steamID
    const pythonProcess = await spawn('python', ['./Apis/steam.py',steamID.toString()]);
    let result = null
    await pythonProcess.stdout.on('data', (data) => {
        result = data.toString();
        res.render('steam', { result : result});
    });
})

app.post('/registro', async(req,res)=>{
    const {nome, email, idade, senha, Confirmasenha } = req.body //confirmar senha tbm
    console.log("registro");
    const user = await User.findOne({where:
        [{nome: nome}]
    })
    if(user){
        console.log("Usuario ja existe");
        res.redirect("registro")
    }else if(senha != Confirmasenha){
        console.log("Senhas não conhecidem");
        res.redirect("registro")
    }else{
        console.log("teste")
        const newuser = await User.create({
            nome: nome,
            email: email,//'a@gmail.com',
            idade: idade,
            senha: senha,
            tipo:   'user'
        })
        res.redirect('login')
    }
})

app.post('/login', async(req,res)=>{
    const {nome,senha} = req.body
    console.log("Login")
    const user = await User.findOne({where:
        [{nome:nome}]
    })
    if(!user){
        console.log("Usuario nao existe")
        res.redirect('login')
    }else if(senha != user.senha){
        console.log("Wrong pass");
        res.redirect('login')
    }else{
        res.redirect('home')
    }
})


app.listen(3000,function(){
    console.log('Ok');
})



