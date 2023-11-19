const express = require('express');
const router = express.Router();

const Computer = require('../models/Computer');
const Lista = require('../models/Lista');

router.get('/', async (req,res)=>{
    const usuario = req.session.ContaUsuario
    if (usuario){
    const GPUs          = await Lista.findAll(
        {where:{PecaTipo:'GPU'},order:[['PecaDescricao','DESC']]})
    const processadores = await Lista.findAll(
        {where:{PecaTipo:'CPU'},order:[['PecaDescricao','DESC']]})

    const pc_usuario = await Computer.findOne({where: {
        UsuarioID: req.session.ContaUsuario.id
    }})


    res.render("help",{pc_usuario, GPUs, processadores,user: usuario});
    }else{
        res.redirect('/login')
    }
})

module.exports = router;