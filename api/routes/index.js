var express = require('express')
var router = express.Router()
var Config = require('../../config/current/config')
var config = new Config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'api for '+ config.get('govInfo.websiteTitle') })
});

module.exports = router
