<template>
  <div v-if="currentCategory">
    <tab :line-width="2">
      <tab-item :selected="currentCategory === item" v-for="item in categories" @click="currentCategory = item"> {{item.category_name}}</tab-item>
    </tab>
    <div class="conents">
      <group :title="service.service_name" v-for="service in currentCategory.services">
        <cell :title="item.name" 
          value="查看列表" 
          is-link 
          v-for="item in service.service_items"
          v-link="{name:'bgxz.show', params:{id: item.id} , query:{ category: currentCategory.category_code} }"
          @click ="prepareForNextPage({department:item})"
          ></cell>
      </group>
    </div>
  </div>
  
</template>

<script>
import {Tab, TabItem} from 'vux-c/tab'
import Group from 'vux-c/group'
import Cell from 'vux-c/cell'
import { updatePageTitle, updateLoading, setFormData } from '../vuex/actions'

export default {
  components: {
    Tab,
    TabItem,
    Group,
    Cell
  },
  data: function () {
    return {
      currentCategory: this.categories[0]
    }
  },
  watch: {
    'categories': function (val, oldVal) {
      if (!this.currentCategory) {
        this.currentCategory = this.categories[0]
      }
    }
  },
  vuex: {
    getters: {
      categories: (state) => state.categories
    },
    actions: {
      updatePageTitle, updateLoading, setFormData
    }
  },
  methods: {
    prepareForNextPage (options) {
      this.setFormData(options)
      this.updateLoading(true)
    }
  },
  created () {
    this.updatePageTitle('表格下载')
  }
}
</script>

<style lang="stylus" scoped>
.vux-header-box
  z-index 100
  position absolute
  width 100%
  left 0
  top 0

.vux-header-title .bszn
  background url(../assets/icons/bgxz.svg) no-repeat left center / 30px
  padding-left 40px


</style>
