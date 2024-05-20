import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from '@/pages/home/index.vue'

export default createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', component: HomeView },
        // { path: '/about', component: AboutView },
      ],
  })