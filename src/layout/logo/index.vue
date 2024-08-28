<template>
    <div class="logo">
        <img :src="setting.logo_img">
        <p  :style="{display:layoutstore.isexpend?'none':'block'}">{{ setting.logo_title }}</p>
    </div>
</template>
    
<script setup lang='ts'>
    import setting from '@/setting'
    import layoutStore from '@/store/modules/layout';
    const layoutstore = layoutStore();
</script>
    
<style scoped lang="scss">
    .logo{
        width:100%;
        height: $base_logo_height;
        color:white;
        display:flex;
        align-items: center;
        padding:20px;
        img {
            width:40px;
            height:40px;
            border-radius: 50%;
        }
        p {
            font-size: 20px;
            margin-left: 10px;
        }
    }
</style>