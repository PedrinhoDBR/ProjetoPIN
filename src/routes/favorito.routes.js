const express = require('express');
const app = express();
const router = express.Router();
const Lista = require('../models/Lista');
const Computer = require('../models/Computer');
const steamgames = require('../models/steamgames');

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
    console.log('mto foda lek')
    // const {userid, jogoid} = req.body

    // await Favorito.create(
    //     {
    //         UsuarioID:userid,
    //         GameID:jogoid
    //     }
    // )

})

module.exports = router;