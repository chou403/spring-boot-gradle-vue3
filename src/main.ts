import {createApp} from 'vue'
import App from './App.vue'
import {setupStore} from "@/store";
import {setupRouter} from "@/router";
import ElementPlus from "element-plus";


// 导入公共样式
import "@/style/index.scss";
import "element-plus/dist/index.css";


const app = createApp(App)

/** 配置 store*/
setupStore(app)

/** 配置 路由*/
setupRouter(app)

app
    .use(ElementPlus)
    .mount('#app')
