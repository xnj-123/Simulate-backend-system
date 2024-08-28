import { createApp } from 'vue'

import App from './App.vue'

//导入element-plus插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//引入svg矢量图标工具
import 'virtual:svg-icons-register'

//引入全局scss
import '@/styles/index.scss'
//引入暗黑模式的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

//注册全局组件
import gloablComponent from './components/index';
//注册路由组件
import router from './routes';
//引入Pinia仓库
import store from './store/index'

import './permission.ts';

import {hasButton} from '@/directive/hasbutton.ts';

const app = createApp(App);

app.use(gloablComponent);
app.use(router)
app.use(store)
app.use(ElementPlus, {
    locale: zhCn,
})

hasButton(app);

app.mount('#app')