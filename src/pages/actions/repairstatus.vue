<template>
<div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '#' }">维修状态</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-divider></el-divider>
    <el-row :gutter="20">
        <el-col :span="5">
            <div class="grid-content">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddItem">新增</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="handleEditItem">编辑</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="handleDelete">删除</el-button>
            </div>
        </el-col>

         <el-col :span="5">
             <div class="grid-content">
                   <el-input placeholder="请输入维修状态" v-model="repair_status_name">
                        <template slot="prepend">维修状态</template>
                    </el-input>
             </div>
         </el-col>

         <el-col :span="5">
               <div class="grid-content">
                    <el-button type="primary" icon="el-icon-search"  @click="handleSearch">查询</el-button>
              </div>
         </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
        <el-table-column type="selection"  width="80"></el-table-column>
        <el-table-column prop="repair_status_name" label="维修状态"></el-table-column>
    </el-table>

<!--分页-->
 <el-row> 
        <el-col :span="24">
            <div class="grid-content" style="float:right">
                  <el-pagination background 
                  @size-change="handleSizeChange"
                  @current-change="hanleCurrentChange"
                  :current-page="CurrentPage"
                  :page-sizes="[20,50,100]"
                  :page-size="CurrentPageSize" 
                  layout="sizes,prev, pager, next,jumper, total" :total="totalRows"> </el-pagination>
            </div>
        </el-col>
 </el-row>

 <el-dialog title="维修状态" :visible.sync="dialogFormVisible"  @close="handleClose">
     <el-form :model="form">
         <el-form-item label="维修状态" :label-width="formLabelWidth">
             <el-input style="width:240px" v-model="form.repair_status_name" auto-complete="off"></el-input>
         </el-form-item>
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
export default {
    name: "repairtype",
    data() {
      return {
        repair_status_name:"",
        CurrentPage:1,
        CurrentPageSize:20,
        dialogFormVisible:false,
        formLabelWidth:'120px',
        multipleSelection:[],
        form:{
            repair_status_name:""
        },
        tableData: [],
        totalRows: 0,
        addForm:false
      }
    },
    mounted:function(){
        this.handleSearch();
    },
    methods: {
       tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
            return '';
        } else if (rowIndex%2  === 0) {
            return 'success-row';
        }
      },
      //复选框选择
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      //关闭Form
      handleCloseAdd(){
        this.dialogFormVisible = false;
      },
      handleClose(){
        this.addForm = false;
        this.form.repair_status_name = "";
      },
      //确定Form
      handleConfirmAdd(){
        if(this.form.repair_status_name!=""){
            if(this.addForm){
                var url = UrlConfig.AddRepairState;
                var method ='post';
                var params =  {
                    repair_status_name:this.form.repair_status_name
                };
                 request(url,method,params).then((res,err)=>{
                    if(res){
                        if(res.data.code===200){
                            Message({
                                message:res.data.message,
                                type:'success'
                            });
                            this.dialogFormVisible = false;
                            this.handleSearch();
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
                var url = UrlConfig.UpdateRepairState;
                var method ='post';
                var params =  {
                    repair_status:this.multipleSelection[0].repair_status,
                    repair_status_name:this.form.repair_status_name
                };
                    request(url,method,params).then((res,err)=>{
                    if(res){
                        if(res.data.code===200){
                            Message({
                                message:res.data.message,
                                type:'success'
                            });
                            this.dialogFormVisible = false;
                            this.handleSearch();
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
            Message({
                message:'请填写维修类型!',
                type:'warning'
            });
        }
      },
      //添加
      handleAddItem(){
        this.addForm = true;
        this.dialogFormVisible = true;
      },
      //编辑
      handleEditItem(){
          this.addForm = false;
          if(this.multipleSelection!=null&&this.multipleSelection!=""
                &&this.multipleSelection.length==1){
                    this.form.repair_status_name = this.multipleSelection[0].repair_status_name;
                    this.dialogFormVisible = true;
          }else{
              Message({
                    message:'请选择一项后再编辑!',
                    type:'warning'
              });
          }
      },
      //删除
      handleDelete(){
          if(this.multipleSelection!=null&&this.multipleSelection!=""
                &&this.multipleSelection.length>0){

                this.$confirm('确认删除？')
                    .then(()=> {
                        var delete_Array = [];
                        for(var i=0;i<this.multipleSelection.length;i++){
                            delete_Array.push(this.deleteItemAsync(this.multipleSelection[i].repair_status));
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
                                this.handleSearch();
                            }else{
                                //全部删除成功
                                Message({
                                    message:"删除成功!",
                                    type:'success'
                                });
                                this.dialogFormVisible = false;
                                this.handleSearch();
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
      //查询
      handleSearch(){
         this.getDataPageNation("",this.repair_status_name,this.CurrentPage,this.CurrentPageSize);
      },
      //删除
      deleteItemAsync(repair_status){
        var url = UrlConfig.DeleteRepairState;
        var method ='post';
        var params =  {
            repair_status:repair_status,
        };
       return new Promise((resolve,reject)=>{ 
                request(url,method,params).then((res,err)=>{
                    if(res){
                        if(res.data.code===200){
                            resolve({
                                repair_status:repair_status,
                                success:true,
                                msg:""
                            });
                        }else{
                            resolve({
                                repair_status:repair_status,
                                success:false,
                                msg:res.data.message
                            });
                        }
                    }
                    if(err){
                        resolve({
                            repair_status:repair_status,
                            success:false,
                            msg:err
                        });
                    }
                });
            });
      },
      //分页获取数据
      getDataPageNation(repair_status, repair_status_name, pageIndex, pageSize){
          const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading'
          });
          var url = UrlConfig.GetRepairStateList;
          var method ='get';
          var params =  {
                  repair_status:repair_status,
                  repair_status_name:repair_status_name,
                  page:pageIndex,
                  page_size:pageSize
          };
          request(url,method,params).then((res,err)=>{
              loading.close();
              if(res){
                  if(res.data.code===200){
                      this.tableData = res.data.data;
                      this.totalRows = res.data.total;
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
      },
      /**
       * 分页事件
       */
      handleSizeChange(val){
        this.CurrentPageSize = val;
        this.getDataPageNation("",this.repair_status_name,this.CurrentPage,this.CurrentPageSize);
      },
      hanleCurrentChange(val){
         this.CurrentPage = val;
         this.getDataPageNation("",this.repair_status_name,this.CurrentPage,this.CurrentPageSize);
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