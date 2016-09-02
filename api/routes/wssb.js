const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
cheerio = require('cheerio')
var request = require('request')
artoo.bootstrap(cheerio)
var data = []
var host = 'http://www.xnxzfwzx.gov.cn'
var path = '/wssb/%s.jspx'
var url = ''


/* GET  listing. */
router.get('/:id', function(req, res, next) {
	if(req.query.category=='bm'){
		url = host + util.format(path, req.params.id)
	}else{
		url = host + '/wssb_list_Sort.jspx'
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
			var items = $('.table_02 tr.tl').scrape({
				name : function() {
					return $(this).find('td').eq(0).attr('title')
				},
				bszn_url : function() {
					return $(this).find('td').eq(0).find('a').attr('href')
				},
				department : function() {
					return $(this).find('td').eq(1).attr('title')
				},
				download_url : function() {
					return $(this).find('td').eq(2).find('a').attr('href')
				},
				zxsb_url : function() {
					return $(this).find('td').eq(4).find('a').attr('href')
				}
			})

			var summary = {}
			var raw = $('.page_1').text()
			console.log(raw)
			if(raw){
				var re = /共\s*?(\d*?)\s*?条[^]+?每页\s*?(\d*?)\s*?条[^]+?当前\s*?(\d*?)\/(\d*?)\s/i
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

module.exports = router