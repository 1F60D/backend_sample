const express = require('express'); 

const home = express.Router(); 

home.get('/', (req, res, next) => {
  res.status(200).send('Routes Home'); 
}); 

module.exports = home; 