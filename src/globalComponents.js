import { CollapseTransition } from "@ivanv/vue-collapse-transition"

const globalComponents = {
    install (Vue) {
        Vue.component("collapse-transition", CollapseTransition)
    }
}

export default globalComponents
