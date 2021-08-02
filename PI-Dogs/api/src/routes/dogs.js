const { Router } = require('express');
//const { Recipe, Dietype } = require('../db.js');
//const axios = require('axios');
//const { YOUR_API_KEY11 } = process.env;

const routes = Router();
 
routes.get('/', function(req, res) {
    res.send('ruta dogs')
});  