<template>
 <div class="player">
   <video-player class="video-player vjs-custom-skin"
                 ref="videoPlayer"
                 :playsinline="true"
                 style="object-fit:fill"
                 :options="getplayerOptions(videoURL)"
                 :x5-video-player-fullscreen="true"
                 @click="fullScreen"
                 @pause="onPlayerPause($event)"
                 @play="onPlayerPlay($event)"
                 @fullscreenchange="onFullscreenChange($event)"
   >
   </video-player>
 </div>
</template>
<script>
  import {videoPlayer} from 'vue-video-player';
  import {BaseUrl} from '@/assets/js/url.js' 
  export default {
    name:'videoitem',
    props:{
      videoURL: {
            type:String,
            required:true
        }
    },
    components: {
      videoPlayer
    },
    data() {
      return {}
    },
    methods: {
      getplayerOptions(url){
        var fullURL = BaseUrl + url;
        var options = {
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                  type: "video/mp4",
                  src: fullURL
                }],
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                  fullscreenToggle: true  //全屏按钮
                }
          };
          return options;
      },
      fullScreen() {
        const player = this.$refs.videoPlayer.player
        player.requestFullscreen()//调用全屏api方法
        player.isFullscreen(true)
        player.play()
      },
      onPlayerPlay(player) {
        player.play()
      },
      onPlayerPause(player) {
        //alert("pause");
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }
  }

</script>
<style>
    .player{
        width: 350px;
    }
</style>