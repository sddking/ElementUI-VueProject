<template>
    <div>
        <el-upload 
                    v-bind:action="url.uploadFile"
                    v-bind:headers="headers"
                    list-type="picture"
                    :limit=1
                    ref="videofileUpload"
                    :on-exceed="handlePremierLimit"
                    :on-success="handleVideoSuccess"
                    :on-error="handleVideoFail"
                    :before-upload ="handleBeforeUpload"
                    :on-remove="handleRemove"
                    :on-change="handleChangeFile"
                    :auto-upload="false">
                    <div v-if="videoForm.showVideoPath !=''">
                        <video  v-bind:src="videoForm.showVideoPath" style="width: 100%;"
                                class="avatar video-avatar"
                                controls="controls">
                                您的浏览器不支持视频播放
                        </video>
                    </div>
                <i v-if="videoForm.showVideoPath ==''" class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script>
import {UrlConfig} from '@/assets/js/url.js'
import {Message} from 'element-ui'
export default {
    name:'videoupload',
    data(){
        return {
            //显示上传按钮
            videoForm: {
                showVideoPath: ''
            },
            fileData:[],
            headers:{},
            url:UrlConfig
        }
    }, 
    mounted:function(){
        var token ="Bearer " + this.$cookieStore.getCookie("user_token");
        this.headers= {
            "Authorization":token
        };
    },
    methods:{
            //上传成功回调
            handleVideoSuccess(response, file, fileList) {
                  //console.log(response);
                  this.$emit('handleVideoupload',true,response) ;
            },
            //上传失败
            handleVideoFail(err, file, fileList){
                //console.log(err);
                this.$emit('handleVideoupload',false, err);
            },
            handleBeforeUpload(file){
                var fileSize = file.size / 1024 / 1024 < 50;
                if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
                    Message({
                        message:"请上传正确的视频格式",
                        type:'warning'
                    });
                    return false;
                }else{
                    if (!fileSize) {
                        Message({
                            message:"视频大小不能超过50MB",
                            type:'warning'
                        });
                        return false;
                    }else{
                        return true;
                    }
                }
            },
            handleChangeFile(file, fileList){
                if(file.status == "ready"){
                    var fileSize = file.size / 1024 / 1024 < 50;
                    var type = file.name.split('.')[1];
                    if (['mp4', 'ogg', 'flv', 'avi', 'wmv', 'rmvb', 'mov'].indexOf(type) == -1) {
                        this.$refs.videofileUpload.clearFiles();
                        Message({
                            message:"请上传正确的视频格式",
                            type:'warning'
                        });
                    }else{
                        if (!fileSize) {
                            this.$refs.videofileUpload.clearFiles();
                            Message({
                                message:"视频大小不能超过50MB",
                                type:'warning'
                            });
                        }else{
                            this.fileData.push(file);
                            this.videoForm.showVideoPath = file.url;
                        }
                    }
                }
            },
            handleRemove(file, fileList){
                 for(var i=0;i<this.fileData.length;i++){
                     if(this.fileData[i].name == file.name){
                         this.fileData.splice(i);
                         break;
                     }
                 }
                 this.videoForm.showVideoPath = "";
            },
            handlePremierLimit(){
                Message({
                    message:"只能上传一个视频文件!",
                    type:'warning'
                });
            },
            manualUploadFile(){
                this.$refs.videofileUpload.submit();
            },
            handleClearFiles(){
                this.$refs.videofileUpload.clearFiles();
            }
    }
}
</script>
