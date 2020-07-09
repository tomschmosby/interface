<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Layout></Layout>
    <queue></queue>
  <b-button variant="primary">Go forward</b-button>
  <b-button variant="primary">Go backward</b-button>
  <br/>
  <a href="https://iot.hfg-gmuend.de/projects/hfg-portfolio"><h4>See more IoT Projects</h4></a>
  <a href="https://iot.hfg-gmuend.de/projects/hfg-portfolio"><h4>Change Camera</h4></a>
  <!-- <a class="btn btn-primary btn-large" href="#">
      Change Camera
    </a> -->

<!-- 
    <h3 id="h3Brew">Light</h3>
    <input type="checkbox" data-toggle="toggle" data-on="Off" data-off="On" id="toggle"> -->

  
  </div>
</template>

<script>
  
import queue from './submodules/queue/src/App.vue';
import Layout from './submodules/base_layout/src/components/interface.vue';


// var socket = io.connect();
// (function() {
//   ('toggle').bootstrapToggle({
//       on: 'ON',
//       off: 'OFF'
//     });
//   })
//         ("#toggle").change(function(){
//           if(("#toggle").prop("checked") == true){
//            socket.emit('lightOn', 'on\n');
//           }else{
//            socket.emit('lightOff', 'off\n');}
//          });

//         socket.on('lightOn', function() {
//           ('#toggle').bootstrapToggle('on');
//         });
//          socket.on('lightOff', function() {
//           ('#toggle').bootstrapToggle('off');
//         });

export default {
  name: 'App',
  components: {
   Layout,
   queue
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
