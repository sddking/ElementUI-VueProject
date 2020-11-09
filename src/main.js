// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {setCookie, getCookie, delCookie} from './assets/js/cookie.js';
import sidebar from './pages/components/sidebar'
import sidebaritem from './pages/components/sidebaritem'
import videoitem from './pages/components/videoitem'
import imageitem from './pages/components/imageitem'
import imageupload from './pages/components/imageupload'
import videoupload from './pages/components/videoupload'
import VideoPlayer from 'vue-video-player'

import 'jquery'
import 'lib-flexible'
import 'echarts'

import x2js from 'x2js' //xml数据处理插件
import App from './App'
import router from './router'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.prototype.$cookieStore = {
    setCookie,
    getCookie,
    delCookie
}
Vue.use(ElementUI);
Vue.use(VideoPlayer);

Vue.prototype.$x2js = new x2js() //创建x2js对象，挂到vue原型上
import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;

router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth){
        var user_token = getCookie("user_token");
        if (user_token!="" && user_token!=null && user_token!=undefined) { // 判断当前的token是否存在
            next();
        } else {
            Message({
                message:"用户信息过期，请重新登录!",
                type:'warning',
                onClose:function(){
                    next({
                        path: '/login'
                    });
                }
            });
            
        }
    }else{
        next();
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.component('sidebar',sidebar);
Vue.component('sidebaritem',sidebaritem);
Vue.component('videoitem',videoitem);
Vue.component('imageitem',imageitem);
Vue.component('imageupload',imageupload);
Vue.component('videoupload',videoupload);
