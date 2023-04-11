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
})();


const { Op } = require("sequelize");
const User = require('./models/Usuario')
const Games = require('./models/games')

const { spawn } = require('child_process');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override')
const { resolve } = require('path');
const { type } = require('os');
const { json } = require('express/lib/response');


const app = express();
const port = 3000

app.use(session({secret: "mysecretkey"}))
var ContaUsuario

app.set('views', resolve('./views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({'extended':true}))
app.use(methodOverride('_method'))

app.post('/registro', async(req,res)=>{
    const {nome, email, idade, senha, Confirmasenha } = req.body //confirmar senha tbm
    console.log("registro");
    const user = await User.findOne({where: {
        [Op.or]: [{email: email},{nome:nome}]
        }
    })
    if(user){
        console.log("usuario/email ja usado");
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




app.get('/',(req,res)=>{
    res.render("registro");
})

app.get('/esqueciasenha', (req,res)=>{
    res.render("esqueciasenha")
})

app.get('/home', async (req,res)=>{
    const jogos = await Games.findAll({
        order:[['nome','ASC']], //ordena por ordem alfabetica
        // where:{   
        //     // nome: {   
        //     //     [Op.like]: '%2%'   //possui 2 no nome
        //     // }
        //     idade: {
        //         //[Op.gte]: 10  //maior que
        //         [Op.lte]: 10  //menor que
        //     }
        // }
    })
    if (req.session.ContaUsuario){
        res.render("home",{jogos});
        console.log(req.session.ContaUsuario)
    }else{
        res.redirect("registro");
    }
})

app.get('/registro',(req,res)=>{
    res.render("registro");

})
app.get('/login',(req,res)=>{
    res.render("login");

})

app.get('/jogo/:steamID', async (req,res)=>{
    let steamID = req.params.steamID
    const jogo = await Games.findAll({
        where:{id: steamID},
        raw: true
    })
    res.render('jogo', {JogoItens: jogo[0]});
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



app.post('/login', async(req,res)=>{
    const {email,senha} = req.body
    console.log("Login")
    const user = await User.findOne({where:
        [{email:email}]
    })
    if(!user){
        console.log("Usuario nao existe")
        res.redirect('login')
    }else if(senha != user.senha){
        console.log("Wrong pass");
        res.redirect('login')
    }else{
        req.session.ContaUsuario = user
        res.redirect('home')
    }
})

app.post("/esqueciasenha", async(req,res)=>{
    const {email,novaSenha,confirmarNovaSenha} = req.body
    const user = await User.findOne({where:
        [{email:email}]
    })
    if(!user){
        console.log("Usuario não encontrado")
        res.render("esqueciasenha")
    }else if (novaSenha != confirmarNovaSenha){
        console.log("Senhas não batem")
        res.render("esqueciasenha")
    }else{
        await User.update(
            {
                senha:novaSenha,
            },
            {
                where: {email:email},
            }
        )
        console.log("Senha alterada")
        res.redirect('login')
    }
    
})


app.listen(3000,function(){
    console.log('Ok');
})



