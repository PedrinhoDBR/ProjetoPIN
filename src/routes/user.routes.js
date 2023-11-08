const express = require('express');

const User = require('../models/Usuario');


const router = express.Router();

router.get('/', (req, res) => {
  res.render("usuario");
});

module.exports = router;
