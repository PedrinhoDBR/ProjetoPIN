const express = require('express');
const app = express();
const router = express.Router();

const { Op } = require("sequelize");
const steamgames = require('../models/steamgames');

router.get('/', async (req, res) => {

console.log(req.session.ContaUsuario)

    let date = new Date().toJSON().slice(0, 10);
    let dateuser =  req.session.ContaUsuario.idade
    const dataSistema = new Date(date)
    const dataUsuario = new Date(dateuser)
    const diferencaEmMilissegundos = dataSistema - dataUsuario;
    const idadeUsuario = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24 * 365.25));

    try {
      const textoInserido = req.query.texto; // Obtenha o valor do campo de texto do cliente
  
      // Realize uma consulta ao banco de dados usando o modelo Sequelize

      const resultado = await steamgames.findAll({
        where: {
          [Op.and]: [
            { header_image: { [Op.not]: null } },
            { required_age: { [Op.lte]: idadeUsuario } },
            { name: { [Op.substring]: textoInserido } }
          ]
        },
        limit: 50,
        order:[['positive_ratings','DESC']],
        attributes: ['appid', 'name', 'header_image']
      });

      if (resultado) {
        res.json({ resultado: resultado });
      } else {

        res.json({ resultado: 'Nenhum valor correspondente encontrado no banco de dados.' });
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({ erro: 'Erro na consulta ao banco de dados.' });
    }
  });


module.exports = router;