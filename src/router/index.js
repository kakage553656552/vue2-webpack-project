import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminPage from '../views/Admin.vue'
import DashboardPage from '../views/Dashboard.vue'
import TenantPage from '../views/Tenant.vue'
import WeatherPage from '../views/Weather.vue'
import NewsPage from '../views/News.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  {
    path: '/tenant',
    name: 'Tenant',
    component: TenantPage
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherPage
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router 