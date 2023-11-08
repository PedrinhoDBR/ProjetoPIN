const express = require('express');
const app = express();
const router = express.Router();
const Lista = require('../models/Lista');
const Computer = require('../models/Computer');
app.use(express.json())
const Favorito = require('../models/Favorito');

router.get('/', async (req,res)=>{
    if (req.session.ContaUsuario){
        req.session.favorito = true
        const GPUs          = await Lista.findAll(
            {where:{PecaTipo:'GPU'},order:[['PecaDescricao','DESC']]})
        const processadores = await Lista.findAll(
            {where:{PecaTipo:'CPU'},order:[['PecaDescricao','DESC']]})


        const pc_usuario = await Computer.findOne({where: {
            UsuarioID: req.session.ContaUsuario.id
        }})

        res.render("home",{pc_usuario, GPUs, processadores});

    }else{
        res.redirect("login");
    }
})

router.post('/', async(req, res)=>{

    const {idgame,flag} = req.body;
    console.log(idgame+"  "+flag)
    try { //auto increment no banco
        // const idgame = req.query.gameid
        if (!flag){
            await Favorito.destroy(
                {
                    where: {
                    UsuarioID: req.session.ContaUsuario.id,
                    GameID:idgame
                    }
                }
            )
        }else{
            await Favorito.create(
                {
                    UsuarioID: req.session.ContaUsuario.id,
                    GameID:idgame
                }
            )
        }

    } catch (error) {
        // sessionStorage.setItem("error","Erro na consulta ao banco de dados.")
        res.status(500).json({ erro: 'Erro na consulta ao banco de dados.' });
    };


})

module.exports = router;