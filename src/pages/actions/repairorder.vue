<template>
<div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '#' }">报障单管理</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-divider></el-divider>
    <el-row :gutter="20">
        <el-col :span="24">
            <div class="grid-content">
                <el-button type="primary" icon="el-icon-plus" @click="handleAddItem">新增单据</el-button>
                <el-button type="primary" icon="el-icon-notebook-2" @click="handleDetail">报单明细</el-button>
                <el-button type="primary" icon="el-icon-check" @click="handleComplete">完工</el-button>
            </div>
        </el-col>
    </el-row>

     <el-row :gutter="20">
         <el-col :span="2">
             <div class="inputlabel grid-content">
                 报障单号
             </div>
         </el-col>
        <el-col :span="4">
            <div class="grid-content">
                <el-input v-model="repair_no" placeholder="请输入单号" style="width: 238px;"></el-input>
            </div>
        </el-col>

         <el-col :span="2">
             <div class="inputlabel grid-content">
                 报障标题
             </div>
         </el-col>
         <el-col :span="4">
             <div class="grid-content">
                <el-input v-model="repair_title" placeholder="请输入标题" style="width: 238px;"></el-input>
             </div>
         </el-col>

        <el-col :span="2">
             <div class="inputlabel grid-content">
                 报障地址
             </div>
         </el-col>
         <el-col :span="4">
             <div class="grid-content">
                 <el-input v-model="address_name" placeholder="请输入地址名称" style="width: 238px;"></el-input>
             </div>
         </el-col>
    </el-row>

    <el-row :gutter="20">
         <el-col :span="2">
             <div class="inputlabel grid-content">
                 单据状态
             </div>
         </el-col>
        <el-col :span="4">
            <el-select v-model="repair_status" placeholder="请选择" clearable
                        @clear="handleClearState"
                        @change="handleChangeState">
                <el-option v-for="(item,index) in repairStatusList" 
                           :key="index" 
                           :label="item.repair_status_name" 
                           :value="item.repair_status"></el-option>
            </el-select>
        </el-col>

         <el-col :span="2">
             <div class="inputlabel grid-content">
                 开始时间
             </div>
         </el-col>
         <el-col :span="4">
             <div class="grid-content">
                   <el-date-picker
                            clearable
                            v-model="repair_startdate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
             </div>
         </el-col>

        <el-col :span="2">
             <div class="inputlabel grid-content">
                 结束时间
             </div>
         </el-col>
         <el-col :span="4">
             <div class="grid-content">
                     <el-date-picker
                            v-model="repair_enddate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
             </div>
         </el-col>

         <el-col :span="6">
               <div class="grid-content">
                    <el-button type="primary" icon="el-icon-search"  @click="handleSearch">查询</el-button>
              </div>
         </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
        <el-table-column type="selection"  width="80"></el-table-column>
        <el-table-column prop="repair_no" label="单号"  width="300"></el-table-column>
        <el-table-column prop="repair_title" label="标题"  width="400"></el-table-column>
        <el-table-column prop="address_name" label="故障地点"  width="400"></el-table-column>
        <el-table-column prop="create_time" label="建单时间"  width="240"></el-table-column>
        <el-table-column prop="repair_status" label="状态">
             <template slot-scope="scope">
                <el-tag
                    :type="scope.row.repair_status===1?'':(scope.row.repair_status===2?'danger':'success')"
                    disable-transitions>{{scope.row.repair_status_name}}</el-tag>
                </template>
             </el-table-column>
    </el-table>

     <el-dialog title="报障单据" :visible.sync="dialogAddFormVisible" @closed="handleOrderClose" :append-to-body="true">
        <el-form :model="form">
            <div class="block">
                <el-row  :gutter="20"> 
                    <el-col :span="3">
                         <div class="inputlabel grid-content">
                             标题
                        </div>
                    </el-col>
                    <el-col :span="8">
                         <el-input v-model="form.repair_title" placeholder="请输入标题" style="width: 100%;"></el-input>
                    </el-col>
                    <el-col :span="3">
                         <div class="inputlabel grid-content">
                             故障地址
                        </div>
                    </el-col>
                    <el-col :span="8">
                         <el-select v-model="form.address_id" 
                            placeholder="请选择"  style="width: 100%" ref="selectAddress" clearable  @clear="handleClearSelect">
                            <el-option :value="form.address_id" 
                                    :label="form.address_name" style="width: 420px;height:200px;overflow: auto;background-color:#fff">
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
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="3">
                         <div class="inputlabel grid-content">
                             问题描述
                        </div>
                    </el-col>
                    <el-col :span="19">
                         <el-input type="textarea" v-model="form.accident_word"  style="width: 100%;height: 2rem;" ></el-input>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="inputlabel grid-content">
                            图片
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <imageupload ref="imageupload"  @handleImageupload="imageUploadHandler"></imageupload>
                    </el-col>
                 </el-row>
                 <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="inputlabel grid-content">
                            视频
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <div class="grid-content" style="width:6rem">
                             <videoupload ref="videoupload"  @handleVideoupload="videoUploadHandler"></videoupload>
                        </div>
                    </el-col>
                 </el-row>
            </div>
        </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="handleCloseAddForm_Cancel">取消</el-button>
            <el-button type="primary" @click="handleCloseAddForm_Confirm">提交</el-button>
        </div>
    </el-dialog>

    <el-dialog title="报障明细" :visible.sync="dialogFormVisible" @closed="handleClose">
        <el-form>
            <el-row :gutter="20">
                <el-col :span="2" :offset="22"><el-switch v-model="addDetail"></el-switch></el-col>
            </el-row>
            <el-card v-if="addDetail">
                <el-row :gutter="20">
                     <el-col :span="3">
                         <div class="inputlabel grid-content">
                             操作类型
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content">
                              <el-select v-model="formDetail.repair_type"  placeholder="请选择"  style="width: 280px" ref="selectType" clearable  @clear="handleClearType">
                                <el-option   v-for="(typeitem,index) in repairtypeList" 
                                            :key="index" 
                                            :value="typeitem.repair_type" 
                                            :label="typeitem.repair_type_name" style="width: 400px;">
                                </el-option>
                              </el-select>
                        </div>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="3">
                         <div class="inputlabel grid-content">
                             经办意见
                        </div>
                    </el-col>
                    <el-col :span="19">
                         <el-input type="textarea" v-model="formDetail.accident_word"  style="width: 100%;height: 2rem;" ></el-input>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="inputlabel grid-content">
                            图片
                        </div>
                    </el-col>
                    <el-col :span="19">
                       <imageupload ref="imageupload"  @handleImageupload="imageUploadHandler"></imageupload>
                    </el-col>
                 </el-row>
                 <el-row :gutter="20">
                    <el-col :span="3">
                        <div class="inputlabel grid-content">
                            视频
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <div class="grid-content" style="width:6rem">
                                <videoupload ref="videoupload"  @handleVideoupload="videoUploadHandler"></videoupload>
                        </div>
                    </el-col>
                 </el-row>
                 <el-row :gutter="20">
                    <el-col :span="4" :offset="18">
                        <div class="inputlabel grid-content">
                             <el-button @click="handleCancelDetail">取消</el-button>
                             <el-button type="primary" @click="handleCommitDetail">提交</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <div class="block" style="padding:0.5rem">
                <el-timeline>
                    <el-collapse accordion style="border:none">
                        <el-timeline-item
                            v-for="(item, index) in orderDetailInfo"
                            :key="index"
                            :icon="item.icon"
                            :type="item.type"
                            :size="item.size">
                            <el-collapse-item>
                                <template slot="title">
                                    <el-row style="width:100%;">
                                        <el-col style="color: #409eff;" :span="2"> {{item.repair_type_name}}   </el-col>
                                        <el-col style="color: green;" :span="6">{{item.create_time}} </el-col>
                                        <el-col style="color: red;" :span="6" :offset="10">经办人:{{item.name}}</el-col>
                                    </el-row>
                                </template>
                                 <el-card>
                                        <div>
                                            <span style="color: #409eff;">经办意见</span>
                                        </div>
                                        <div  class="text">
                                            {{item.accendant_word}}
                                        </div>
                                        <el-divider></el-divider>
                                        <div>
                                            <span style="color: #409eff;">视频</span>
                                        </div>
                                        <div v-if="item.videos.length>0"  class="text">
                                           <el-row style="width:100%" v-for="(videodata,index) in item.videos" :key="index">
                                               <videoitem :videoURL="videodata"></videoitem>
                                           </el-row>
                                        </div>
                                        <el-divider></el-divider>
                                        <div>
                                            <span style="color: #409eff;">图片</span>
                                        </div>
                                        <div v-if="item.images.length>0" class="text">
                                            <el-row style="width:100%">
                                              <el-col :span="6" v-for="(imagedata,index) in item.images" :key="index" style="height: 2rem; width:2rem;padding:0.15rem;">
                                                  <imageitem :imageURL="imagedata"></imageitem>
                                              </el-col>
                                           </el-row>
                                        </div>
                                </el-card>
                            </el-collapse-item>
                        </el-timeline-item>
                    </el-collapse>
                </el-timeline>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCloseForm">关闭</el-button>
        </div>
    </el-dialog>

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

    </div>
    </template>
    <script>
    import {Message} from 'element-ui'
    import {UrlConfig} from '@/assets/js/url.js'
    import request from '../provider/httpservice.js'
    import videoitem from '../components/videoitem'
    import imageitem from '../components/imageitem'
    import imageupload from '../components/imageupload'
    import videoupload from '../components/videoupload'
    export default {
        name: "repairorder",
        data() {
            return {
                repair_no:"",
                repair_title:"",
                address_name:"",
                repair_status:"",
                repair_startdate:this.getDateStr(new Date(new Date().getTime() - 24*60*60*1000)),
                repair_enddate:this.getDateStr(new Date()),
                CurrentPage:1,
                CurrentPageSize:20,
                dialogFormVisible:false,
                dialogAddFormVisible:false,
                addDetail:false,
                formLabelWidth:'120px',
                multipleSelection:[], //选中行数据
                repairStatusList:[], //单据状态列表数据
                repairtypeList:[],//操作类型列表数据
                //明细表数据
                formDetail:{
                    repair_type:"",
                    accident_word:"",
                    images:"",
                    videos:"",
                },  
                //单据表数据
                form:{
                     repair_type:"",
                     address_id:"",
                     address_name:"",
                     repair_title:"",
                     accident_word:"",
                     images:"",
                     videos:"",
                },  
                //el-tree的格式
                propData:{
                    label: 'address_name',
                    children: 'children',
                    isLeaf: 'isLeaf'
                },
                selectData:[],//地址列表数据
                tableData: [],//单据列表数据
                totalRows: 0,
                orderDetailInfo: [],//明细列表数据
                //视频数据
                videouploadResult:"",
                //图片数据
                imageuploadResult:[],
                //定时器
                timer:""
            }
        },
        watch:{
            addDetail(newValue,oldValue){
                 if(this.addDetail){
                    var url = UrlConfig.GetRepairTypeList;
                    var method ='get';
                    var params =  {
                        repair_type:0,
                        repair_type_name:"",
                        page:1,
                        page_size:100
                    };
                    return new Promise((resolve,reject)=>{
                        request(url,method,params).then((res,err)=>{
                            if(res){
                                if(res.data.code===200){
                                   this.repairtypeList = res.data.data;
                                }else{
                                   Message({
                                       message:res.data.message,
                                       type:'error'
                                   });
                                }
                            }
                            if(err){
                                Message({
                                    message:err,
                                    type:'error'
                                });
                            }
                        })
                    });
                }else{
                    this.repairtypeList=[];
                    this.formDetail.repair_type = "";
                    this.formDetail.accident_word = "";
                    this.formDetail.images = "";
                    this.formDetail.videos = "";
                    this.$refs.imageupload.handleClearFiles();
                    this.$refs.videoupload.handleClearFiles();
                }
            }
        },
        mounted:function(){
            this.handleSearch();
            this.getRepairStatus();
        },
        methods: {
            //取消选中的类型
            handleClearType(){
                this.formDetail.repair_type = "";
            },
            //取消明细
            handleCancelDetail(){
                this.addDetail = false;
            },
            //保存明细
            handleCommitDetail(){
                if(this.$refs.videoupload.fileData.length>0){
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading'
                    });
                    //上传视频文件
                    this.$refs.videoupload.manualUploadFile();
                    //监测是否上传成功
                    this.watchVideoUpload().then((newdata)=>{
                        var orderInfo = this.multipleSelection[0];
                        if(newdata.success){
                            //继续执行上传图片
                            var videos = newdata.filePath;
                            if(this.$refs.imageupload.fileData.length>0){
                               this.$refs.imageupload.manualUploadFile();
                                 this.watchImageUpload().then((imagedata)=>{
                                    var imageUploadFail = false;
                                    var imageUploadFailStr = "";
                                    var imageUploadPath = "";
                                    for(var i=0;i<imagedata.length;i++){
                                        if(!imagedata[i].success){
                                            imageUploadFail=true;
                                            imageUploadFailStr += imagedata[i].msg;
                                        }
                                        if(i==0){
                                            imageUploadPath += imagedata[i].filePath;
                                        }else{
                                            imageUploadPath += "," + imagedata[i].filePath;
                                        }
                                       
                                    }
                                    if(imageUploadFail){
                                        loading.close();
                                        this.videouploadResult = "",
                                        this.imageuploadResult = [];
                                        Message({
                                            message:imageUploadFailStr,
                                            type:'error'
                                        });
                                    }else{
                                        var images = imageUploadPath;
                                        //保存记录到数据库
                                        this.saveOrderData(this.formDetail.accident_word,orderInfo.address_id,images,orderInfo.repair_id,orderInfo.repair_title,this.formDetail.repair_type,videos).then((savedata)=>{
                                             if(savedata.success){
                                                    this.videouploadResult = "",
                                                    this.imageuploadResult = [];
                                                    this.addDetail = false;

                                                    Message({
                                                        message:"保存成功!",
                                                        type:'success'
                                                    });

                                                    var start_date = "1990-01-01 00:00:00";
                                                    var end_date = this.getDateStr(new Date()).split(" ")[0] + " 23:59:59";
                                                    this.getDetailDataList(orderInfo.repair_id,"",start_date,end_date,1,1000).then((showdata)=>{
                                                        loading.close();
                                                        if(showdata.success){
                                                            this.orderDetailInfo = showdata.data;
                                                        }else{
                                                            Message({
                                                                message:showdata.msg,
                                                                type:'error'
                                                            });
                                                        }
                                                    });
                                             }else{
                                                loading.close();
                                                this.videouploadResult = "",
                                                this.imageuploadResult = [];
                                                Message({
                                                    message:savedata.msg,
                                                    type:'error'
                                                });
                                             }
                                        });
                                    }
                               });
                            }else{
                                 //保存记录到数据库
                                this.saveOrderData(this.formDetail.accident_word,orderInfo.address_id,"",orderInfo.repair_id,orderInfo.repair_title,this.formDetail.repair_type,videos).then((savedata)=>{
                                    if(savedata.success){
                                        this.videouploadResult = "",
                                        this.imageuploadResult = [];
                                        this.addDetail = false;
                                        Message({
                                            message:"保存成功!",
                                            type:'success'
                                        });

                                        var start_date = "1990-01-01 00:00:00";
                                        var end_date = this.getDateStr(new Date());
                                        this.getDetailDataList(orderInfo.repair_id,"",start_date,end_date,1,1000).then((showdata)=>{
                                            loading.close();
                                            if(showdata.success){
                                                this.orderDetailInfo = showdata.data;
                                            }else{
                                                Message({
                                                    message:showdata.msg,
                                                    type:'error'
                                                });
                                            }
                                        });
                                    }else{
                                        loading.close();
                                        this.videouploadResult = "",
                                        this.imageuploadResult = [];
                                        Message({
                                            message:savedata.msg,
                                            type:'error'
                                        });
                                    }
                                });
                            }
                        }
                    });
                }else{
                    this.videouploadResult = "",
                    this.imageuploadResult = [];
                    Message({
                        message:"视频不能为空!",
                        type:'warning'
                    });
                }
            },
            //单据图片上传
            imageUploadHandler(data,result){
                this.imageuploadResult.push({
                    success:data,
                    filePath:result.filePath,
                    msg:result.message
                });
            },
            //单据视频上传
            videoUploadHandler(data,result){
                this.videouploadResult = {
                    success:data,
                    filePath:result.filePath,
                    msg:result.message
                };
            },
            //位置节点选中
            handleNodeClick(data){
                this.form.address_id = data.address_id;
                this.form.address_name = data.address_name;
            },
            //位置取消选择
            handleClearSelect(){
                this.form.address_id = "";
                this.form.address_name = "";
            },
            //逐级别加载树形菜单
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
            //新增单据页面关闭
            handleOrderClose(){
                this.selectData = [];
                this.form.repair_type = "";
                this.form.address_id = "";
                this.form.address_name = "";
                this.form.repair_title = "";
                this.form.accident_word = "";
                this.form.images = "";
                this.form.videos = "";
                //清空上传的文件
                this.$refs.videoupload.handleClearFiles();
                this.$refs.imageupload.handleClearFiles();
            },
            //关闭新增单据框
            handleCloseAddForm_Cancel(){
                this.dialogAddFormVisible = false;
            },
            //提交新增单据数据
            handleCloseAddForm_Confirm(){
                if(this.form.repair_title!=""&&this.form.address_id!=""&&this.$refs.videoupload.fileData.length>0){
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading'
                    });
                    //上传视频文件
                    this.$refs.videoupload.manualUploadFile();
                    //监测是否上传成功
                    this.watchVideoUpload().then((newdata)=>{
                        if(newdata.success){
                            //继续执行上传图片
                            var videos = newdata.filePath;
                            if(this.$refs.imageupload.fileData.length>0){
                               this.$refs.imageupload.manualUploadFile();
                               this.watchImageUpload().then((imagedata)=>{
                                    var imageUploadFail = false;
                                    var imageUploadFailStr = "";
                                    var imageUploadPath = "";
                                    for(var i=0;i<imagedata.length;i++){
                                        if(!imagedata[i].success){
                                            imageUploadFail=true;
                                            imageUploadFailStr += imagedata[i].msg;
                                        }
                                        if(i==0){
                                            imageUploadPath += imagedata[i].filePath;
                                        }else{
                                            imageUploadPath += "," + imagedata[i].filePath;
                                        }
                                       
                                    }
                                    if(imageUploadFail){
                                        loading.close();
                                        this.videouploadResult = "",
                                        this.imageuploadResult = [];
                                        Message({
                                            message:imageUploadFailStr,
                                            type:'error'
                                        });
                                    }else{
                                        var images = imageUploadPath;
                                        //保存记录到数据库
                                        this.saveOrderData(this.form.accident_word,this.form.address_id,images,"",this.form.repair_title,"1",videos).then((savedata)=>{
                                             loading.close();
                                             if(savedata.success){
                                                    Message({
                                                        message:"提交成功!",
                                                        type:'success'
                                                    });
                                                    this.videouploadResult = "",
                                                    this.imageuploadResult = [];
                                                    this.dialogAddFormVisible = false;
                                                    this.searchData();
                                             }else{
                                                this.videouploadResult = "",
                                                this.imageuploadResult = [];
                                                Message({
                                                    message:savedata.msg,
                                                    type:'error'
                                                });
                                             }
                                        });
                                    }
                               });
                            }else{
                                //保存记录到数据库
                                this.saveOrderData(this.form.accident_word,this.form.address_id,"","",this.form.repair_title,"1",videos).then((savedata)=>{
                                    loading.close();
                                    if(savedata.success){
                                        Message({
                                            message:"提交成功!",
                                            type:'success'
                                        });
                                        this.videouploadResult = "",
                                        this.imageuploadResult = [];
                                        this.dialogAddFormVisible = false;
                                        this.searchData();
                                    }else{
                                        this.videouploadResult = "",
                                        this.imageuploadResult = [];
                                        Message({
                                            message:savedata.msg,
                                            type:'error'
                                        });
                                    }
                                });
                            }
                        }else{
                            loading.close();
                            this.videouploadResult = "",
                            this.imageuploadResult = [];
                            Message({
                                message:newdata.msg,
                                type:'error'
                            });
                        }
                    });
                }else{
                    this.videouploadResult = "",
                    this.imageuploadResult = [];
                    if(this.form.repair_title==""){
                         Message({
                            message:"标题不能为空!",
                            type:'warning'
                        });
                    }else if(this.form.address_id==""){
                        Message({
                            message:"故障地点不能为空!",
                            type:'warning'
                        });
                    }else{
                        Message({
                            message:"视频不能为空!",
                            type:'warning'
                        });
                    }
                }
            },
            //提交新增单据明细数据
            saveOrderData(accident_word,address_id,images,repair_id,repair_title,repair_type,videos){
                var url = UrlConfig.SubmitRepairOrderInfo;
                var method ='post';
                var user_id = this.$cookieStore.getCookie("user_id");
                var params =  {
                    accident_word:accident_word,
                    address_id:address_id ,
                    images: images,
                    repair_id: repair_id,
                    repair_title: repair_title,
                    repair_type: repair_type,
                    user_id: user_id,
                    videos: videos
                };
                return new Promise((resolve,reject)=>{ 
                    request(url,method,params).then((res,err)=>{
                        if(res){
                            if(res.data.code===200){
                                resolve({
                                    success:true,
                                    msg:res.data.message
                                });
                            }else{
                                resolve({
                                    success:false,
                                    msg:res.data.message
                                });
                            }
                        }
                        if(err){
                            resolve({
                                success:false,
                                msg:err
                            });
                        }
                    });
                });
            },
            //监控视频是否上传完成
            watchVideoUpload(){
                return new Promise((resolve,reject)=>{
                    var self = this;
                    this.timer = setInterval(() => {
                        if(self.videouploadResult!=""){
                            clearInterval(self.timer);
                            resolve(self.videouploadResult);
                        }
        　　　　　　 }, 1000)
                });
            },
            //监控图片是否上传完成
            watchImageUpload(){
                 return new Promise((resolve,reject)=>{
                    var self = this;
                    this.timer = setInterval(() => {
                        if(self.imageuploadResult.length == self.$refs.imageupload.fileData.length){
                            clearInterval(self.timer);
                            resolve(self.imageuploadResult);
                        }
        　　　　　　 }, 1000)
                });
            },
            //触发改变状态
            handleChangeState(data){
                 this.repair_status = data;
            },
            //清除维修状态
            handleClearState(){
                this.repair_status = "";
            },
            //获取维修状态列表
            getRepairStatus(){
                var url = UrlConfig.GetRepairStateList;
                var method ='get';
                var params =  {
                    repair_status:"0",
                    repair_status_name:"",
                    page:1,
                    page_size:1000
                };
                request(url,method,params).then((res,err)=>{
                    if(res){
                        if(res.data.code===200){
                            this.repairStatusList = res.data.data;
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
            //表格样式
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 === 1) {
                    return '';
                } else if (rowIndex%2  === 0) {
                    return 'success-row';
                }
            },
            //获取时间日期格式
            getDateStr(date){
                var str =  date.getFullYear()>=10? date.getFullYear().toString():'0'+ date.getFullYear().toString();
                    str += "-";
                    str += (date.getMonth() + 1)>=10? (date.getMonth() +1 ).toString():'0'+ (date.getMonth() +1 ).toString();
                    str += "-";
                    str += date.getDate() >=10? date.getDate().toString():'0'+ date.getDate().toString();
                    str += " ";
                    str += date.getHours() >=10? date.getHours().toString():'0'+ date.getHours().toString();
                    str += ":";
                    str += date.getMinutes() >=10? date.getMinutes().toString():'0'+ date.getMinutes().toString();
                    str += ":";
                    str += date.getSeconds() >=10? date.getSeconds().toString():'0'+ date.getSeconds().toString();
                return str;
            },
            //复选框选择
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            //查询
            handleSearch(){
              this.CurrentPage = 1;
              this.CurrentPageSize =20;
              this.searchData();
            },
            //查询数据封装
            searchData(){
                var repair_status = this.repair_status==""?"0":this.repair_status;
                var repair_startdate = this.getDateStr(new Date(this.repair_startdate));
                var repair_enddate = this.getDateStr(new Date(this.repair_enddate)).split(" ")[0]+" 23:59:59";
                if(repair_startdate < repair_enddate){  
                    this.getDataPageNation("",repair_status,this.repair_no,this.repair_title,this.address_name,repair_startdate,repair_enddate,this.CurrentPage,this.CurrentPageSize);
                }else{
                    Message({
                        message:"开始时间必须小于结束时间!",
                        type:'warning'
                    });
                }
            },
            //新增单据按钮
            handleAddItem(){
                this.getAddressData(0).then((newdata)=>{
                    if(newdata.data.code===200){
                        this.selectData = newdata.data.data;
                        this.dialogAddFormVisible = true;
                    }else{
                        Message({
                            message:newdata,
                            type:'danger'
                        });
                    }
                });
            },
            //查看明细按钮
            handleDetail(){
                 if(this.multipleSelection!=null&&this.multipleSelection!=""
                        &&this.multipleSelection.length==1){
                    //获取报障明细
                    var repair_id = this.multipleSelection[0].repair_id;
                    var start_date = "1990-01-01 00:00:00";
                    var end_date = this.getDateStr(new Date());
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading'
                    });
                    this.getDetailDataList(repair_id,"",start_date,end_date,1,1000).then((result)=>{
                        loading.close();
                        if(result.success){
                            this.orderDetailInfo = result.data;
                            this.dialogFormVisible = true;
                        }else{
                            Message({
                                message:result.msg,
                                type:'danger'
                            });
                        }
                    });
                }else{
                    Message({
                            message:'请选择一项后再编辑!',
                            type:'warning'
                    });
                }
            },
            //获取单据明细再封装
            getDetailDataList(repair_id,service_id,start_date,end_date,page,page_size){
               return new Promise((resolve, reject)=>{
                    this.getDetailDataPageNation(repair_id,service_id,start_date,end_date,page,page_size).then((newdata)=>{
                        if(newdata.success){
                            var showData=[];
                            for(var i=0;i<newdata.data.length;i++){
                                var images = newdata.data[i].images==null?[]:(newdata.data[i].images==""?[]:newdata.data[i].images.split(','));
                                var videos =  newdata.data[i].videos==null?[]:(newdata.data[i].videos==""?[]:newdata.data[i].videos.split(','));
                                var icon =  newdata.data[i].repair_type ===1?'el-icon-position':( newdata.data[i].repair_type ===2?'el-icon-setting':'el-icon-success');
                                var type = newdata.data[i].repair_type ===1?'primary':( newdata.data[i].repair_type ===2?'danger':'success');
                                showData.push({
                                    accendant_id: newdata.data[i].accendant_id,
                                    accendant_word: newdata.data[i].accendant_word,
                                    create_time:this.getDateStr(new Date(newdata.data[i].create_time)),
                                    images: images,
                                    name: newdata.data[i].name==null?"":newdata.data[i].name,
                                    phone_id: newdata.data[i].phone_id,
                                    repair_type_name: newdata.data[i].repair_type_name,
                                    repair_type: 1,
                                    icon:icon,
                                    type:type,
                                    size:'large',
                                    service_id: newdata.data[i].service_id,
                                    videos: videos
                                });
                            }
                            resolve({
                                data:showData,
                                success:true,
                                msg:""
                            });
                        
                        }else{
                            resolve({
                                data:[],
                                success:false,
                                msg:""
                            });
                        }
                    });
                });
            },
            //批量完工
            handleComplete(){
                 if(this.multipleSelection!=null&&this.multipleSelection!=""
                        &&this.multipleSelection.length > 0){
                        this.$confirm('确认完工？')
                            .then(()=> {
                                var completeTask =  [];
                                for(var i=0;i<this.multipleSelection.length;i++){
                                    completeTask.push(this.completeOrderItem(this.multipleSelection[i].repair_id));
                                }
                                const loading = this.$loading({
                                        lock: true,
                                        text: 'Loading',
                                        spinner: 'el-icon-loading'
                                });
                                Promise.all(completeTask).then((newdata)=>{
                                    loading.close();
                                    var fail = false;
                                    var failStr = "";
                                    for(var i=0;i<newdata.length;i++){
                                        if(!newdata[i].success){
                                            fail = true;
                                            failStr += "第"+(i+1)+"行"+newdata[i].msg;
                                        }
                                    }
                                    if(fail){
                                        Message({
                                            message:failStr,
                                            type:'error'
                                        });
                                        this.searchData();
                                    }else{
                                        this.searchData();
                                    }
                                });
                        });
                  }else{
                    Message({
                            message:'请选择一个单据后再完工!',
                            type:'warning'
                    });
                }
            },
            //完工
            completeOrderItem(repair_id){
                var user_id = this.$cookieStore.getCookie("user_id");
                var url = UrlConfig.UpdateRepairOrderDetail;
                var method ='post';
                var params =  {
                     user_id:user_id,
                     repair_id:repair_id,
                     repair_status:3,  //3表示已完工
                     repair_type:3     //3表示已完工
                };
                return new Promise((resolve,reject)=>{
                    request(url,method,params).then((res,err)=>{
                        if(res){
                            if(res.data.code===200){
                                resolve({
                                    success:true,
                                    msg:""
                                });
                            }else{
                                resolve({
                                    success:false,
                                    msg:res.data.message
                                });
                            }
                        }
                        if(err){
                            resolve({
                                success:false,
                                msg:err
                            });
                        }
                    })
                });
            },
            //关闭新增单据框触发
            handleClose(){
                this.orderDetailInfo = [];
                if(this.addDetail){
                   this.addDetail = false;
                }
            },
            //关闭新增单据框
            handleCloseForm(){
                this.dialogFormVisible = false;
            },
            //分页获取明细数据
            getDetailDataPageNation(repair_id,service_id,repair_startdate,repair_enddate,page,page_size){
                var url = UrlConfig.GetRepairOrderDetail;
                var method ='get';
                var params =  {
                     repair_id:repair_id,
                     service_id:service_id,
                     repair_startdate:repair_startdate,
                     repair_enddate:repair_enddate,
                     page:page,
                     page_size:page_size
                };
                return new Promise((resolve,reject)=>{
                    request(url,method,params).then((res,err)=>{
                        if(res){
                            if(res.data.code===200){
                                resolve({
                                    success:true,
                                    data:res.data.data,
                                    msg:""
                                });
                            }else{
                                resolve({
                                    success:false,
                                    data:[],
                                    msg:res.data.message
                                });
                            }
                        }
                        if(err){
                            resolve({
                                success:false,
                                data:[],
                                msg:err
                            });
                        }
                    })
                });
            },
            //分页获取单据数据
            getDataPageNation(repair_id,repair_status,repair_no,repair_title,address_name,repair_startdate,repair_enddate,page,page_size){
                var user_id = this.$cookieStore.getCookie("user_id");
                const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading'
                });
                var url = UrlConfig.GetRepairOrderList;
                var method ='get';
                var params =  {
                     repair_id:repair_id,
                     user_id:user_id,
                     repair_status:repair_status,
                     repair_no:repair_no,
                     repair_title:repair_title,
                     address_name:address_name,
                     repair_startdate:repair_startdate,
                     repair_enddate:repair_enddate,
                     page:page,
                     page_size:page_size
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
            //分页获取地址信息
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
             /**
             * 分页事件
             */
            handleSizeChange(val){
                this.CurrentPageSize = val;
                this.searchData();
            },
            hanleCurrentChange(val){
                this.CurrentPage = val;
                this.searchData();
            }
        }
    }
    </script>
    <style>
    .inputlabel{
        height: 0.8rem;
        vertical-align: middle;
        display: table-cell;
        padding: 0 0.4rem;
        width: 0.02rem;
        font-size: 0.28rem;
        white-space: nowrap;
        position: relative;
    }

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