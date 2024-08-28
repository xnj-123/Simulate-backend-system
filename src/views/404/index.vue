<template>
        <div class="w404">
                <img src="../../assets/images/error_images/404.png" alt="">
                <a @click="backhome">点我回到首页</a>
        </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
let $router = useRouter();
const backhome = () => {
        $router.push('/');
}
</script>

<style lang="scss" scoped>
.w404 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
                width: 1000px;
                height: 500px;
                position: relative;
                left: 200px;
        }

        a {
                color:rgb(113, 34, 34);
                text-decoration: underline;
                cursor: pointer;
                &:hover{
                        color:aquamarine
                }
        }
}
</style>