const express = require('express'); 
const { MySQLWrapper } = require('../../modules/database'); 
const { testQueries } = require('../../queries/mysql'); 

const dbTest = express.Router(); 


/** Get data (ALL) */
dbTest.get('/select', (req, res) => {
  const sql = testQueries.selectData();

  MySQLWrapper.EXEC_QUERY(sql) 
  .then((result) => {
    console.log('RESULT', result); 
    res.status(200).send(result); 
  })
  .catch((err) => {
    res.status(500).json({ 'error':  err }); 
  }); 

}); 

/** Get data (Single) */
dbTest.get('/select/:seq', (req, res) => {

  const getSingleNo = req.params.seq; 
  const sql = testQueries.selectSingleData(getSingleNo);  
  
  MySQLWrapper.EXEC_QUERY(sql)
  .then((result) => {

    if(result.length > 0) {
      res.status(200).send(result); 
    } else {
      res.status(404).send('Data is not founded');  
    }

  })
  .catch((err) => {
    res.status(500).json({ 'error': err }); 
  })

}); 

/** Insert(Create) single data */
dbTest.post('/insert', (req, res) => {

  /** data is must be object(json) type  */
  const getParams = req.body; 

  /** get sql query */
  const sql = testQueries.insertData(getParams); 

  MySQLWrapper.EXEC_QUERY(sql)
  .then((result) => {
    if(result.affectedRows > 0) {
      res.status(200).send(result); 
    } else {
      res.status(500).send('failed insert data'); 
    }
  })
  .catch((err) => {
    res.status(500).json({ 'error' : err }); 
  }); 
}); 

/** Modify data */
dbTest.put('/modify/:seq', (req, res) => {
  const getSeq = req.params.seq; 
  const getContent = req.body; 

  const sql = testQueries.updateData(getSeq, getContent); 

  MySQLWrapper.EXEC_QUERY(sql)
  .then((result) => {
    if(result.affectedRows > 0) {
      res.status(200).send(result); 
    } else {
      res.status(500).send('failed delete data'); 
    } 
  })
  .catch((err) => {
    res.status(500).json({'error' : err }); 
  }); 
  
}); 

/** Delete single data */
dbTest.delete('/delete/:seq', (req, res) => {
  const getSeq = req.params.seq; 
  const sql = testQueries.deleteData(getSeq); 

  MySQLWrapper.EXEC_QUERY(sql)
  .then((result) => {
    if(result.affectedRows > 0) {
      res.status(200).send(result); 
    } else {
      res.status(500).send('failed delete data'); 
    } 
  })
  .catch((err) => {
    res.status(500).json({'error' : err }); 
  }); 
});


module.exports = dbTest; 