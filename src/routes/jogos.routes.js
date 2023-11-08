const express = require('express');
const app = express();
const router = express.Router();

const { Op } = require("sequelize");
const User = require('../models/Usuario');
const Computer = require('../models/Computer');
const steamgames = require('../models/steamgames');
const {getgeneros} = require('../Controller/genero');
const {comparar} = require('../Controller/Comparation');
const Lista = require('../models/Lista');

router.get('/:steamID', async (req,res)=>{
    // const user = await User.findOne({where:  //para nao precisar ficar logando toda hora
    //     [{nome:'admin'}]
    // })
    // req.session.ContaUsuario = user
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

        res.render('jogo', {JogoItens: jogo[0],isvalido,generos,requisitomin,canplaymin,requisitomax,canplaymax,mensagem,pc_usuario,GPUs,processadores});
    }else{
        res.redirect('/login')
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


module.exports = router;