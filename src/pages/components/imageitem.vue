<template>
 <el-image 
    style="width: 100%; height: 100%"
    :src="getImageURL(imageURL)" 
    :preview-src-list="getSrcImageList(imageURL)">
  </el-image>
</template>
<script>
 import {BaseUrl} from '@/assets/js/url.js' 
  export default {
    name:"imageitem",
    props:{
      imageURL: {
            type:String,
            required:true
        }
    },
    data() {
      return {}
    },
    methods:{
        getImageURL(URL){
            var fullURL= BaseUrl+URL;
            return fullURL;
        },
        getSrcImageList(URL){
            var list=[];
            var fullURL= BaseUrl + URL;
            list.push(fullURL);
            return list;
        }
    }
  }
</script>