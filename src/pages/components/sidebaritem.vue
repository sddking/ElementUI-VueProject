<template>
    <el-submenu v-if="!subroute.hidden && subroute.children && subroute.children.length > 0" :index="'/'+subroute.path">
        <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{subroute.name}}</span>    
        </template>    

        <sidebaritem v-for="(submenu,subidx) in subroute.children"
            :subroute="submenu"
            :fatherpath="genPath(subroute.path,fatherPath)"
            :barIdx="subidx"
            :index = "genPath(subroute.path,fatherPath)"
            :key = "barIdx + '-' + subidx"></sidebaritem>
    </el-submenu>

    <el-menu-item style="font-weight:400"
        v-else-if="!subroute.hidden"
        :index = "fatherPath +'/'+ subroute.path"
        @click="goTo(subroute.path)"
        >
         <i class="el-icon-document"></i>
        {{subroute.name}}
    </el-menu-item>

    <el-menu-item style="font-weight:400"
        v-else
        :index = "fatherPath +'/'+ subroute.path"
        @click="goTo(subroute.path)"
        >
         <i class="el-icon-document"></i>
        {{subroute.name}}
    </el-menu-item>
</template>
<script>
import sidebaritem from './sidebaritem'
export default{
    name:'sidebaritem',
    data(){
        return {
            fatherPath:this.fatherpath
        };
    },
    components:{
        sidebaritem
    },
    props:{
        subroute:Object,
        barIdx:Number,
        fatherpath:String
    },
    methods:{
        handleOpen:function(key,keyPath){
            console.log(key,keyPath);
        },
        handleClose:function(key,keyPath){
            console.log(key,keyPath);
        },
        genPath(childpath,fatherpath){
            var start = childpath.indexOf('/')!=-1?childpath:'/'+childpath;
            var end = fatherpath.indexOf('/')!=-1?fatherpath:'/'+fatherpath;
            return end + start;
        },
        goTo(path){
            var changepath = path.indexOf('/')!=-1?path:('/'+path);
            var fullpath = this.fatherPath + changepath;
            this.$router.push(fullpath);
        }
    },
    mounted:function(){
        //console.log('sidebaritem routes:',this.subroute);
    }
}
</script>
