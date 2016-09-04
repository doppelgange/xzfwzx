var fs = require('fs')
var express = require('express')
var router = express.Router()

// Department list
router.get('/', function(req, res, next) {
	writeDataToFile({name : 'departments',data: {aaa:'bbb',ccc: 'ddd'}})
	res.json('')
})


function writeDataToFile(options){
	var dir = '../config/current/store/'
	var filename = dir + options.name + '.js'
	// console.log(__dirname)
	// console.log(fs.existsSync(dir))

	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	fs.writeFile(filename, JSON.stringify(options.data, null, 2), function (err,data) {
	  if (err) {
	    return console.log(err)
	  }
	  console.log(data)
	})

}
module.exports = router