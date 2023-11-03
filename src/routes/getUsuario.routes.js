const express = require('express');
const app = express();
const router = express.Router();

router.get('/',async (req,res)=>{
    const usuario = req.session.ContaUsuario
    res.json({ resultado: usuario });
})

module.exports = router;