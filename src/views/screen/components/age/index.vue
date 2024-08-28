<template>
  <div class="age_container">
    <div class="age">
      <div class="title">
        <span class="news">年龄比例</span>
        <p class="elc"></p>
      </div>
      <div class="charts" ref="charts">

      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';


let charts = ref();

onMounted(() => {
  var data = [{
    value: 3661,
    name: '<10w'
  }, {
    value: 5713,
    name: '10w-50w'
  }, {
    value: 9938,
    name: '50w-100w'
  }, {
    value: 17623,
    name: '100w-500w'
  }, {
    value: 3299,
    name: '>500w'
  }];
  let mycharts = echarts.init(charts.value);

  mycharts.setOption({
    title: {
      text: '本日总数',
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color:'white'
      }
    },
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: "{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      top:'40px',
      right: '20px',
      data: ['<10w', '10w-50w', '50w-100w', '100w-500w', '>500w'],
      textStyle:{
        color:'white',
        fontSize:'16px',
      }
    },
    series: [{
      type: 'pie',
      selectedMode: 'single',
      radius: ['45%', '80%'],
      color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],

      label: {
        normal: {
          position: 'inside',
          formatter: '{d}%',

          textStyle: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: data
    }]
  })
})
</script>

<style scoped lang='scss'>
.age_container {
  width: 100%;
  height: 100%;
  padding: 15px 30px;

  .age {
    background: url(../../images/dataScreen-main-rc.png) no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;

    .title {
      .news {
        font-size: 18px;
        color: white;
      }

      .elc {
        margin-top: 5px;
        width: 68px;
        height: 7px;
        background: url(../../images/dataScreen-title.png) no-repeat;
        background-size: cover;
      }
    }
    .charts {
      height:220px;
      margin-top:20px;
    }
  }
}
</style>