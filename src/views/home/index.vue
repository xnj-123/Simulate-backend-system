<template>
    <div>
        <el-card>
            <div class="box">
                <img :src="UserStore.avatar" class="avatar">
                <div class="bottom">
                    <h3>{{UserStore.username+','+getTime()}}</h3>
                    <p>欢饮来到后台模拟系统</p>
                </div>
            </div>
        </el-card>
        <div style="display:flex;justify-content:center">
            <SvgIcon name="welcome" width="500px" height="500px"></SvgIcon>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    import useUserStore from '@/store/modules/userstore';
    import {getTime} from '@/utils/time';


    let UserStore = useUserStore();

</script>

<style lang="scss">
    .box {
        display:flex;
        align-items: center;
        
        .avatar {
            width:80px;
            height:80px;
            border-radius: 50%;
        }
        .bottom {
            margin-left:25px;
            h3 {
                font-size: 30px;
                font-weight:700;
                letter-spacing: 1px;
            }
            p{
                margin-top:20px;
                font-size:20px;
                font-style:italic;
                color:rgb(167, 164, 164)
            }
        }
    }
</style>