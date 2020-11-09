import Vue from 'vue'
import mainpage from '../pages/commen/mainpage/mainpage'
import login from '../pages/commen/login/login'
import role from '../pages/actions/role'
import repairtype from '../pages/actions/repairtype'
import repairstatus from '../pages/actions/repairstatus'
import addressinfo from '../pages/actions/addressinfo'
import repairorder from '../pages/actions/repairorder'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path:  "/",
      redirect: "/mainpage",
      meta: {
        title: '',
        requireAuth: true, 
      }
    },
    {
      path:  "/mainpage",
      name: 'mainpage',
      component: mainpage,
      meta: {
        title: '',
        requireAuth: true, 
      },
      children:[
        { path:'role',name:"角色信息",component:role,children:[],hidden:false,  
          meta: {
            title: '',
            requireAuth: true, 
          }
        },
        { path:'repairtype',name:"操作类型",component:repairtype,children:[],hidden:false,
          meta: {
            title: '',
            requireAuth: true, 
          }
        },
        { path:'repairstatus',name:"维修状态",component:repairstatus,children:[],hidden:false,
          meta: {
            title: '',
            requireAuth: true, 
          }
        },
        { path:'addressinfo',name:"地址信息",component:addressinfo,children:[],hidden:false,
          meta: {
            title: '',
            requireAuth: true, 
          }
        },
        { path:'repairorder',name:"报障管理",component:repairorder,children:[],hidden:false,
          meta: {
            title: '',
            requireAuth: true, 
          }
        }
      ],
        meta: {
          title: '',
          requireAuth: true, 
        }
      },
    {
      path:  "/login",
      name: 'login',
      component: login,
      meta: {
        title: '',
        requireAuth: false, 
      }
    }
  ]
});
