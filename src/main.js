import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://hal.hfg.design:33333/ampel', //WICHTIG: Hier nach dem Slash den Namen eures Bots angeben (wie auf dem Pi festgelegt)
  options: {
    useConnectionNamespace: true
  }
}))

new Vue({
  render: h => h(App),
}).$mount('#app')
