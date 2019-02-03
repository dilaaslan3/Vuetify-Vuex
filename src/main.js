import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    // adding firebase
    firebase.initializeApp({
      apiKey: '',
      authDomain: 'test-project-f38b9.firebaseapp.com',
      databaseURL: 'https://test-project-f38b9.firebaseio.com',
      projectId: 'test-project-f38b9',
      storageBucket: 'test-project-f38b9.appspot.com'
    })
  },
  render: h => h(App)
}).$mount('#app')
