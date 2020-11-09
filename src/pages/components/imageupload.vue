<template>
<div>
<el-upload
    v-bind:action="url.uploadFile"
    v-bind:headers="headers"
    list-type="picture-card"
    :limit=3
    :multiple="true"
    ref="imagefileUpload"
    :on-exceed="handlePremierLimit"
    :on-success="handleImageSuccess"
    :on-error="handleImageFail"
    :before-upload ="handleBeforeUpload"
    :on-preview="handlePictureCardPreview"
    :on-change="handleChangeFile"
    :on-remove="handleRemove"
    :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
</div>
</template>
<script>
  import {UrlConfig} from '@/assets/js/url.js'
  import {Message} from 'element-ui'
  export default {
    name:'imageupload',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileData:[],
        headers:{},
        url:UrlConfig
      };
    },
    mounted:function(){
        var token ="Bearer " + this.$cookieStore.getCookie("user_token");
        this.headers= {
            "Authorization":token
        };
    },
    methods: {
      handleRemove(file, fileList) {
        for(var i=0;i<this.fileData.length;i++){
            if(this.fileData[i].name == file.name){
                this.fileData.splice(i);
                break;
            }
        }
        //console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePremierLimit(){
          Message({
              message:"只能上传三张图片文件!",
              type:'warning'
          });
      },
      handleImageSuccess(response, file, fileList){
          this.$emit('handleImageupload',true, response);
      },
      handleImageFail(err, file, fileList){
          this.$emit('handleImageupload',false, err);
      },
      handleBeforeUpload(file){
         var fileSize = file.size / 1024 / 1024 < 10;
          if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.type) == -1) {
              Message({
                  message:"请上传正确的图片格式",
                  type:'warning'
              });
              return false;
          }else{
              if (!fileSize) {
                  Message({
                      message:"图片大小不能超过10MB",
                      type:'warning'
                  });
                  return false;
              }else{
                  return true;
              }
          }
      },
      handleChangeFile(file, fileList){
        if(file.status=="ready"){
            var fileSize = file.size / 1024 / 1024 < 10;
            var type = file.name.split('.')[1];
            if (['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'].indexOf(type) == -1) {
                this.$refs.imagefileUpload.clearFiles();
                Message({
                    message:"请上传正确的图片格式",
                    type:'warning'
                });
            }else{
                if (!fileSize) {
                    this.$refs.imagefileUpload.clearFiles();
                    Message({
                        message:"图片大小不能超过10MB",
                        type:'warning'
                    });
                }else{
                    this.fileData.push(file);
                }
            }        
         }
      },
      manualUploadFile(){
        this.$refs.imagefileUpload.submit();
      },
      handleClearFiles(){
        this.$refs.imagefileUpload.clearFiles();
      }
    }
  }
</script>