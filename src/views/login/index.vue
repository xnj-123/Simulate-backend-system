<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginform" :rules="rules" ref="isforms">
                    <h1>hello</h1>
                    <h2>欢迎来到后台管理系统</h2>
                    <el-form-item prop="username" >
                        <el-input :prefix-icon="User" v-model="loginform.username" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" v-model="loginform.password" placeholder="密码" type="password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" @click="logining">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter,useRoute } from 'vue-router'
import { getTime } from '@/utils/time'

import userStore from '@/store/modules/userstore'

let userstore = userStore();
let loginform = reactive({
    username: 'admin',
    password: '111111',
})
let loading = ref(false);
const $router = useRouter();
const $route = useRoute()
const isforms = ref();

const validatorPassword = (rule:any,value:any,callback:any)=>{
    if(value.length >=4){
        callback();
    }else{
        callback(new Error('账号至少有四位'))
    }
}

const rules = reactive({
    username:[
        {trigger:'blur',validator:validatorPassword}
    ],
    password:[
        {required:true,trigger:'change'}
    ]
})

const logining = async () => {
    await isforms.value.validate();

    loading.value = true

    try {
        await userstore.goLogin(loginform);
        let redirect:any = $route.query.redirect;
        $router.push({path: redirect || '/'})
        ElNotification({
            type: 'success',
            message: '登录成功',
            title: `${getTime()}`
        });
        loading.value = false
    } catch (error) {
        ElNotification({
            type:'error',
            message:'登录失败',
            title:'用户名或者密码错误'
        })
        loading.value = false
    }

}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        top: 30vh;
        width: 80%;
        background: url('@/assets/images/login_form.png') no-repeat;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
