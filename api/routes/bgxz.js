const util = require('util')
var express = require('express')
var router = express.Router()
var artoo = require('artoo-js')
cheerio = require('cheerio')
var request = require('request')
var entities = require('entities')
artoo.bootstrap(cheerio)
var Config = require('../../config/current/config')
var config = new Config()

var data = []
var url = ''

/* Department list */
router.get('/:id', function(req, res, next) {
	if(req.query.category=='bm'){
		url = util.format(config.getUrl('url.bgxz.department.bm'), req.params.id)
	}else{
		url = config.getUrl('url.bgxz.department.gr')
	}
	var pageNo = req.query.pageNo ? req.query.pageNo : 1 

  request.post({
  		url:url,
  		form:{
  			type: req.query.category,
				pageNo: pageNo,
				areaid: config.get('areaId'),
				deptid: req.params.id,
				sortcode: req.params.id,
				selname: ''
  		}
  	},
  	function(error, response, html){
	  if(!error){
			var $ = cheerio.load(html,{normalizeWhitespace: true })
			var items = $(config.get('match.bgxz.index.items')).scrape({
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
					var re = config.get('match.bgxz.index.item_code')
					if(url){
						var m = url.match(re)
						return m.length === 2 ? m[1] : ''
					}else{
						return ''
					}

					
				}
			})

			var summary = {}
			var raw = $(config.get('match.bgxz.index.page')).text()
			if(raw){
				var re = config.get('match.bgxz.index.summary')
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
	url = util.format(config.getUrl('url.bgxz.detail'), req.params.id)
  request.get({ url: url },
  	function(error, response, html){
	  if(!error){
			var $ = cheerio.load(html,{normalizeWhitespace: true })

			var items = $(config.get('match.bgxz.detail.items')).scrape({
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
									var re = config.get('match.bgxz.detail.file')
									var m = raw.match(re)
									console.log(raw)
									console.log(m)
									if(m){
										file['file_id'] = m[1]
										file['download_id'] = m[2]
										file['department_id'] = m[3]
										file['download_url'] = util.format(config.getUrl('url.bgxz.file'), m[1])

										m[2] 
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