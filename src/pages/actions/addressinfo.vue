<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '#' }">地址信息</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-divider></el-divider>

    <el-row :gutter="20">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" style="background-color: #eee;"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <el-row :gutter="20">
        <el-col :span="5">
            <div class="grid-content">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddItem">新增</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="handleEditItem">编辑</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="handleDelete">删除</el-button>
            </div>
        </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%"  
               row-key="address_id"  border  lazy :load="load"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange"
              >
        <el-table-column type="selection"  width="80"></el-table-column>
        <el-table-column  prop="address_name" label="地址名称" width="180"> </el-table-column>
        <el-table-column  prop="address_code" label="地址代码" width="180"> </el-table-column>
        <el-table-column  prop="address_level" label="地址等级" width="180"> </el-table-column>
        <el-table-column  prop="bz" label="备注"></el-table-column>
  </el-table>

  <el-dialog title="地址信息" :visible.sync="dialogFormVisible" @closed="handleClose">
     <el-form :model="form">
         <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="地址名称" :label-width="formLabelWidth">
                    <el-input style="width:260px" v-model="form.address_name" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="地址代码" :label-width="formLabelWidth">
                    <el-input style="width:260px" v-model="form.address_code" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
         </el-row>
         <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="地址等级" :label-width="formLabelWidth">
                    <el-input style="width:260px" v-model="form.address_level" auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="上级地址" :label-width="formLabelWidth">
                   
                <el-select v-model="form.parent_address_name" 
                            placeholder="请选择"  style="width: 260px" ref="selectAddress" clearable  @clear="handleClear">
                <el-option :value="form.parent_address_id" 
                           :label="form.parent_address_name" style="width: 420px;height:200px;overflow: auto;background-color:#fff">
                    <el-tree
                            ref="tree"
                            :data = "selectData"
                            :props="propData"
                            :load="loadNode"
                            :expand-on-click-node = "false"
                            lazy
                            @node-click="handleNodeClick"
                    ></el-tree>
                </el-option>
            </el-select>

                </el-form-item>
            </el-col>
         </el-row>
         <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="备注" :label-width="formLabelWidth">
                      <el-input  style="width:726px"  type="textarea" v-model="form.bz"  auto-complete="off"></el-input>
                </el-form-item>
            </el-col>
         </el-row>
     </el-form>
     <div slot="footer" class="dialog-footer">
         <el-button @click="handleCloseAdd">取消</el-button>
         <el-button type="primary" @click="handleConfirmAdd">确定</el-button>
     </div>
 </el-dialog>
   

</div> 
</template>
<script>
import {Message} from 'element-ui'
import {UrlConfig} from '@/assets/js/url.js'
import request from '../provider/httpservice.js'
export default{
     data() {
      return {
        propData:{
          label: 'address_name',
          children: 'children',
          isLeaf: 'isLeaf'
        },
        addForm:false,
        tableData: [],
        selectData:[],
        multipleSelection:[],
        dialogFormVisible:false,
        formLabelWidth:'120px',
        form:{
            address_name:"",
            address_code:"",
            address_level:"",
            parent_address_id:"",
            parent_address_name:"",
            bz:""
        }
      }
    },
    mounted:function(){
        this.initPage();
    },
    methods: {
      initPage(){
        //获取顶级位置
        this.getAddressData(0).then((newdata)=>{
            if(newdata.data.code===200){
                this.tableData = newdata.data.data;
            }else{
                Message({
                    message:newdata,
                    type:'danger'
                });
            }
        });
      },
      //复选框选择
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      getAddressData(id){
         const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading'
          });
          var url = UrlConfig.GetAddressInfoList;
          var method ='get';
          var params =  {
              address_id:id,
          };
          return new Promise((resolve,reject)=>{
                request(url,method,params).then((res,err)=>{
                    loading.close();
                    if(res){
                        resolve(res);
                    }
                    if(err){
                        resolve(err);
                    }
                });
            });
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
            return '';
        } else if (rowIndex%2  === 0) {
            return 'success-row';
        }
      },
      load(tree, treeNode, resolve) {
           this.getAddressData(tree.address_id).then((newdata)=>{
            if(newdata.data.code===200){
               resolve(newdata.data.data);
            }else{
                Message({
                    message:newdata,
                    type:'danger'
                });
            }
        });
      },
      loadNode(node, resolve) {
        if(node.level==0){
            this.getAddressData(0).then((newdata)=>{
                if(newdata.data.code===200){
                    resolve(newdata.data.data);
                }else{
                    Message({
                        message:newdata,
                        type:'danger'
                    });
                }
            });
        }else{
            this.getAddressData(node.data.address_id).then((newdata)=>{
                if(newdata.data.code===200){
                    resolve(newdata.data.data);
                }else{
                    Message({
                        message:newdata,
                        type:'danger'
                    });
                }
            });
        }
      },
      handleClear(){
        this.form.parent_address_id = "";
        this.form.parent_address_name = "";
      },
      handleNodeClick(data){
         this.form.parent_address_id = data.address_id;
         this.form.parent_address_name = data.address_name;
      },
      handleAddItem(){
         this.addForm = true;
         this.getAddressData(0).then((newdata)=>{
            if(newdata.data.code===200){
                this.selectData = newdata.data.data;
                this.dialogFormVisible = true;
            }else{
                Message({
                    message:newdata,
                    type:'danger'
                });
            }
        });
      },
      handleEditItem(){
        this.addForm = false;
        if(this.multipleSelection!=null&&this.multipleSelection!=""
            &&this.multipleSelection.length==1){
                this.form.address_name = this.multipleSelection[0].address_name;
                this.form.address_code = this.multipleSelection[0].address_code;
                this.form.address_level = this.multipleSelection[0].address_level;
                this.form.parent_address_id = this.multipleSelection[0].parent_address_id;
                this.form.parent_address_name = this.multipleSelection[0].parent_address_name==null?"":this.multipleSelection[0].parent_address_name;
                this.form.bz = this.multipleSelection[0].bz;
                this.dialogFormVisible = true;
        }else{
            Message({
                message:'请选择一项后再编辑!',
                type:'warning'
            });
        }
      },
      handleDelete(){
          if(this.multipleSelection!=null&&this.multipleSelection!=""
                &&this.multipleSelection.length>0){
                this.$confirm('确认删除？')
                    .then(()=> {
                        var delete_Array = [];
                        for(var i=0;i<this.multipleSelection.length;i++){
                            delete_Array.push(this.deleteItemAsync(this.multipleSelection[i].address_id));
                        }
                        Promise.all(delete_Array).then((newdata)=>{
                            var failMsg = "";
                            var failIdx = false;
                            for(var i=0; i<newdata.length; i++){
                                if(!newdata[i].success){
                                    failMsg += newdata[i].msg;
                                    failIdx = true;
                                }
                            }
                            if(failIdx){
                                Message({
                                    message:failMsg,
                                    type:'danger'
                                });
                                this.dialogFormVisible = false;
                                this.initPage();
                            }else{
                                //全部删除成功
                                Message({
                                    message:"删除成功!",
                                    type:'success'
                                });
                                this.dialogFormVisible = false;
                                this.initPage();
                            }
                        });
                    })
                    .catch(()=> {});
          }else{
              Message({
                    message:'请选择后再删除!',
                    type:'warning'
              });
          }
      },
       //删除
      deleteItemAsync(address_id){
        var url = UrlConfig.DeleteAddressInfo;
        var method ='post';
        var params =  {
            address_id:address_id,
        };
       return new Promise((resolve,reject)=>{ 
                request(url,method,params).then((res,err)=>{
                    if(res){
                        if(res.data.code===200){
                            resolve({
                                address_id:address_id,
                                success:true,
                                msg:""
                            });
                        }else{
                            resolve({
                                address_id:address_id,
                                success:false,
                                msg:res.data.message
                            });
                        }
                    }
                    if(err){
                        resolve({
                            address_id:address_id,
                            success:false,
                            msg:err
                        });
                    }
                });
            });
      },
      handleCloseAdd(){
        this.dialogFormVisible = false;
      },
      handleClose(){
        this.form.address_name = "";
        this.form.address_code = "";
        this.form.address_level = "";
        this.form.parent_address_id = "";
        this.form.parent_address_name = "";
        this.form.bz = "";
        this.selectData = [];
        this.addForm = false;
      },
      handleConfirmAdd(){
          var parent_address_id="";
          if(this.form.parent_address_id==""){
                    parent_address_id = 0;
          }else{
              parent_address_id = this.form.parent_address_id;
          }
          if(this.form.address_name!=""&&this.form.address_code!=""){
            if(this.addForm){
                var url = UrlConfig.AddAddressInfo;
                var method ='post';
                var params =  {
                    address_name:this.form.address_name,
                    address_code:this.form.address_code,
                    address_level:this.form.address_level,
                    parent_address_id: parent_address_id,
                    bz:this.form.bz
                };
                request(url,method,params).then((res,err)=>{
                    if(res){
                        if(res.data.code===200){
                            Message({
                                message:res.data.message,
                                type:'success'
                            });
                            this.dialogFormVisible = false;
                            this.initPage();
                        }else{
                            Message({
                                message:res.data.message,
                                type:'danger'
                            });
                        }
                    }
                    if(err){
                        Message({
                            message:err,
                            type:'danger'
                        });
                    }
                });
            }else{
                    var url = UrlConfig.UpdateAddressInfo;
                    var method ='post';
                    var params =  {
                        address_id:this.multipleSelection[0].address_id,
                        address_name:this.form.address_name,
                        address_code:this.form.address_code,
                        address_level:this.form.address_level,
                        parent_address_id:parent_address_id,
                        bz:this.form.bz
                    };
                        request(url,method,params).then((res,err)=>{
                        if(res){
                            if(res.data.code===200){
                                Message({
                                    message:res.data.message,
                                    type:'success'
                                });
                                this.dialogFormVisible = false;
                                this.initPage();
                            }else{
                                Message({
                                    message:res.data.message,
                                    type:'danger'
                                });
                            }
                        }
                        if(err){
                            Message({
                                message:err,
                                type:'danger'
                            });
                        }
                    });
                }
          }else{
              if(this.form.address_name==""){
                    Message({
                        message:"地址名称不能为空!",
                        type:'warning'
                    });
              }
              if(this.form.address_code==""){
                    Message({
                        message:"地址代码不能为空!",
                        type:'warning'
                    });
              }
          }
      }
    },
}
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
   .grid-content {
        border-radius: 4px;
        min-height: 36px;
  }
   .el-row {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .el-row-last-child {
      margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>