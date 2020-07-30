<template>
  <div id="app">
    <RobotControlView>
      <template v-slot:videocomponent>
        <VideoPlayer></VideoPlayer>
      </template>
      <template v-slot:controlcomponent>
        <Controls></Controls>
      </template>
    </RobotControlView>
  </div>
</template>

<script>
import RobotControlView from './components/ControlsComponent.vue'
import Controls from "./components/ControlsComponent";
import VideoPlayer from "./components/VideoPlayerComponent";

export default {
  name: 'App',
  components: {
    RobotControlView,
    VideoPlayer,
    Controls,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
