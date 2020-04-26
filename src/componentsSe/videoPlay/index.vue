<template>
  <videoPlayer
    ref="videoPlayer"
    class="video-player vjs-custom-skin"
    :playsinline="true"
    :options="playerOptions"
    @error="onPlayerError"
    @play="onPlayerPlay($event)"
    @pause="onPlayerPause($event)"
    @ended="onPlayerEnded($event)"
    @loadeddata="onPlayerLoadeddata($event)"
    @waiting="onPlayerWaiting($event)"
    @playing="onPlayerPlaying($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @ready="playerReadied"
    @statechanged="playerStateChanged($event)">
  </videoPlayer>
</template>

<script>
  import 'videojs-contrib-hls' // hls直播js
  import 'video.js/dist/lang/zh-CN.js'
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'

  export default {
    name: 'videoPlay',
    props: ['link', 'noLive'],
    components: {
      videoPlayer
    },
    data() {
      return {
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: true, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          aspectRatio: '16:9',
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          // width: 600,
          // height: 360,
          sources: [{
            // withCredentials: false,
            type: !this.noLive ? 'application/x-mpegURL' : 'video/mp4',
            src: this.link || 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'
          }],
          // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg", // 海报
          notSupportedMessage: '服务器繁忙,请稍等或者刷新!',
          language: 'zh-CN', // 语言
          controls: true // 控制台
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      onPlayerError() { // 播放错误
        console.log('onPlayerError')
        this.player.src(this.link)
      },
      /* 播放中回调 */
      onPlayerPlay(player) { // 开始播放
      },
      onPlayerPause(player) { // 播放停止
      },
      onPlayerEnded(player) { // 播放结束
      },
      onPlayerLoadeddata(player) { // 播放时请求
      },
      onPlayerWaiting(player) { // 播放等待
      },
      onPlayerPlaying(player) { // 正在播放
      },
      onPlayerTimeupdate(player) { // 时间更新持续触发
      },
      onPlayerCanplay(player) { // 可以播放
        console.log('onPlayerCanplay')
      },
      onPlayerCanplaythrough(player) { // 可以播放之后
        console.log('onPlayerCanplaythrough')
      },
      playerStateChanged(player) { // 播放状态改变
        console.log('playerStateChanged')
      },
      playerReadied(player) { // 准备完成
        console.log('playerReadied')
      }
    },
    watch: {
      link(val) {
        this.playerOptions.sources = [{
          type: !this.noLive ? 'application/x-mpegURL' : 'video/mp4',
          src: val
        }]
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>

</style>
