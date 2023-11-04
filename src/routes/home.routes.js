const express = require('express');
const app = express();
const router = express.Router();


const { Op } = require("sequelize");
const User = require('../models/Usuario');
const Computer = require('../models/Computer');
const steamgames = require('../models/steamgames');
const Lista = require('../models/Lista');


router.get('/', async (req,res)=>{
    // const user = await User.findOne({where:  //para nao precisar ficar logando toda hora
    // [{nome:'admin'}]
    // })
    // req.session.ContaUsuario = user
    if (req.session.ContaUsuario){
        req.session.favorito = false
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
        res.redirect('/login')
    }
})

router.post('/',async(req,res)=>{
    const {cpu_input, gpu_input, ram_input, armazenamento_input} = req.body

    const ComputadorUsuario = await Computer.findOne({where: {
        UsuarioID: req.session.ContaUsuario.id
    }})

    await ComputadorUsuario.update({
        UsuarioID:   req.session.ContaUsuario.id,
        CPUID: cpu_input,
        GPUID: gpu_input,//'a@gmail.com',
        RAM: ram_input,
        Armazenamento: armazenamento_input,
    })

    res.redirect('home')
})



module.exports = router;