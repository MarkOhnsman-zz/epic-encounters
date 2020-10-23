<template>
  <nav class="navbar navbar-light bg-black">
    <img
      src="./assets/EE.png"
      height="30"
      alt="epic encounters"
      loading="lazy"
    />
  </nav>
  <main class="container-fluid flex-grow-1">
    <div class="row h-100">
      <library class="col-md-3 bg-primary" />
      <encounter-manager class="col-md-6 bg-secondary" />
      <history class="col-md-3 bg-primary" />
    </div>
  </main>
  <footer class="bg-black text-white text-center p-3">
    <a href="https://github.com/markohnsman/epic-encounters">
      Made with
      <img class="text-image" src="./assets/logo.png" alt="vue logo" /> By Mark
      Ohnsman
    </a>
  </footer>
</template>

<script>
import Library from './components/Library'
import EncounterManager from './components/EncounterManager'
import History from './components/History'

export default {
  name: 'App',
  components: {
    Library,
    EncounterManager,
    History
  }
}
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

.bg-black{
  background-color: black;
}
.text-image {
  height: 1em;
}
a {
  color: inherit;
  text-decoration: none;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
}
#app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
