import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import Bszn from './components/Bszn'
import BsznList from './components/BsznList'
import BsznDetail from './components/BsznDetail'

import Wssb from './components/Wssb'
import WssbList from './components/WssbList'
import WssbDetail from './components/WssbDetail'

import Blcx from './components/Blcx'
import Bgxz from './components/Bgxz'
import BgxzList from './components/BgxzList'
import BgxzDetail from './components/BgxzDetail'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter()

router.map({
  '/': {
    name: 'index',
    component: Home
  },
  '/bszn': {
    name: 'bszn',
    component: Bszn
  },
  '/bszn/:id': {
    name: 'bszn.show',
    component: BsznList
  },
  '/bszn/detail/:id': {
    name: 'bszn.detail.show',
    component: BsznDetail
  },
  '/wssb': {
    name: 'wssb',
    component: Wssb
  },
  '/wssb/:id': {
    name: 'wssb.show',
    component: WssbList
  },
  '/wssb/detail/:id': {
    name: 'wssb.detail.show',
    component: WssbDetail
  },
  '/blcx': {
    name: 'blcx',
    component: Blcx
  },
  '/bgxz': {
    name: 'bgxz',
    component: Bgxz
  },
  '/bgxz/:id': {
    name: 'bgxz.show',
    component: BgxzList
  },
  '/bgxz/detail/:id': {
    name: 'bgxz.detail.show',
    component: BgxzDetail
  }
})

router.start(App, '#app')

