'use strict'

module.exports = function () {
  this.options = {
    govInfo: {
      fullName: '通山县',
      shortName: '通山',
      websiteTitle: '通山县政务服务中心移动版 - 让数据多跑路 群众少跑路',
      homepageTitle: '通山县政务服务中心 ',
      slogen: {
        0: '让数据多跑腿<br/>群众少跑路',
        1: '云上通山<br/>政务办事不跑路，不求人'
      },
      host: 'http://tszwfw.tongshan.gov.cn/'
    },
    areaId: 421281,
    host: 'http://tszwfw.tongshan.gov.cn/',
    port: 3004,
    url: {
      bszn: {
        index: 'bsznindex.jspx',
        department: {
          bm: 'bsznpermissionitem/%s.jspx',
          gr: 'bszn_list_Sort.jspx',
          qy: 'bszn_list_Sort.jspx'
        },
        detail: 'jy_lawguide/%s.jspx'
      },
      blcx: {
        index: 'blcxindex.jspx',
        post: ''
      },
      bgxz: {
        index: 'tableindex.jspx',
        department: {
          bm: 'tableListByDept2/%s.jspx',
          gr: 'table_list_Sort.jspx',
          qy: 'table_list_Sort.jspx'
        },
        detail: 'download/%s.jspx',
        file: 'servlet/downloadFileServlet?fileNo=%s'
      },
      wssb: {
        index: 'wssbindex.jspx',
        department: {
          bm: 'wssb2/%s.jspx',
          gr: 'wssb_list_Sort.jspx',
          // 'wssb_list_Sort.jspx?sortcode=001001008&areaid=421281&type=gr'
          qy: 'wssb_list_Sort.jspx'
        },
        detail: '/wssb/matter.jspx?sxid=%s'
      }
    },
    match: {
      bszn: {
        department: {
          category_code: /type=(.{2})/i,
          service_item_id: /(?:bsznpermissionitem.*\/|sortcode=)(.*?)(?:.jspx|&)/i
        },
        index: {
          items: '.table_02 tr',
          summary: /共\s*?(\d*?)\s*?条[^]+?每页\s*?(\d*?)\s*?条[^]+?当前\s*?(\d*?)\/(\d*?)\s/i
        }
      },
      wssb: {
        index: {
          items: '.table_02 tr.tl',
          page: '.page_1',
          summary: /共\s*?(\d*?)\s*?条[^]+?每页\s*?(\d*?)\s*?条[^]+?当前\s*?(\d*?)\/(\d*?)\s/i
        }
      },
      bgxz: {
        index: {
          items: '.table_02 tr.td',
          item_code: /download\/(.*?)\.jspx/i,
          page: '.page_1',
          summary: /共\s*?(\d*?)\s*?条[^]+?每页\s*?(\d*?)\s*?条[^]+?当前\s*?(\d*?)\/(\d*?)\s/i
        },
        detail: {
          items: '.table02',
          file: /download\('(.*?)','(.*?)','(.*?)','(.*?)'/i
        }
      }
    }
  }

  this.get = function(attrPath){
    var arr = attrPath.split('.')
    var obj = this.options
    while (arr.length) {
      obj = obj[arr.shift()]
    }
    return obj
  }

  this.getUrl = (attrPath) => {
    var url = this.get(attrPath)
    return (typeof url === 'string') ? this.get('host') + url : ''
  }
}
