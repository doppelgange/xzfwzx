<template>
  <div>
    <group :title = "table.title"  title-color="green"
      v-for="table in items">
      <div v-else v-for="item in table.items">
        <cell :title="item.label" 
          value="下载"
          is-link 
          v-if="item.file.file_id"
          :link="item.file.download_url" 
        ></cell>
        <div v-else>
          <divider> {{item.label}}</divider>
          <box gap="10px 10px">
            {{item.contents}}
          </box>
        </div>
      </div>      
    </group>
  </div>
    
</template>

<script>
import Group from 'vux-c/group'
import Cell from 'vux-c/cell'
import Divider from 'vux-c/divider'
import Box from 'vux-c/box'

import { updateLoading, updatePageTitle, setFormData } from '../vuex/actions'

export default {
  components: {
    Group,
    Cell,
    Divider,
    Box
  },
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
      this.$http.get('/api/bgxz/detail/' + id).then((response) => {
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
    this.updatePageTitle('表格下载')
    this.retrieveData(this.$route.params.id)
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

//.vux-header-title .bszn
//  background url(../assets/icons/bszn.svg) no-repeat left center / 30px

</style>
