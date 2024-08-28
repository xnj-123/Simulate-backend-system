<template>
    <el-button size="small" circle icon="Refresh" @click="refreshPage"></el-button>
    <el-button size="small" circle icon="FullScreen" @click="fullscreen"></el-button>
    <el-popover placement="bottom" title="自定义主题" :width="200" trigger="click"
        content="this is content, this is content, this is content">
        <template #reference>
            <el-button size="small" circle icon="Setting"></el-button>
        </template>
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" show-alpha :teleported="false" :predefine="predefineColors" size="small" @change="colorchange"/>
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch v-model="isDark" class="mt-2" style="margin-left: 24px" inline-prompt active-icon="Moon"
                    inactive-icon="Sunny" @change="changeDark" />
            </el-form-item>
        </el-form>
    </el-popover>
    <img :src="userStore.avatar" style="width:24px;height:24px;border-radius: 50%;margin:0 12px;" circle>
    <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link">
            {{ userStore.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>

</template>

<script setup lang='ts'>
import uselayoutstore from '@/store/modules/layout'
const layoutstore = uselayoutstore();
import useUserStore from '@/store/modules/userstore'
const userStore = useUserStore();
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
let isDark = ref<boolean>(false);

let $router = useRouter();
let $route = useRoute();
function refreshPage() {
    layoutstore.refresh = !layoutstore.refresh;
}
function fullscreen() {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
const loginOut = async () => {
    await userStore.loginout();
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
const changeDark = () => {
    let html = document.documentElement;
    isDark.value ? html.className = 'dark' : html.className = '';
}
const colorchange = ()=>{
    let html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value) 
}

</script>

<style scoped lang='scss'></style>