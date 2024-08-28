import { defineStore } from 'pinia'

import { reqLogin, reqUserInfo , reqLogout } from '@/api/user';
import { GET_TOKEN,REMOVE_TOKEN,SET_TOKEN } from '@/utils/token'
import type {userStoreState} from './types/type'
import { loginFormData,loginResponseData,userInfoReponseData } from '@/api/user/type'
import { constantRoute,asyncRoute,anyRoute } from '@/routes/routes';

import router from '@/routes';
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';

const filterAllRouter = (asyncrouter:any,routes:any)=>{
    return asyncrouter.filter((item:any)=>{
        if(routes.includes(item.name)){
            if(item.children && item.children.length > 0){
                //浅拷贝，改变了子路由的
                item.children = filterAllRouter(item.children,routes);
            }
            return true;}
    })
}

const useUserStore = defineStore('User',{
    state:():userStoreState=>{
        return {
            token:GET_TOKEN(),
            username:'',
            avatar:'',
            routes:constantRoute,
            button:[],
        }
    },
    actions:{
        async goLogin(data:loginFormData){
            let result:loginResponseData = await reqLogin(data);
            if(result.code==200){
                this.token = (result.data as string);
                SET_TOKEN((result.data as string));
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        async getUserInfo(){
            let result:userInfoReponseData = await reqUserInfo();
            if(result.code == 200){
                this.username = result.data.name;
                this.avatar = result.data.avatar;
                let ownroutes =  filterAllRouter(cloneDeep(asyncRoute),result.data.routes);
                this.routes = [...constantRoute,...ownroutes,...anyRoute];
                [...ownroutes,...anyRoute].forEach((route:any)=>{
                    router.addRoute(route)
                })
                this.button = result.data.buttons;
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        async loginout(){
            let result = await reqLogout()
            
            if(result.code==200){
                this.username='';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok'
            }else{
                return Promise.reject(new Error(result.data.message))
            }

        }
    },
    getters:{

    }
    
})
export default useUserStore;