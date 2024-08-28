<template>
    <template v-for="(menu) in menuList" :key="menu.path">

        <template v-if="!menu.children">
            <el-menu-item :index="menu.path" v-if="!menu.meta.hidden"  @click="goShow">
                <el-icon>
                    <component :is="menu.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ menu.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <template v-if="menu.children && menu.children.length === 1">
            <el-menu-item :index="menu.children[0].path" v-if="!menu.children[0].meta.hidden" @click="goShow">
                <el-icon>
                    <component :is="menu.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ menu.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        
        <el-sub-menu :index="menu.path" v-if="menu.children && menu.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="menu.meta.icon"></component>
                </el-icon>
                <span>{{ menu.meta.title }}</span>
            </template>
            <Menu :menuList="menu.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
defineProps(['menuList']);
let $router = useRouter();

const goShow = (vc:any)=>{
    $router.push(vc.index)
}

</script>
<!-- 自定义递归组件 -->
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped lang='scss'></style>