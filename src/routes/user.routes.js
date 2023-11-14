const express = require('express');

const User = require('../models/Usuario');
const Computer = require('../models/Computer');
const Lista = require('../models/Lista');

const router = express.Router();

router.get('/', async (req, res) => {
  const usuario = req.session.ContaUsuario
  if (usuario){

  const GPUs          = await Lista.findAll(
    {where:{PecaTipo:'GPU'},order:[['PecaDescricao','DESC']]})
  const processadores = await Lista.findAll(
      {where:{PecaTipo:'CPU'},order:[['PecaDescricao','DESC']]})

  const pc_usuario = await Computer.findOne({where: {
      UsuarioID: req.session.ContaUsuario.id
  }})


  res.render("usuario",{pc_usuario, GPUs, processadores,user: usuario});
  }else{
    res.redirect('/login')
  }
});

module.exports = router;
