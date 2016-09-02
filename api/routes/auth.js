const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
var cheerio = require('cheerio')
var request = require('request',{jar: true,followAllRedirects:true})
var tough = require('tough-cookie');
artoo.bootstrap(cheerio)
var data = []
var host = 'http://www.xnxzfwzx.gov.cn'
var loginPath = '/loginNoR.jspx'
var loginReturnPath = '/index2.jspx'

/* Department list */
router.post('/login', function(req, res, next) {
	console.log(req.body)

	var j = request.jar()
	request.post({
		url: host + loginPath,
		form: {
			returnUrl: loginReturnPath,
			username: req.body.username, //'doppelganger',
			pwd: req.body.password ,//'3792565Jj',
		},
		jar: j
	}, function(error, response, html){
		if(html){
			var $ = cheerio.load(html, {normalizeWhitespace: true})
			var error = $('.login-text').text()
			res.json({
				status: 'error',
				message: error
			})
		}else{
			// console.log(response.headers)
			// request.get({ url: response.headers.location}, (error, response, html) => {
			// 	// console.log(html)
			// 		res.send(html)
			// })
			// // console.log(error)
			// console.log(response.headers.location)
			// // console.log(html)
			res.json({
				status: 'success',
				cookieJar: j._jar
			})


		}
		

		
	})
})

router.post('/system', function(req,res,next){
	tough.CookieJar.deserialize(req.body.cookieJar, (err,userCookieJar)=>{
		console.log(userCookieJar.store)
		// res.json(userCookieJar)
		userCookieJar = request.jar(userCookieJar.store)
		request.get({
				url: 'http://www.xnxzfwzx.gov.cn/member/index.jspx',
				jar: userCookieJar
			}, function(error, response, html){
				console.log(userCookieJar)
			  res.send(html)
		})
	})	
})

module.exports = router