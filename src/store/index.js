import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        routes: []
    },
    //同步修改state值
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        }
    }
    // ,
    // //异步修改state 值
    // actions:{}
})