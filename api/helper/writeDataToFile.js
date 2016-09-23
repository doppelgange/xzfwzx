var fs = require('fs')
var path = require('path')

module.exports = function (options){
  var dir = path.join(__dirname,'../../config/current/store/')
  var filename = dir + options.name + '.js'

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
