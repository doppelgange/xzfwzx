<template>
  <div v-if="currentCategory">
    <tab :line-width="2">
      <tab-item :selected="currentCategory === item" v-for="item in categories" @click="currentCategory = item"> {{item.category_name}}</tab-item>
    </tab>
    <div class="conents">
      <group :title="service.service_name" v-for="service in currentCategory.services">
        <cell :title="item.name" value="查看列表" 
          is-link 
          v-for="item in service.service_items"
          v-link="{name:'bszn.show', params:{id: item.id} , query:{ category: currentCategory.category_code} }"
          @click ="prepareForNextPage({department:item})"
          ></cell>
      </group>
    </div>
  </div>
    
</template>

<script>
import { Tab, TabItem } from 'vux-c/tab'
import Group from 'vux-c/group'
import Cell from 'vux-c/cell'
import { updateLoading, updatePageTitle, setFormData } from '../vuex/actions'

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
    categories: function (val, oldVal) {
      if (!this.currentCategory) {
        this.currentCategory = this.categories[0]
      }
      console.log('new: %s, old: %s', val, oldVal)
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
    this.updatePageTitle('办事指南')
  }
}
</script>

<style lang="stylus" scoped>
</style>
