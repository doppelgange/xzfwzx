const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
var cheerio = require('cheerio')
var request = require('request',{jar: true})
var tough = require('tough-cookie');

artoo.bootstrap(cheerio)
var data = []
var host = 'http://www.xnxzfwzx.gov.cn'
var path = '/bsznpermissionitem/%s.jspx'
var detailPath = '/jy_lawguide/%s.jspx'
var url = ''
var cookieString = ''

console.log(request)

/* Department list */
router.get('/login', function(req, res, next) {
	var j = request.jar()
	request.post({
		url: 'http://www.xnxzfwzx.gov.cn/loginNoR.jspx',
		form: {
			returnUrl: '/index2.jspx',
			username: 'doppelganger',
			pwd: '3792565Jj',
		},
		jar: j
	}, function(error, response, html){
		cookies = j.getCookieString('http://www.xnxzfwzx.gov.cn/')	 
		console.log(cookies)
		// console.log(request.parse(cookies))
		res.json(cookies)
	})
})

router.post('/system', function(req,res,next){
	console.log(req.body)
	console.log(req.body.cookies)
	var q = request.jar()
	for(i = 0; i<req.body.cookies.length; i++){
		q.setCookie(req.body.cookies[i],'http://www.xnxzfwzx.gov.cn/')
	}
	
	console.log(q)
	request.get({
			url: 'http://www.xnxzfwzx.gov.cn/member/index.jspx',
			jar: q
		}, function(error, response, html){
			console.log(q)
		  res.send(html)
	})
})

module.exports = router