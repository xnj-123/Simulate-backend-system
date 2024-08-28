import SvgIcon from './SvgIcon/index.vue';
import Category from './category/index.vue'
import type { App, Component } from 'vue';
import * as  ElementPlusIconsVue from '@element-plus/icons-vue'

const Components: { [name: string]: Component } = { SvgIcon,Category }

export default {
    install(app: App) {
        Object.keys(Components).forEach((key: string) => {
            app.component(key, Components[key])
        })
        //将element-plus提供图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
        
    }
}