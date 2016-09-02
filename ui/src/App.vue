<template>
  <div id="app">
  	<loading :show="isLoading" position="absolute" text="">{{{loadingText}}}</loading>
    <!--header slot-->
    <div class="vux-header-box" slot="header">
      <x-header 
        v-show="pageTitle"
        :left-options="leftOptions" 
        :transition="headerTransition" 
        :title="pageTitle" 
        @on-click-title="scrollTop"><span class="bszn"></span></x-header>
    </div>
    <view-box v-ref:view-box>
      <!--default slot-->
      <router-view></router-view>
      <!-- :transition="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" -->
      <!--bottom slot-->
      <bottom-nav v-if="$route.path!='/'"></bottom-nav>
    </view-box>
  </div>
</template>
<script>
import store from './vuex/store'
import { Loading, ViewBox, XHeader } from 'vux-c'
import BottomNav from './components/BottomNav'

export default {
  components: {
    Loading,
    ViewBox,
    XHeader,
    BottomNav
  },
  store: store,
  vuex: {
    getters: {
      isLoading: (state) => state.isLoading,
      direction: (state) => state.direction,
      pageTitle: (state) => state.pageTitle
    }
  },
  methods: {
    scrollTop () {
      this.$refs.viewBox.$els.viewBoxBody.scrollTop = 0
    }
  },
  computed: {
    leftOptions () {
      return {
        showBack: this.pageTitle !== '首页'
      }
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    loadingText: function () {
      var loadingTextPool = {
        0: '让数据多跑腿<br/>群众少跑路',
        1: '云上咸宁<br/>政务办事不跑路，不求人'
      }
      return loadingTextPool[ Math.floor((Math.random() * 2)) ]
    }
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset';

body {
  background-color: #fbf9fe;
}
body, html,#app {
	height:100%;
}

/************************
* Fix tab bar 
************************/
.vux-header-box {
    z-index: 100;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
}
.weui_tab_bd {
    padding-top: 46px;
}


/**
* vue-router transition
*/
.vux-pop-out-transition,
.vux-pop-in-transition {
  width: 100%;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}
.vux-pop-out-enter,
.vux-pop-out-leave,
.vux-pop-in-enter,
.vux-pop-in-leave {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}
.vux-pop-out-enter {
  animation-name: popInLeft;
}
.vux-pop-out-leave {
  animation-name: popOutRight;
}
.vux-pop-in-enter {
  perspective: 1000;
  animation-name: popInRight;
}
.vux-pop-in-leave {
  animation-name: popOutLeft;
}

.weui_toast {
  width:10em!important;
}
@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes popInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes popOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}

</style>

