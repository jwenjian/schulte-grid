import Vue from 'vue'
import App from './App.vue'
import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'

Locale.use('en-US', enUS);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
