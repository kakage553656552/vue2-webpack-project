import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueECharts from 'vue-echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
  size: 'medium' // 设置组件默认尺寸
})
Vue.component('v-chart', VueECharts)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
