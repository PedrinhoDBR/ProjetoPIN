const express = require('express');
const app = express();
const router = express.Router();

router.get('/', async (req,res)=>{
    if (req.session.ContaUsuario){
        res.render("computador");

    }else{
        res.redirect("registro");
    }
})

module.exports = router;