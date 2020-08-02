<!--Die App.vue Bildet die Hauptcomponente der Web application. hier werden die einzelnen Componenten eingebunden. -->
<template><!-- Vue Componenten werden in Html gebaut Vue markiert die Html bereiche mit einem Template container. -->
  <div id="app"><!-- hier beginnt das gesamte -->
    <RobotControlView>
      <template v-slot:videocomponent><!-- Über diese Template Container können unterkomponenten eingebunden werden, damit können komplexe strukturen übersichtlich und getrennt voneinander entwickelt werden.-->
        <VideoPlayer></VideoPlayer>
      </template>
      <template v-slot:controlcomponent>
        <Controls></Controls>
      </template>
    </RobotControlView>
  </div>
</template>

<script> //im script Tag kann auf Javascript verwendet werden
import RobotControlView from './components/ControlsComponent.vue' // um die Komponenten zu verwenden müssen sie hier von ihrem jeweiligen platz aus auch eingebunden werden.
import Controls from "./components/ControlsComponent"; //importiert die Komponente Controls von dieser Adresse 
import VideoPlayer from "./components/VideoPlayerComponent"; //importiert die Komponente VideoPlayer von dieser Adresse

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
