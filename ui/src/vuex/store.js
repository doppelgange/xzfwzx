import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLoading: false,
  direction: 'forward',
  pageTitle: '',
  categories: [
    {
      category: {
        code: 'bm',
        name: '部门'
      },
      services: [
        {
          service_name: '常驻窗口',
          service_items: [
            {id: '011337135', name: '市安监局'},
            {id: '421226526', name: '市城管局'},
            {id: '01133716X', name: '市财政局'},
            {id: '011337370', name: '市地税局'},
            {id: '421226171', name: '市地震局'},
            {id: '421226158', name: '市房产局'},
            {id: '011336925', name: '市发改委'},
            {id: '011337071', name: '市公安局'},
            {id: '011337768', name: '市广电局'},
            {id: '422208493', name: '市规划局'},
            {id: '011337186', name: '市国税局'},
            {id: '011337207', name: '市工商局'},
            {id: '011337231', name: '市国土局'},
            {id: '011337514', name: '市环保局'},
            {id: '111111126', name: '市经济开发区'},
            {id: '011337442', name: '市交通局'},
            {id: '011337776', name: '市教育局'},
            {id: '01133732X', name: '市老龄办'},
            {id: '011337653', name: '市林业局'},
            {id: '011337610', name: '市气象局'},
            {id: '730887037', name: '市人防办'},
            {id: '011337127', name: '市人社局'},
            {id: '011337629', name: '市水务局'},
            {id: '76413130X', name: '市商务局'},
            {id: '011336714', name: '市司法局'},
            {id: '011337856', name: '市卫计委'},
            {id: '741761173', name: '市文新广局'},
            {id: '011337485', name: '市食药监局'},
            {id: '011337506', name: '市质监局'},
            {id: '011337469', name: '市住建委'}
          ]
        },
        {
          service_name: '综合窗口',
          service_items: [
            {id: '011338007', name: '市供销社'},
            {id: '764137824', name: '市国资委'},
            {id: '011336941', name: '市科技局'},
            {id: '011337346', name: '市民宗局'},
            {id: '011337637', name: '市农业局'},
            {id: '111111111', name: '人民银行'},
            {id: '011337688', name: '市水产局'},
            {id: '011337303', name: '市无委办'},
            {id: '011337549', name: '市邮政局'}
          ]
        }, {
          service_name: '临时窗口',
          service_items: []
        }, {
          service_name: '服务窗口',
          service_items: [
            {id: '111111123', name: '诚胜旅行社'},
            {id: '111111117', name: '枫丹公交公司'},
            {id: '011337418', name: '市供电公司'},
            {id: '111111116', name: '昆仑天然气有限公司'},
            {id: '111111124', name: '人保财险公司'},
            {id: '111111121', name: '温泉刻字社'},
            {id: '111111125', name: '香城都市报'},
            {id: '111111115', name: '咸宁联合水务公司'},
            {id: '111111118', name: '中国电信'},
            {id: '111111120', name: '中国联通'},
            {id: '111111119', name: '中国移动'}
          ]
        }, {
          service_name: '监督窗口',
          service_items: [
            {id: '111111113', name: '行风热线'},
            {id: '111111112', name: '效能监察中心'},
            {id: '111111114', name: '中心投诉窗口'}
          ]
        }, {
          service_name: '窗口电话',
          service_items: [
            {link: '/lxdh/19403.jhtml', name: '窗口电话'}
          ]
        }
      ]
    },
    {
      category: {
        code: 'gr',
        name: '个人'
      },
      services: [
        {
          service_name: '',
          service_items: [
            {id: '001001008', name: '教育'},
            {id: '001001009', name: '职业资格'},
            {id: '001001010', name: '社会保障'},
            {id: '001001012', name: '户籍'},
            {id: '001001013', name: '证件办理'},
            {id: '001001016', name: '公用事业'},
            {id: '001001017', name: '出入境'},
            {id: '001001018', name: '公安司法'}
          ]
        }
      ]
    }, {
      category: {
        code: 'qy',
        name: '企业'
      },
      services: [
        {
          service_name: '',
          service_items: [
            {id: '002001001', name: '准营准办'},
            {id: '002001002', name: '设立变更'},
            {id: '002001003', name: '年审年检'},
            {id: '002001004', name: '资质认证'},
            {id: '002001012', name: '安全防护'},
            {id: '002001015', name: '土地房产'},
            {id: '002001017', name: '财务税务'},
            {id: '002001021', name: '综合其它'}
          ]
        }
      ]
    }
  ],
  formData: {}
}
export default new Vuex.Store({
  state,
  mutations: {
    UPDATE_LOADING (state, status) {
      state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
      state.direction = direction
    },
    UPDATE_PAGE_TITLE (state, pageTitle) {
      state.pageTitle = pageTitle
    },
    SET_FORM_DATA (state, formData) {
      state.formData = formData
    }
  }
})
