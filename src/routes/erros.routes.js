const express = require('express');
const app = express();
const router = express.Router();

const { Op } = require("sequelize");

router.get('/',(req,res)=>{

    var msgerror = req.session.msgerro
    if (msgerror){
        req.session.msgerro = null
        res.json({erro:msgerror})
    }else{
        res.json({erro:''})
    }
})

module.exports = router;