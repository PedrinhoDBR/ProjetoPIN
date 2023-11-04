const express = require('express');
const app = express();
const router = express.Router();

const { Op } = require("sequelize");
const User = require('../models/Usuario');


router.get('/',(req,res)=>{
    res.render("login");

})

router.post('/', async(req,res)=>{
    const {email,senha} = req.body
    console.log("Login")
    const user = await User.findOne({where: {
        [Op.or]: [{ email: email }, { nome: email }]}})
    if(!user){
        req.session.msgerro = "Usuário não existe."
        res.redirect('login')
    }else if(senha != user.senha){
        req.session.msgerro = "Senha incorreta."
        res.redirect('login')
    }else{
        req.session.ContaUsuario = user
        res.redirect('home')
    }
})


module.exports = router;