<template>
  <div>
    <div class="conents">
      <cell :title="item.name" value="详情" is-link v-for="item in items"></cell>
      <!-- <group :title="service.service_name" v-for="service in currentCategory.services">
        <cell :title="item.name" value="详情" is-link v-for="item in service.service_items"></cell>
      </group> -->
    </div>
  </div>
    
</template>

<script>
import Group from 'vux-c/group'
import Cell from 'vux-c/cell'
import { updateLoading, updatePageTitle } from '../vuex/actions'

export default {
  components: {
    Group,
    Cell
  },
  data: function () {
    return {
      items: [],
      summary: {}
    }
  },
  vuex: {
    getters: {
      categories: (state) => state.categories
    },
    actions: {
      updatePageTitle, updateLoading
    }
  },
  methods: {
    retrieveData (id) {
      this.$http.get('/api/wssb/' + id).then((response) => {
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
.vux-header-box
  z-index 100
  position absolute
  width 100%
  left 0
  top 0

//.vux-header-title .bszn
//  background url(../assets/icons/bszn.svg) no-repeat left center / 30px

</style>
