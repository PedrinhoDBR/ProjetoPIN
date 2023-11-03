(async()=>{
const database = require('./db')
const User = require('./models/Usuario')
const games = require('./models/games')
const GPU = require('./models/GPU')
const CPU = require('./models/CPU')
const Computer = require('./models/Computer')
const Favorito = require('./models/Favorito')
const Lista = require('./models/Lista')
const steamgames = require('./models/steamgames')
// const steamimages = require('./models/steamimages')
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
const {getjogos} = require('./Controller/GetJogos');
const Lista = require('./models/Lista');
const steamgames = require('./models/steamgames')
// const steamimages = require('./models/steamimages')

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

        const newcomputer = await Computer.create({
            UsuarioID: newuser.id,
            RAM: 0,
            Armazenamento: 0
        })

        res.redirect('login')
    }
})


app.get('/usuario',(req,res)=>{
    res.render("usuario");
})


app.get('/',(req,res)=>{
    res.render("registro");
})

app.get('/esqueciasenha', (req,res)=>{
    res.render("esqueciasenha")
})



app.get('/home', async (req,res)=>{
    const user = await User.findOne({where:  //para nao precisar ficar logando toda hora
    [{nome:'admin'}]
    })
    req.session.ContaUsuario = user
    if (req.session.ContaUsuario){

        //pegar idade do usuario
        let date = new Date().toJSON().slice(0, 10);
        let dateuser =  req.session.ContaUsuario.idade
        const dataSistema = new Date(date)
        const dataUsuario = new Date(dateuser)
        const diferencaEmMilissegundos = dataSistema - dataUsuario;
        const idadeUsuario = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25));

        
        const jogos = await steamgames.findAll({
            attributes:['appid','name','header_image'],
            limit: 50 ,
            order:[['positive_ratings','DESC']], //ordena por ordem alfabetica
            where: {required_age:{[Op.lte]: idadeUsuario}}
            
        })

        const GPUs          = await Lista.findAll(
            {where:{PecaTipo:'GPU'},order:[['PecaDescricao','DESC']]})
        const processadores = await Lista.findAll(
            {where:{PecaTipo:'CPU'},order:[['PecaDescricao','DESC']]})


        const pc_usuario = await Computer.findOne({where: {
            UsuarioID: req.session.ContaUsuario.id
        }})

        res.render("home",{jogos,pc_usuario, GPUs, processadores});

    }else{
        res.redirect("login");
    }
})

app.get('/computer', async (req,res)=>{
    if (req.session.ContaUsuario){
        res.render("computador");

    }else{
        res.redirect("registro");
    }
})

app.get('/getusuario',async (req,res)=>{
    const usuario = req.session.ContaUsuario
    res.json({ resultado: usuario });
})



app.get('/consultar', async (req, res) => {

    let date = new Date().toJSON().slice(0, 10);
    let dateuser =  req.session.ContaUsuario.idade
    const dataSistema = new Date(date)
    const dataUsuario = new Date(dateuser)
    const diferencaEmMilissegundos = dataSistema - dataUsuario;
    const idadeUsuario = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25));

    try {
      const textoInserido = req.query.texto; // Obtenha o valor do campo de texto do cliente
  
      // Realize uma consulta ao banco de dados usando o modelo Sequelize

      const resultado = await steamgames.findAll({
        where: {
          [Op.and]: [
            { header_image: { [Op.not]: null } },
            { required_age: { [Op.lte]: idadeUsuario } },
            { name: { [Op.substring]: textoInserido } }
          ]
        },
        limit: 50,
        order:[['positive_ratings','DESC']],
        attributes: ['appid', 'name', 'header_image']
      });

      if (resultado) {
        res.json({ resultado: resultado });
      } else {

        res.json({ resultado: 'Nenhum valor correspondente encontrado no banco de dados.' });
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({ erro: 'Erro na consulta ao banco de dados.' });
    }
  });


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
        const jogo = await steamgames.findAll({ where:{appid: steamID},raw: true})
        const pc_usuario = await Computer.findOne({where: {UsuarioID: req.session.ContaUsuario.id}}) 
        const generotxt = await steamgames.findAll({
            attributes:['steamspy_tags'],
            where:{appid: steamID}})
        const generos = getgeneros(generotxt)
        
        const {requisitomin,canplaymin,requisitomax,canplaymax,isvalido,mensagem} = comparar(jogo[0],pc_usuario)

        const GPUs          = await Lista.findAll(
            {where:{PecaTipo:'GPU'},order:[['PecaDescricao','DESC']]})
        const processadores = await Lista.findAll(
            {where:{PecaTipo:'CPU'},order:[['PecaDescricao','DESC']]})



        console.log(pc_usuario)
        res.render('jogo', {JogoItens: jogo[0],isvalido,generos,requisitomin,canplaymin,requisitomax,canplaymax,mensagem,pc_usuario,GPUs,processadores});
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



