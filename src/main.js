//mit der main.js werden verknüpfungen zu externen systemen initialisiert
//importieren folgender librarys 
import '@babel/polyfill'    // zur Lesbarkeit von älteren Browsern 
import 'mutationobserver-shim'    // zur Lesbarkeit von älteren Browsern 
import Vue from 'vue'             //einbinden der vue library 
import './plugins/bootstrap-vue' // einbinden der Bootstrap plugins
import App from './App.vue' //Einbinden der Eigenlichen "Website" App.vue Bildet das Frontend des Frontends, wärend die main.js das Backend darstellt
import VueSocketIO from 'vue-socket.io' // Vue SocketIO ist eine Speziell für Vue zugeschnittene Socket architektur 
import Vuex from 'vuex'; // wir verwenden vuex um State Management zu ermöglichen mit Vuex ermöglicht dynamische komponenten die zentralisiert verwaltet werden können

Vue.config.productionTip = false  // Setze diese Variable auf false
 
Vue.use(new VueSocketIO({  // initialisieren eines VueSocketIO client 
  debug: true,             // setzte debug auf true
  connection: 'https://hal.hfg.design:10000/ampel', //WICHTIG: Hier nach dem Slash den Namen eures Bots angeben (wie auf dem Pi festgelegt) // Defineiren der Adresse zu der die Socket verbindung gelegt wird.
  options: {
    useConnectionNamespace: true //setzte useConnectionNamespace auf true
  }
}))

Vue.use(Vuex);    //verwenden Vuex um dynamische 
const store = new Vuex.Store({ // hier werden folgende Veriablen responsif, zentral declariert vuex sorg dafür, dass wenn eine variable in einer componente geändert wird, sie in allen componenten in denen sie verwendet wird geändert wird.
  state: { 
    currentQueue: [],
    ownId: 'none',
    ownName: 'noname',
    clientName: 'undefined',
    currentTimer: 0,
    authorized: false,
  },
  getters: { //Diese Variablen werden ständig neu berechnet 
    amIActive: () => {
      if (store.state.currentQueue.length === 0) return false;
      return store.state.currentQueue[1][0].id === store.state.ownId || store.state.authorized;
    },
  },
});

new Vue({ //erzeugen der Vueaplication
  store,
  render: h => h(App),
}).$mount('#app')
