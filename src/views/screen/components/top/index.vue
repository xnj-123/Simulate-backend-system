<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">模拟可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="nowTime">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import moment from 'moment';
import { ref, onMounted, onBeforeUnmount } from 'vue'
let $router = useRouter();

let Timer = ref();
let time = ref(moment().format('HH年MM月DD日-hh:mm:ss'));

const goHome = () => {
  $router.push('/home')
}

onMounted(() => {
  Timer.value = setInterval(() => {
    time.value = moment().format('HH年MM月DD日-hh:mm:ss')
  }, 1000);
})
onBeforeUnmount(() => {
  clearInterval(Timer.value);
})

</script>

<style scoped lang='scss'>
.top {
  display: flex;
  width: 100%;
  height: 40px;

  .left {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;

    .lbtn {
      float: right;
      width: 150px;
      height: 40px;
      background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      color:#12C5F0;
      background:url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      font-size:30px;
      letter-spacing: 2px;
      text-align: center;
      line-height: 74px;
    }
  }

  .right {
    flex: 1.5;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      color: #29fcff;
      cursor: pointer;
    }

    .nowTime {
      color: #29fcff;
      font-size: 20px;
    }
  }
}
</style>