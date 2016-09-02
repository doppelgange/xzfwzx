const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
cheerio = require('cheerio')
var request = require('request')
artoo.bootstrap(cheerio)
var data = []
var host = 'http://www.xnxzfwzx.gov.cn'
var path = '/bsznpermissionitem/%s.jspx'
var detailPath = '/jy_lawguide/%s.jspx'
var url = ''

/* Department list */
router.get('/:id', function(req, res, next) {
	if(req.query.category=='bm'){
		url = host + util.format(path, req.params.id)
	}else{
		url = host + '/bszn_list_Sort.jspx'
	}
	var pageNo = req.query.pageNo ? req.query.pageNo : 1 

  request.post({
  		url:url,
  		form:{
  			type: req.query.category,
				pageNo: pageNo,
				areaId: 421201,
				deptid: req.params.id,
				sortcode: req.params.id
  		}
  	},
  	function(error, response, html){
	  if(!error){
			var $ = cheerio.load(html)
			var items = $('.table_02 tr').scrape({
				line_num : function() {
					return $(this).find('td').eq(0).text()
				},
				volumn : function() {
					return $(this).find('td').eq(1).attr('title')
				},
				code : function() {
					return $(this).find('td').eq(2).attr('title')
				},
				name : function() {
					return $(this).find('td').eq(3).attr('title')
				},
				department : function() {
					return $(this).find('td').eq(4).attr('title')
				},
				action : function() {
					return $(this).find('td').eq(5).find('a').attr('href')
				}
			})

			var summary = {}
			if(items.length > 1 ){
				var raw = items[items.length - 1].line_num
				var re = /共\s*?(\d*?)\s*?条[^]+?每页\s*?(\d*?)\s*?条[^]+?当前\s*?(\d*?)\/(\d*?)\s/i
				// var re = /共\s*?(\d*?)\s*?条/i
				var m = raw.match(re)
				console.log(m.length)

				if(m.length == 5){
					summary['total_record'] = m[1]
					summary['page_length'] = m[2]
					summary['current_page'] = m[3]
					summary['total_page'] = m[4]
					console.log(summary)
				}
			}

			items = items.filter((item)=>{
				return item.name
			});
			var result = {items:items, summary:summary, url:url}
			console.log(result)
			res.json(result)
	  }
  })

})

// Get 事项
router.get('/detail/:id', function(req, res, next) {
	var url = host + util.format(detailPath, req.params.id)
	console.log(url)
  request.get({ url:url },
  	function(error, response, html){
	  if(!error){
			var $ = cheerio.load(html)
			// console.log(html)
			var items = $('.table_03 tr').scrape({
				label_text : function() {
					return $(this).find('th').text()
				},
				label : function() {
					return $(this).find('th').html()
				},
				contents_text : function() {
					return $(this).find('td').text()
				},
				contents : function() {
					console.log($(this).find('td').html())
					return $(this).find('td').html()
				}
			})

			items = items.filter((item)=>{
				return item.label
			});
			var result = {items:items, url:url}
			console.log(result)
			res.json(result)
		}
  })

})

module.exports = router