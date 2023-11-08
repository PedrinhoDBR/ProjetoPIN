const express = require('express');
const app = express();
const router = express.Router();
const json = express.json()
const { Op } = require("sequelize");
const steamgames = require('../models/steamgames');

const favorito = require('../models/Favorito');

router.get('/', async (req, res) => {

  let date = new Date().toJSON().slice(0, 10);
  let dateuser =  req.session.ContaUsuario.idade
  const dataSistema = new Date(date)
  const dataUsuario = new Date(dateuser)
  const diferencaEmMilissegundos = dataSistema - dataUsuario;
  const idadeUsuario = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25));

  try {
    const textoInserido = req.query.texto; // Obtenha o valor do campo de texto do cliente

    // Realize uma consulta ao banco de dados usando o modelo Sequelize
  var resultado 
  var fav
  var listaids = []
  const id = parseInt(req.session.ContaUsuario.id)
  fav = await favorito.findAll({where: {UsuarioID: id}})

  
  
  fav.forEach(element => {
      listaids.push(parseInt(element.GameID))
  })

  if(req.session.favorito){ 
      resultado = await steamgames.findAll({
          where: {
          [Op.and]: [
              { required_age: { [Op.lte]: idadeUsuario } },
              { name: { [Op.substring]: textoInserido } },
              { appid:  { [Op.in]:listaids}}
          ]
          },
          limit: 50,
          order:[['positive_ratings','ASC']],
          attributes: ['appid', 'name', 'header_image']
      });
  }else{
      resultado = await steamgames.findAll({
          where: {
            [Op.and]: [
              { required_age: { [Op.lte]: idadeUsuario } },
              { name: { [Op.substring]: textoInserido } }
            ]
          },
          limit: 50,
          order:[['positive_ratings','DESC']],
          attributes: ['appid', 'name', 'header_image']
        });
  }
    if (resultado) {
      res.json({ resultado: resultado, favoritos: listaids });
    } else {
      res.json({ resultado: 'Nenhum valor correspondente encontrado no banco de dados.' });
    }
  } catch (error) {
      // sessionStorage.setItem("error","Erro na consulta ao banco de dados.")
      res.status(500).json({ erro: 'Erro na consulta ao banco de dados.' });
  }
  });


module.exports = router;