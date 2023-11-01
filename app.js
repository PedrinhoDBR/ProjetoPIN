(async()=>{
const database = require('./db')
const User = require('./models/Usuario')
const games = require('./models/games')
const GPU = require('./models/GPU')
const CPU = require('./models/CPU')
const Computer = require('./models/Computer')
const Favorito = require('./models/Favorito')
const Lista = require('./models/Lista')
await database.sync()
    // await User.destroy({
    //     where:{id:'1'},
    // })
    // await User.create({
    //     id: '1',
    //     nome: 'admin',
    //     email: 'admin@admin.com',
    //     idade: '2004-07-14 00:00:00',
    //     senha: 'admin123',
    //     tipo:   'admin'
    // })
    // await CPU.destroy({
    //     where:{id:1},
    // })
    // await CPU.create({
    //     id: '1',
    //     nome: 'CPUBoa'
    // })
    // await GPU.destroy({
    //     where:{id:1},
    // })
    // await GPU.create({
    //     id: '1',
    //     nome: 'GPUBoa'
    // })
    // await Computer.destroy({
    //     where:{id:'1'},
    // })
    // await Computer.create({
    //     UsuarioID:'1',
    //     CPUID: '1',
    //     GPUID: '1'
    // })

})();



const { Op } = require("sequelize");
const User = require('./models/Usuario')
const Games = require('./models/games')
const CPU = require('./models/CPU')
const GPU = require('./models/GPU')
const Computer = require('./models/Computer')
const Favorito = require('./models/Favorito')

const { spawn } = require('child_process');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override')
const { resolve } = require('path');
const { type } = require('os');
const { json } = require('express/lib/response');
const {comparar} = require('./Controller/Comparation');
const {getgeneros} = require('./Controller/genero');
const Lista = require('./models/Lista');


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


        const newuserid = newuser.id
        console.log(newuser.id)
        const newcomputer = await Computer.create({
            UsuarioID: newuser.id
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
    // const listaitens    = await Lista.findAll()
    const GPUs          = await Lista.findAll(
        {where:{PecaTipo:'GPU'},order:[['PecaDescricao','DESC']]})
    const processadores = await Lista.findAll(
        {where:{PecaTipo:'CPU'},order:[['PecaDescricao','DESC']]})
    // const listaitens    = await Lista.findAll()
    // const listaitens = await lista.findOne({
        // where:{PecaID:3871}
    // })

    if (req.session.ContaUsuario){

        const pc_usuario = await Computer.findOne({where: {
            UsuarioID: req.session.ContaUsuario.id
        }})

        res.render("home",{jogos,pc_usuario, GPUs, processadores});
        console.log(req.session.ContaUsuario)
    }else{
        res.redirect("registro");
    }
})

app.get('/computer', async (req,res)=>{
    if (req.session.ContaUsuario){
        res.render("computador");
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
    const user = await User.findOne({where:  //para nao precisar ficar logando toda hora
        [{nome:'admin'}]
    })
    req.session.ContaUsuario = user
    if(req.session.ContaUsuario){
        let steamID = req.params.steamID
        const jogo = await Games.findAll({ where:{id: steamID},raw: true})
        const pc_usuario = await Computer.findOne({where: {UsuarioID: req.session.ContaUsuario.id}}) 
        const generos = getgeneros(jogo[0]['genero'])
        
        const {requisitomin,canplaymin,requisitomax,canplaymax,isvalido,mensagem} = comparar(jogo[0],pc_usuario)
        res.render('jogo', {JogoItens: jogo[0],isvalido,generos,requisitomin,canplaymin,requisitomax,canplaymax,mensagem});
    }else{
        res.render('login')
    }
})

// app.get('/steam/:steamID', async (req,res)=>{
//     const steamID = req.params.steamID
//     const pythonProcess = await spawn('python', ['./Apis/steam.py',steamID.toString()]);
//     let result = null
//     await pythonProcess.stdout.on('data', (data) => {
//         result = data.toString();
//         res.render('steam', { result : result});
//     });
// })

app.get('/user',async(req,res)=>{
    res.render('user')
})

app.post('/home',async(req,res)=>{
    const {cpu_input, gpu_input, ram_input, armazenamento_input} = req.body

    const ComputadorUsuario = await Computer.findOne({where: {
        UsuarioID: req.session.ContaUsuario.id
    }})

    console.log(`CPU: ${cpu_input} --- GPU: ${gpu_input}`)

    await ComputadorUsuario.update({
        UsuarioID:   req.session.ContaUsuario.id,
        CPUID: cpu_input,
        GPUID: gpu_input,//'a@gmail.com',
        RAM: ram_input,
        Armazenamento: armazenamento_input,
    })

    res.redirect('home')

})

app.post('/login', async(req,res)=>{
    const {email,senha} = req.body
    console.log("Login")
    const user = await User.findOne({where: {
        [Op.or]: [{ email: email }, { nome: email }]}})
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

app.post('/Favorito', async(req, res)=>{
    console.log('mto foda lek')
    // const {userid, jogoid} = req.body

    // await Favorito.create(
    //     {
    //         UsuarioID:userid,
    //         GameID:jogoid
    //     }
    // )

})

app.listen(3000,function(){
    console.log('Ok');
})



