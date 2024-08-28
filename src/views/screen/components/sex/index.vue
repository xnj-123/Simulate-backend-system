<template>
  <div class="sex_container">
    <div class="sex">
      <div class="title">
        <span class="news">男女比例</span>
        <p class="elc"></p>
      </div>
      <div class="setsex">
        <div class="man">
          <p>男士</p>
          <img src="../../images/man.png" alt="">
        </div>
        <div class="woman">
          <p>女士</p>
          <img src="../../images/woman.png" alt="">
        </div>
      </div>
      <div class="charts" ref="charts">

      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'

let charts = ref()

let manValue = ref(42);

onMounted(()=>{
  let mycharts = echarts.init(charts.value);
  
  mycharts.setOption({
    //组件标题
    title: {
      text: `男士${manValue.value}%                        女生${100-manValue.value}%`,//主标题
      textStyle: {//主标题颜色
        color: 'skyblue'
      },
    },
    //x|y
    xAxis: {
      show: false,
      min: 0,
      max: 100
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [manValue.value],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      }
      ,
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  })
})

</script>

<style scoped lang='scss'>
.sex_container {
  width: 100%;
  height: 100%;
  padding: 15px 30px;

  .sex {
    background: url(../../images/dataScreen-main-rb.png) no-repeat;
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

  }

  .setsex {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;

    .man {
      margin-left: 80px;
      background: url(../../images/man-bg.png);
      width: 111px;
      height: 116px;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      p {
        color:white;
        font-size: 18px;
        margin-bottom: 20px;
       }
    }

    .woman {
      margin-right: 80px;
      background: url(../../images/woman-bg.png);
      width: 111px;
      height: 116px;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        color:white;
        font-size: 18px;
        margin-bottom: 15px;
       }
    }
  }
  .charts{
    height:80px;
    padding:0 100px;
  }
}
</style>