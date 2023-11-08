const express = require('express');
const app = express();
const router = express.Router();

const { Op } = require("sequelize");
const User = require('../models/Usuario');

router.get('/', (req,res)=>{
    res.render("esqueciasenha")
})

router.post("/", async(req,res)=>{
    const {email,novaSenha,confirmarNovaSenha} = req.body
    const user = await User.findOne({where:
        [{email:email}]
    })
    if(!user){
        req.session.msgerro = "Usuário não existe."
        res.render("esqueciasenha")
    }else if (novaSenha != confirmarNovaSenha){
        req.session.msgerro = "Senhas não coincidem."
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
        // console.log("Senha alterada") MSG de sucesso??
        res.redirect('login')
    }
    
})

module.exports = router;