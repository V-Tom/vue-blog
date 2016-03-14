var express = require('express');
var router = express.Router();
var Config = require('../config');
var FS = require('fs');


/* GET home page. */
router.get('/', function (req, res, next) {
  return res.sendFile(__dirname + '/index.html')
});
module.exports = router;
