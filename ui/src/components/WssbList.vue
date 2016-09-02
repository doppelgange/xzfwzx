<template>
  <div>
    <div class="conents">
      <cell :title="item.name" 
        value="申报" 
        is-link 
        v-for="item in items"
        :link="'http://www.xnxzfwzx.gov.cn/' + item.zxsb_url" 
      ></cell>
      <toast :show.sync="noResult" :time="1000" type="text">没有查询到相关下载</toast>
      <box gap="10px 10px">
        <x-button 
          type="primary"
          v-if="summary.current_page < summary.total_page"
          @click = "retrieveData (+ summary.current_page + 1)"
        >当前 {{summary.current_page}} / {{summary.total_page}} 加载下一页 </x-button>
        <divider v-if="(summary.current_page == summary.total_page)&&summary.current_page"> 已到最后一页,共{{summary.total_record}}条</divider>
      </box>
    </div>
  </div>
    
</template>

<script>
import Group from 'vux-c/group'
import Cell from 'vux-c/cell'
import Toast from 'vux-c/toast'
import XButton from 'vux-c/x-button'
import Box from 'vux-c/box'
import Divider from 'vux-c/divider'
import { updateLoading, updatePageTitle } from '../vuex/actions'

export default {
  components: {
    Group,
    Cell,
    Box,
    Toast,
    XButton,
    Divider
  },
  data: function () {
    return {
      items: [],
      summary: {},
      noResult: false
    }
  },
  vuex: {
    getters: {
      formData: (state) => state.formData
    },
    actions: {
      updatePageTitle, updateLoading
    }
  },
  methods: {
    retrieveData (pageNo = 1) {
      this.updateLoading(true)
      this.$http.get('/api' + this.$route.path + '&pageNo=' + pageNo).then((response) => {
        if (((+this.summary.current_page + 1) === (+response.data.summary.current_page)) || !this.summary.current_page) {
          this.items = this.items.concat(response.data.items)
          this.summary = response.data.summary
        }
        this.updateLoading(false)
        if (this.items.length === 0) {
          this.noResult = true
        }
        // success callback
      }, (response) => {
        this.updateLoading(false)
          // error callback
      })
    }
  },
  created () {
    this.updatePageTitle('手机申报' + (this.formData.department ? '-' + this.formData.department.name : ''))
    this.retrieveData()
  }
}
</script>

<style lang="stylus" scoped>
.result
  text-align center
  min-height 20em
  line-height 20em

//.vux-header-title .bszn
//  background url(../assets/icons/bszn.svg) no-repeat left center / 30px

</style>
