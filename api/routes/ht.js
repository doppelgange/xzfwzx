//后台页面
const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
var cheerio = require('cheerio')
var request = require('request',{jar: true})
var tough = require('tough-cookie');
var cookiejar = new tough.CookieJar();

artoo.bootstrap(cheerio)
var data = []
var host = 'http://www.xnxzfwzx.gov.cn'
var path = '/wssb/matter.jspx?sxid=20150419111743027549'
var url = host + path

router.post('/wssb/matter', function(req,res,next){
	console.log(req.body.cookieJar)
	tough.CookieJar.deserialize(req.body.cookieJar, (err,userCookieJar)=>{
		console.log(userCookieJar.store)
		// res.json(userCookieJar)
		userCookieJar = request.jar(userCookieJar.store)
		request.get({
				url: url,
				jar: userCookieJar
			}, function(error, response, html){
				console.log(userCookieJar)
			  res.send(html)
		})
	})
})

module.exports = router