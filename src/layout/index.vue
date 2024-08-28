<template>
    <div class="layout_container">
        <div class="aside" :class="{ fold:layoutstore.isexpend?true:false}">
            <Logo></Logo>
            <el-scrollbar class="scroll">
                <el-menu :collapse="layoutstore.isexpend?true:false" background-color="#001529" text-color="white" class="el-menu" :default-active="$route.path">
                    <Menu :menuList="routelists.routes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="topBar" :class="{ fold:layoutstore.isexpend?true:false}">
            <Tabbar></Tabbar>
        </div>
        <div class="mainContent" :class="{ fold:layoutstore.isexpend?true:false}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '@/store/modules/userstore'
import Main from './main/index.vue'
import { useRoute } from 'vue-router'
import Tabbar from './tabbar/index.vue'

let routelists = useUserStore();
const $route = useRoute();
import layoutStore from '@/store/modules/layout';
const layoutstore = layoutStore();


</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .aside {
        background-color: $layout_aside_color;
        width: $layout_aside_width;
        height: 100vh;
        transition: all 0.3s;

        .scroll {
            color: white;
            height: calc(100vh - $base_logo_height);

            .el-menu {
                border-right: none;
            }
        }

        &.fold {
            width:$base_menu_width;
        }
    }

    .topBar {
        position: fixed;
        top: 0;
        left: $layout_aside_width;
        width: calc(100% - $layout_aside_width);
        height: $layout_bar_height;
        transition: all 0.3s;
        box-shadow: 0 0 2px 2px gray;

        &.fold{
            width:calc(100vw - $base_menu_width);
            left:$base_menu_width;
        }
    }

    .mainContent {
        position: absolute;
        left: $layout_aside_width;
        top: $layout_bar_height;
        width: calc(100% - $layout-aside-width);
        height: calc(100vh - $layout-bar-height);
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width:calc(100vw - $base_menu_width);
            left:$base_menu_width;
        }
    }
}
</style>