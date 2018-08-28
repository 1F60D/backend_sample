const express = require('express');  

const fileTrans = express.Router(); 

/** Multer 기본 설정  */
// reference : https://github.com/expressjs/multer/blob/master/doc/README-ko.md  

const multer = require('multer'); 
const storage =  multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './public/uploads/profiles')
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now())
      }
    }); 
const upload = multer({ dest: './public/uploads/', limits: { fileSize: 2 * 1024 * 1024 }, storage: storage });
const uploadType = upload.single('profile'); 

fileTrans.post('/upload', uploadType, (req, res) => {
  console.log(req.file); 
  res.status(200).send('ok'); 
}); 

module.exports = fileTrans; 