(async()=>{
const database = require('./db')
const User = require('./models/Usuario')
await database.sync()
    // await User.create({
    //     nome: 'admin',
    //     email: 'admin@admin.com',
    //     senha: 'admin123',
    //     tipo:   'admin'
    // })
    
})();

const { Op } = require("sequelize");
const User = require('./models/Usuario')

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

app.get('/home',(req,res)=>{
    res.render("home")
})

app.get('/registro',(req,res)=>{
    res.render("registro");

})
app.get('/login',(req,res)=>{
    res.render("login");

})

app.get('/steam',(req,res)=>{
    const pythonProcess = spawn('python', ['./steam.py','730']);
    pythonProcess.stdout.on('data', (data) => {
        let result = data.toString();
        console.log(result)
    });
    console.log('aaa')
    res.render('steam', { result });
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



