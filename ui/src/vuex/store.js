import Vue from 'vue'
import Vuex from 'vuex'
import Config from '../../../config/current/config'
var config = new Config()
Vue.use(Vuex)

const state = {
  govInfo: config.get('govInfo'),
  isLoading: false,
  direction: 'forward',
  pageTitle: '',
  categories: [],
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
    UPDATE_CATEGORIES (state, categories) {
      state.categories = categories
    },
    SET_FORM_DATA (state, formData) {
      state.formData = formData
    }
  }
})
