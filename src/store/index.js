import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./actions"
import {state,getters,mutations} from "./mutations"
import cate from "./modules/cate"
import specs from "./modules/specs"
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{
        cate,
        specs
    }
})