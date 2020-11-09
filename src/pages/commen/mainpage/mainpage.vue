<template>
   <el-container style="height:17.2rem">
        <!--菜单栏-->
        <el-aside class="app-side app-side-left"
            :class = "isCollapse? 'app-side-collapsed' : 'app-side-expanded'">
            <sidebar 
                :collapse = "isCollapse"
                :routes = "$root.$options.router.options.routes[1]"></sidebar>
        </el-aside>
        <!--头部-->
        <el-container>
            <el-header class="app-header" style="background-color:rgb(64, 158, 255)">
                <div style="width:60px; cursor:pointer;"
                    @click.prevent = "toggleSideBar">
                    <i v-show="!isCollapse" class="el-icon-d-arrow-left"  style="color:white"></i>
                    <i v-show="isCollapse" class="el-icon-d-arrow-right"  style="color:white"></i> 
                </div>

                <div class="app-header-userinfo">
                    <el-dropdown trigger="hover"
                                :hide-on-click = "false">
                        <span class="el-dropdown-link">
                            {{username}}
                            <i class="el-icon-arrow-down el-icon-right" style="color:white"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided 
                                            @click.native="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <!--主体-->
            <el-main class="app-body">
                    <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<style src="./mainpage.css"></style>
<script>
import $ from 'jquery'
import sidebar from '../../components/sidebar'
import {UrlConfig} from '@/assets/js/url.js'
import axios from 'axios'
import { Loading } from 'element-ui';

export default{
        name:'mainpage',
        components:{
            sidebar
        },
        data(){
            return {
                username:"",
                isCollapse: false
            }
        },
        mounted(){
            var self = this;
            this.fatherPath = "/mainpage";
        },
        methods:{
            toggleSideBar(){
                this.isCollapse = !this.isCollapse;
            },
            logOut(){
                //cookie设置为空
                var username = this.$cookieStore.getCookie("username");
                if(username!=""&&username!=null&&username!=undefined){
                    this.$cookieStore.delCookie("username");
                    this.$cookieStore.delCookie("user_id");
                    this.$cookieStore.delCookie("user_token");
                    this.$router.push({path: '/login'});
                }else{
                    this.$router.push({path: '/login'});
                }
             
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        }
}
</script>