const express = require('express');
const app = express();
const router = express.Router();

router.post('/', async(req, res)=>{
    console.log('mto foda lek')
    // const {userid, jogoid} = req.body

    // await Favorito.create(
    //     {
    //         UsuarioID:userid,
    //         GameID:jogoid
    //     }
    // )

})

module.exports = router;