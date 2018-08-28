const express = require('express'); 
const home = require('./home'); 
const db = require('./db'); 
const file = require('./file'); 


const router = express.Router(); 

router.use('/', home); 
router.use('/api/v1/db', db); 
router.use('/api/v1/file', file); 

module.exports = router; 