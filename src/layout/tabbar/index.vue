<template>
    <div class="tabbar_container">
        <div class="tableft">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabright">
            <Options></Options>
        </div>
    </div>
</template>

<script setup lang="ts">
import Options from './options/index.vue'
import Breadcrumb from './breadcrumb/index.vue'





</script>

<style scoped lang='scss'>
.tabbar_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .tableft {
        display: flex;
    }
    .tabright {
        display: flex;
        align-items: center;
    }
}
</style>