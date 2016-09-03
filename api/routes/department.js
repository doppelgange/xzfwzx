const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
cheerio = require('cheerio')
var request = require('request')
var entities = require('entities')
artoo.bootstrap(cheerio)
var data = []
var Config = require('../../config/current/config')
var config = new Config()

// Department list
router.get('/', function(req, res, next) {
	var url = config.getUrl('url.bszn.index')
  request.get( { url: url }, function(error, response, html){
	  if(error) {
	  	res.json({ status:'error', items:[], summary:[], url:url})
	  }
		var $ = cheerio.load(html,{normalizeWhitespace: true })
		//抓取分类
		var categories = $('.mu li').scrape({
			category_name : 'text'
		})

		//抓取部门

		var departmentCount = 0

		var department = $('.selectTag1').scrape({
			category_name : function(){
				// console.log($(this).parents('div.tab_cont.cl').prev().find('li').text())
				var text = $(this).parents('div.tab_cont.cl').prev().find('li').eq(departmentCount).text()
				departmentCount ++
				return text
			},
			category_code : function(){
      	var url = $(this).find('ul.servie li a').eq(0).attr('href')
      	// console.log(config.get('regex.bszn.department.category_code'))
      	var re = config.get('regex.bszn.department.category_code')  ///type=(.{2})/i 
				if(url){
					var m = url.match(re)
					if(m){
						return m.length === 2 ? m[1] : ''
					}else{
						return ''
					}
					
				}else{
					return ''
				}
			},
		  items: {
        scrape: {
          iterator: 'ul.servie', //'div:not(.cl)',
          data: {
            service_name : function(){
            	// console.log($(this).prev().text())
							return $(this).prev().text()
						},
						service_items: {
							scrape: {
			          iterator: 'li a', //'div:not(.cl)',
			          data: {
			            id : function(){
										var url = $(this).attr('href')
										var re = config.get('regex.bszn.department.service_item_id') //  /(?:bsznpermissionitem.*\/|sortcode=)(.*?)(?:.jspx|&)/i
										if(url){
											var m = url.match(re)
											if(m){
												return m.length === 2 ? m[1] : ''
											}else{
												return ''
											}
											
										}else{
											return ''
										}
									},
									url: 'href',
									name: 'title'
			          }
			        }
						}
          }
        }
      }
		})
		res.json(department)
  })
})



module.exports = router