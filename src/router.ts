import { createRouter ,createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Main from './components/MainWindow.vue';
import Child from './components/ChildWindow.vue';
import HelloWorld from './components/HelloWorld.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/child',
    name: 'Child',
    component: Child
  },
]

const router = createRouter({
  history : createWebHashHistory(),
  routes
})

export default router