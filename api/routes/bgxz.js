const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
cheerio = require('cheerio')
var request = require('request')
var entities = require('entities')
artoo.bootstrap(cheerio)
var data = []
var host = 'http://www.xnxzfwzx.gov.cn'
var path =  '/tableListByDept/%s.jspx'
var detailPath = '/download/%s.jspx'
var url = ''

/* Department list */
router.get('/:id', function(req, res, next) {
	if(req.query.category=='bm'){
		url = host + util.format(path, req.params.id)
	}else{
		url = host + '/table_list_Sort.jspx'
	}
	var pageNo = req.query.pageNo ? req.query.pageNo : 1 

  request.post({
  		url:url,
  		form:{
  			type: req.query.category,
				pageNo: pageNo,
				areaid: 421201,
				deptid: req.params.id,
				sortcode: req.params.id,
				selname: ''
  		}
  	},
  	function(error, response, html){
	  if(!error){
			var $ = cheerio.load(html)
			var items = $('.table_02 tr.td').scrape({
				line_num : function() {
					return $(this).find('td').eq(0).text()
				},
				name : function() {
					return $(this).find('td').eq(1).attr('title')
				},
				department : function() {
					return $(this).find('td').eq(2).attr('title')
				},
				download_url : function() {
					return $(this).find('td').eq(3).find('a').attr('href')
				},
				code : function() {
					var url = $(this).find('td').eq(3).find('a').attr('href')
					console.log(url)
					var re = /download\/(.*?)\.jspx/i
					if(url){
						var m = url.match(re)
						return m.length === 2 ? m[1] : ''
					}else{
						return ''
					}

					
				}
			})

			var summary = {}
			var raw = $('.page_1').text()
			if(raw){
				var re = /共\s*?(\d*?)\s*?条[^]+?每页\s*?(\d*?)\s*?条[^]+?当前\s*?(\d*?)\/(\d*?)\s/i
				var m = raw.match(re)

				if(m.length == 5){
					summary['total_record'] = m[1]
					summary['page_length'] = m[2]
					summary['current_page'] = m[3]
					summary['total_page'] = m[4]
				}
			}
			

			items = items.filter((item)=>{
				return item.name
			});
			var result = {items:items, summary:summary, url:url}
			// console.log(result)
			res.json(result)
	  }
  })

})


router.get('/detail/:id', function(req, res, next) {
	url = host + util.format(detailPath, req.params.id)
  request.get({ url: url },
  	function(error, response, html){
	  if(!error){
			var $ = cheerio.load(html)

			var items = $('.table02').scrape({
				title: {
			    sel: 'tr.ta',
			    methods: 'text'
			  },
			  items: {
          scrape: {
            iterator: 'tr:not(.ta)',
            data: {
              label: function() {
								return $(this).find('td').eq(0).text()
							},
              contents: function() {
								return $(this).find('td').eq(1).text()
							},
							file: function() {
								var file = {}
								var raw = entities.decodeHTML($(this).find('td').eq(1).html())
								console.log(raw)
								if(raw){
									var re = /download\('(.*?)','(.*?)','(.*?)','(.*?)'/i
									var m = raw.match(re)
									console.log(raw)
									console.log(m)
									if(m){
										file['file_id'] = m[1]
										file['download_id'] = m[2]
										file['department_id'] = m[3]
									}
								}
								return file
							},
            }
          }
        }
			})

			// items = items.filter((item)=>{
			// 	return item.name
			// });
			var result = {items:items, url:url}
			// console.log(result)
			res.json(result)
	  }
  })

})




module.exports = router