import Vue from 'vue'
import App from './App.vue'
import "./style.css"
import "./style/_icons.css"
import globalComponents from "./globalComponents"

Vue.config.productionTip = false

Vue.use(globalComponents)

new Vue({
  render: h => h(App),
}).$mount('#app')
