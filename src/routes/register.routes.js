const express = require('express');
const app = express();
const { Op } = require("sequelize");
const User = require('../models/Usuario');
const Computer = require('../models/Computer');
app.use(express.json())


const router = express.Router();

router.post('/', async (req, res) => {
  const { id, nome, email, idade, senha, senha2 } = req.body;
  
  console.log(nome);

  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { nome: nome }]
    }
  });
  if (user) {
    req.session.msgerro = "Usuario/email ja usado."
    res.redirect('registro')
  } else if (senha != senha2) {
    req.session.msgerro = "Senhas não coincidem."
    res.redirect('registro')
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

    res.redirect('/login');
  }



});

router.get('/', (req, res) => {
  res.render("registro");
});

module.exports = router;
