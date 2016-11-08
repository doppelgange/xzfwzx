<template>
  <div class="homepage">
    <div class="title">
      <a href="cloudjs://pushPoliticsViewController?params={&quot;title&quot;:&quot;民声&quot;}">
      <!-- <img class="logo" src="../assets/icons/szfwzx.svg"> -->
      <img src="../assets/ms.png" style="width:90%">
      </a>
      <!-- <h1> {{govInfo.homepageTitle}}</h1> -->
    </div>
    <flexbox>
      <flexbox-item>
        <div class="service bszn" v-link="'bszn'"> 
          <img src="../assets/icons/bszn.svg">
          <h2>办事指南</h2>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="service wssb" v-link="'wssb'">
          <img src="../assets/icons/wssb.svg">
          <h2>手机申报</h2>
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item>
        <div class="service blcx"  v-link="'blcx'">
          <img src="../assets/icons/blcx.svg">
          <h2>办理查询</h2>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="service bgxz"  v-link="'bgxz'">
          <img src="../assets/icons/bgxz.svg">
          <h2>表格下载</h2>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import {Flexbox, FlexboxItem} from 'vux-c/flexbox'
import { updatePageTitle } from '../vuex/actions'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
    }
  },
  vuex: {
    getters: {
      govInfo: (state) => state.govInfo
    },
    actions: {
      updatePageTitle
    }
  },
  created () {
    this.updatePageTitle('')
  }
}
</script>

<style lang="stylus" scoped>
.logo
  margin-top 30px
  width 100px
  height 100px

.title,.service
  text-align center
  background-color #2980b9
  color #fff

.service
  padding 10px
  img
    width 50%

.service.bszn
  background-color #1abc9c

.service.wssb /*网上申报*/
  background-color #3498db

.service.blcx /*办理查询*/
  background-color #e67e22
.service.bgxz /*表格下载*/
  background-color:#f1c40f

.vux-flexbox-item
  margin-left:0!important

.homepage
  margin-top -46px

.weui_tab_bd
  padding-top 0!important

</style>