<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
            <Map class="map"></Map>
            <Line class="line"></Line>
        </div>
        <div class="right">
          <Location class="location"></Location>
          <Memory class="memory"></Memory>
          <Compute class="compute"></Compute>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Top from './components/top/index.vue';
import Age from './components/age/index.vue';
import Tourist from './components/tourist/index.vue';
import Sex from './components/sex/index.vue';
import Map from './components/map/index.vue';
import Line from './components/line/index.vue';
import Location from './components/location/index.vue';
import Memory from './components/memory/index.vue';
import Compute from './components/compute/index.vue';


import { ref, onMounted } from 'vue'

let screen = ref();

const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}
onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
});

window.onresize = ()=>{
  screen.value.style.transform = `scale(${getScale()}) translate(-50% , -50%)`
}

</script>

<style scoped lang='scss'>
.container {
  width: 100vw;
  height: 100vh;
  background: url('./images/bg.png') no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .left {
        flex:1;
        height:1040px;
        display:flex;
        flex-direction: column;
        .tourist {
          flex:1.3;
        }
        .sex {
          flex:1;
        }
        .age{
          flex:1;
        } 
      }
      .center {
        flex:1.5;
        display:flex;
        flex-direction: column;
        .map {
          flex:3.5;
        }
        .line {
          flex:1;
        }
      }
      .right {
        flex:1;
        display:flex;
        flex-direction: column;
        .location {
          flex:1.5;
        }
        .memory{
          flex:1;
        }
        .compute {
          flex:1;
        }
      }
    }
  }
}
</style>