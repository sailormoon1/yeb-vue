import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import {postRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";
import 'font-awesome/css/font-awesome.css';



Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;


//路由导航守卫
router.beforeEach((to,from,next)=>{
    console.log(to);
    console.log(from);
    if(window.sessionStorage.getItem('tokenStr')){
        initMenu(router,store);
        // if(!window.sessionStorage.getItem('user')){
            return getRequest('/admin/info').then(resp=>{
                if(resp){
                    //存入用户信息
                    window.sessionStorage.setItem('user',JSON.stringify(resp));
                    next();
                }
            })
        // }
        next();
    }else{
        if(to.path == '/'){
            next();
        }else {
            next('/redirect'+to.path
            );
        }
    }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
