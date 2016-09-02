<template>
<!--   <div class="footer">
    主办单位:咸宁市政务服务中心<br>网站备案号:鄂ICP备08000367号-1 <br> 地址：咸宁市双鹤路18号 | 电话：0715-8181606
  </div> -->
	<div>
	  <tabbar>
<!-- 	  	<tabbar-item link="/" :selected="pageTitle=='首页'">
	      <img slot="icon" src="../assets/icons/szfwzx.svg">
	      <span slot="label" >首页</span>
	    </tabbar-item> -->
	    <tabbar-item link="/bszn" :selected="pageTitle=='办事指南'">
	      <img slot="icon" src="../assets/icons/bszn.svg">
	      <span slot="label" >办事指南</span>
	    </tabbar-item>
	    <tabbar-item link="/wssb" :selected="pageTitle=='手机申报'">
	      <img slot="icon" src="../assets/icons/wssb.svg">
	      <span slot="label">手机申报</span>
	    </tabbar-item>
	    <tabbar-item  link="/blcx" :selected="pageTitle=='办理查询'">
	      <img slot="icon" src="../assets/icons/blcx.svg">
	      <span slot="label">办理查询</span>
	    </tabbar-item>
	    <tabbar-item link="/bgxz" :selected="pageTitle=='表格下载'">
	      <img slot="icon" src="../assets/icons/bgxz.svg">
	      <span slot="label">表格下载</span>
	    </tabbar-item>
	  </tabbar>
	</div>
</template>
<script>
import {Tabbar, TabbarItem} from 'vux-c/tabbar'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  vuex: {
    getters: {
      pageTitle: (state) => state.pageTitle
    }
  }
}
</script>
<style lang="stylus">
/* .footer
  color #666
  line-height 40px
  text-align center
  line-height 1.5em
  font-size 0.9em
  padding 10px 
  */

  .weui_tabbar
  	position static
</style>