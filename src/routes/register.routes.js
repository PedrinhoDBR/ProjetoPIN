const express = require('express');
const { Op } = require("sequelize");
const User = require('../models/Usuario');
const Computer = require('../models/Computer');



const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, email, idade, senha, Confirmasenha } = req.body;

  console.log("registro");
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { nome: nome }]
    }
  });

  if (user) {
    console.log("usuario/email ja usado");
    res.redirect("registro");
  } else if (senha != Confirmasenha) {
    console.log("Senhas não coincidem");
    res.redirect("registro");
  } else {
    console.log("teste");
    const newuser = await User.create({
      nome: nome,
      email: email,
      idade: idade,
      senha: senha,
      tipo: 'user'
    });

    const newuserid = newuser.id;

    const newcomputer = await Computer.create({
      UsuarioID: newuser.id,
      RAM: 0,
      Armazenamento: 0
    });

    res.redirect('login');
  }
});

router.get('/', (req, res) => {
  res.render("registro");
});

module.exports = router;
