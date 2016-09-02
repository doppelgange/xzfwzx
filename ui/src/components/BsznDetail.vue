<template>
  <div>
    <div v-for="item in items">
      <divider>{{{item.label}}}</divider>
      <box gap="10px 10px">
        <span v-text="item.contents_text" v-if="item.label_text=='办事流程：'"></span>
        <span v-html="item.contents" v-else></span>
        <img 
          src="../assets/map-lct.jpg" 
          alt="流程图" 
          v-if="item.label_text=='办事流程：'"
          class="flow-chart"
        >

      </box>
    </div>
  </div>
    
</template>

<script>
import Group from 'vux-c/group'
import Cell from 'vux-c/cell'
import Divider from 'vux-c/divider'
import Box from 'vux-c/box'
import { updatePageTitle, updateLoading, setFormData } from '../vuex/actions'

export default {
  components: { Group, Cell, Divider, Box },
  data: function () {
    return {
      items: [],
      summary: {}
    }
  },
  vuex: {
    getters: {
      formData: (state) => state.formData
    },
    actions: {
      updatePageTitle, updateLoading, setFormData
    }
  },
  methods: {
    retrieveData (id) {
      this.$http.get('/api/bszn/detail/' + id).then((response) => {
        this.items = response.data.items
        this.summary = response.data.summary
        this.updateLoading(false)
        console.log(response)
          // success callback
      }, (response) => {
        this.updateLoading(false)
        console.log(response)
          // error callback
      })
    }
  },
  created () {
    this.retrieveData(this.$route.params.id)
  }
}
</script>

<style lang="stylus" scoped>
.flow-chart
  width 100%
</style>
