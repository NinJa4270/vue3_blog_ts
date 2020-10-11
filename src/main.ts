import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式初始化
import './assets/css/normalize.css'
// 引入全局样式
import './assets/css/main.scss'
// 引入antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(store).use(router).use(Antd).mount('#app')


