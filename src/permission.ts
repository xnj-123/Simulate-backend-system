import router from './routes/index'
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import setting from '@/setting'

import pinia from './store';
import useuserstore from './store/modules/userstore'
const userstore = useuserstore(pinia)

nprogress.configure({ showSpinner: false });

router.beforeEach(async (to:any , from:any , next:any)=>{
    nprogress.start();

    const token = userstore.token;
    const username = userstore.username;
    
    if(token){
        if(to.path=='/login'){
            next();
        }
        else{
            if(username){
                next();
            }else{
                try {
                    await userstore.getUserInfo();
                    
                    next({...to});
                } catch (error) {
                    userstore.loginout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    }else{
        if(to.path == '/login'){
            next()
        }else{
            next({path:'/login',query:{redirect:to.path}})
        }
    }
})

router.afterEach((to:any,from:any)=>{
    document.title = `${setting.title}-${to.meta.title} `
    nprogress.done()
})