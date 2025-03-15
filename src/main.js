import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueECharts from 'vue-echarts'
import i18n from './i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
  size: 'medium', // 设置组件默认尺寸
  i18n: (key, value) => i18n.t(key, value) // 使用i18n
})
Vue.component('v-chart', VueECharts)
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
