<template>
    <router-view v-slot="{Component}">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
</template>

<script setup lang="ts">
  import uselayoutstore from '@/store/modules/layout';
  import {ref,watch,nextTick} from 'vue'
  const layoutstore = uselayoutstore();

  const flag = ref(true)

  watch(()=>layoutstore.refresh,()=>{
    flag.value = false;
    nextTick(()=>{
      flag.value = true;
    })
  })

</script>

<style scoped lang='scss'>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all .3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>