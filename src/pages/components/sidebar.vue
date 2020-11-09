<template>
    <div>
        <div class="app-side-logo">
             <img src="@/assets/logo.png"
                width = "60"
                height = "60" />
        </div>

         <el-menu  class= "el-menu-verticle-demo"
                   :collapse = "collapse">
            <sidebaritem v-for="(item,idx) in routes.children"
                :subroute = "item"
                :fatherpath = "fatherpath"
                :index = "fatherpath"
                :barIdx = "idx"
                :key = "idx"></sidebaritem>
        </el-menu>

    </div>
</template>
<script>
    import sidebaritem from './sidebaritem'
    export default{
    name:"sidebar",
    data(){
        return {
            fatherpath:this.routes.path
        }
    },
    components:{
        sidebaritem
    },
    props:{
        collapse:Boolean,
        routes:Object
    },
    mounted:function(){
        //console.log('sidebar routes:',this.routes);
    }
}
</script>
