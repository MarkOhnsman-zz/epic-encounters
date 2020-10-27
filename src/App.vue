<template>
  <nav-bar @show-history="state.showHistory = !state.showHistory" />
  <main class="d-flex w-100">
    <div class="container">
      <encounter-manager class="enemy-camp scrollable-y flex-grow-1" />
    </div>

    <narrative
      class="history bg-primary scrollable-y"
      :class="{ show: state.showHistory }"
    />
  </main>
  <foot />
</template>

<script>
import NavBar from './components/Nav'
import EncounterManager from './components/EncounterManager'
import Narrative from './components/Narrative'
import { computed, reactive } from 'vue'
import { AppState } from './AppState'
import { historyService, historyGetters } from './services/HistoryService'
import Foot from './components/Foot'
export default {
  name: 'App',
  setup() {
    const state = reactive({
      showHistory: false
    })

    return {
      state,
      AppState: computed(() => AppState)
    }
  },
  components: {
    NavBar,
    EncounterManager,
    Narrative,
    Foot
  }
}
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

body{
  background: #f5f2f2;
}

::-webkit-scrollbar,
 *::-webkit-scrollbar {
  width: 0;
  background-color: transparent;
}

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
  height: 100vh;
  overflow: hidden;
}

main{
  flex-grow: 1;
}

.action {
  cursor: pointer;
  transition: ease .5s;
    &:hover {
    transform: scale(1.01);
  }
}

// .enemy-camp{
//   transition: all .25s ease;
//   width: 100vw
// }

.scrollable-y{
  overflow-y: auto;
  max-height: calc(100vh - 108px);
}

.history{
  transition: all .25s ease;
  width: 0;
  transform: translateX(30vw);
  &.show{
    width: 25vw;
    transform: translateX(0);
  }
}

</style>
