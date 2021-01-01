import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {actions} from "./actions"
import {state,getters,mutations} from "./mutations"
import cate from "./modules/cate"
import specs from "./modules/specs"
import goods from "./modules/goods"
import seck from "./modules/seck"
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{
        cate,
        specs,
        goods,
        seck
    }
})