import { createApp } from 'vue'
import './style.css'
import Antd from 'ant-design-vue';
import router from './router'
import {RouterView} from 'vue-router'
import 'ant-design-vue/dist/reset.css';
import '@/api'

createApp(RouterView).use(router).use(Antd).mount('#app')
