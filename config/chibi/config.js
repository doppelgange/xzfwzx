'use strict';

module.exports = function() {
	this.options = {
		name : '赤壁市',
		areaId: 421281,
	  host : 'http://www.cbxzfw.gov.cn/',
	  url : {
	  	bszn : {
	  		index : 'bsznindex.jspx',
	  		department: {
	  			bm: '/bsznpermissionitem2/%s.jspx',
	  			gr: 'bszn_list_Sort.jspx',
	  			qy: 'bszn_list_Sort.jspx'
	  		},
	  		detail: '/bsznpermissionitem2/%s.jspx'
	  	},
	  	blcx : {
	  		index: 'blcxindex.jspx',
	  		post: ''
	  	},
	  	bgxz: {
	  		index: 'tableindex.jspx',
	  		department : {
	  			bm : 'tableListByDept2/%s.jspx',
	  			gr: 'table_list_Sort.jspx',
	  			qy: 'table_list_Sort.jspx'
	  		},
	  		detail: 'download/%s.jspx',
	  		file: 'servlet/downloadFileServlet?fileNo=%s'
	  	},
	  	wssb : {
	  		index : 'wssbindex.jspx',
	  		department : {
	  			bm: 'wssb2/%s.jspx',
	  			gr: 'wssb_list_Sort.jspx',//'wssb_list_Sort.jspx?sortcode=001001008&areaid=421281&type=gr'
	  			qy: 'wssb_list_Sort.jspx'
	  		},
	  		detail: '/wssb/matter.jspx?sxid=%s'
	  	}
	  },
	  regex: {
	  	bszn :{
	  		department : {
	  			category_code : /type=(.{2})/i,
	  			service_item_id: /(?:bsznpermissionitem.*\/|sortcode=)(.*?)(?:.jspx|&)/i
	  		}
	  	}
	  }
	}

	this.get = (attr_path) =>{
		var arr = attr_path.split('.');
		var obj = this.options
    while(arr.length){
    	obj = obj[arr.shift()]
    }
    return obj? obj: ''
	}

	this.getUrl = (attr_path) => {
		var url = this.get(attr_path)
		return (typeof url === 'string') ? this.get('host') + url : ''
	}
}
