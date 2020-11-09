import axios from 'axios'
import {Notification,Message} from 'element-ui'
import {getCookie} from '../../assets/js/cookie.js';
axios.defaults.timeout = 5000;
export default function request(url,method,params){
    return axios(url,{
                method:method,
                params:params
            })
            .catch(err=>{
                handleError(err);
            });
}

function handleError(error){
    Notification.error({
        title:"请求错误",
        message:error.message
    });
}
//请求拦截
axios.interceptors.request.use(config =>{
    const isToken = (config.headers||{}).isToken ===false;
    let token = getCookie("user_token");
    if(token && !isToken){
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    if(config.method === 'post'){
        config.data = JSON.stringify(config.params);
        config.headers['Content-Type'] = 'application/json';
    }else{
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
},error=>{
    return Promise.reject(error);
});
//请求返回拦截
axios.interceptors.response.use(response => {
    const status = Number(response.status) || 200;
    if (response.data.code === 401) {
        Message({
            message: '未授权，缺少用户的token信息',
            type: 'error'
        });
        this.$router.push({path: '/login'});
    }
    else if (response.data.code == 403) {
        Message({
            message: '用户token过期,请重新登录!',
            type: 'error'
        });
        this.$router.push({path: '/login'});
    }
   else if (response.data.code == 402) {
        Message({
            message: 'token信息认证失败!',
            type: 'error'
        });
        return Promise.resolve(response);
    }
   else if (response.data.code == 406) {
        Message({
            message: '检测到账户在另一台设备登录，自动退出!',
            type: 'error'
        });
        this.$router.push({path: '/login'});
    }else {
        if (status !== 200) {
            return Promise.reject(new Error(response.data.message))
        }else{
            return Promise.resolve(response);
        }
    }
   
},
error => {
    return Promise.reject(error);
}
)