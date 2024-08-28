<template>
    <el-icon style="margin-right:10px;">
        <component :is="layoutstore.isexpend ? 'Expand' : 'Fold'" @click="ch_expand"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon style="margin-right: 5px">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang='ts'>

import layoutStore from '@/store/modules/layout';
import {useRoute} from 'vue-router'
const layoutstore = layoutStore();

function ch_expand(){
    layoutstore.isexpend = !layoutstore.isexpend;
}
const $route = useRoute();


</script>

<style scoped lang='scss'></style>