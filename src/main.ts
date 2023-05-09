import {createApp} from 'vue'
import App from './App.vue'
import {setupStore} from "@/store";
import {setupRouter} from "@/router";
import {setGlobalComponent} from "@/components/Custom";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"


// import "element-plus/dist/index.css";
import "@/style/element/variarbles.scss";
// 导入公共样式
import "@/style/index.scss";

import "@/router/permission"


const app = createApp(App)

/** 注册element icon图标组件*/
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

/** 配置 store*/
setupStore(app)

/** 配置 路由*/
setupRouter(app)

/** 配置全局组件*/
setGlobalComponent(app);

app
    .use(ElementPlus)
    .mount('#app')
