var fs = require('fs')
// name
// data


module.exports = function (options){
	var dir = '../config/current/store/'
	var filename = dir + options.name + '.js'
	// console.log(__dirname)
	// console.log(fs.existsSync(dir))

	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}
	// JSON.stringify(options.data, null, 2)

	fs.writeFile(filename, JSON.stringify(options.data, null, 2), function (err,data) {
	  if (err) {
	    return console.log(err)
	  }
	  console.log(data)
	})

}
