<template>
  <div>
    <divider>温馨提示</divider>
    <box gap="10px 10px">
      <p>欢迎使用咸宁市政务服务中心网上服务系统。请输入正确的回执编号和姓名，进行对应的业务办理进度查询。</p>
      <p>要查询该业务的办理注意事项和指南，可手机扫描相应二维码。想要获取更多的信息，请您根据回执单上的联系方式，电话联系办理的工作人员。</p>
    </box>
    <group>
      <x-input 
        title="业务流水号"
        type="text"
        :show-clear=true 
        placeholder="请输入业务流水号"
        :value.sync="bid"
        ></x-input>
      <!-- 必须输入123456 -->
      <x-input
        title="申报人姓名"
        type="text"
        :show-clear=true 
        :value.sync="bsrxm"
        placeholder="请输入申报人姓名"></x-input>
      <box gap="10px 10px">
        <a :href=" govInfo.host + 'doSearch.jspx?bid=' + bid + '&bsrxm=' + bsrxm" class="link">
        <x-button 
          type="primary"
        >查询</x-button>
        </a>
      </box>
    </group>
  </div>
    
</template>

<script>
import Group from 'vux-c/group'
import XInput from 'vux-c/x-input'
import XButton from 'vux-c/x-button'
import Divider from 'vux-c/divider'
import Box from 'vux-c/box'
import { updatePageTitle } from '../vuex/actions'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Box,
    Divider
  },
  data: function () {
    return {
      currentCategory: this.categories[0],
      categories: this.categories,
      bid: '',
      bsrxm: ''
    }
  },
  vuex: {
    getters: {
      categories: (state) => state.categories,
      govInfo: (state) => state.govInfo
    },
    actions: {
      updatePageTitle
    }
  },
  created () {
    this.updatePageTitle('办理查询')
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
  background url(../assets/icons/blcx.svg) no-repeat left center / 30px
  padding-left 40px
.link
  display: block

</style>
