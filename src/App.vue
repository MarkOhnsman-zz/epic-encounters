<template>
  <div class="bg-black p-2 d-flex align-items-center justify-content-between">
    <img
      src="./assets/EE.png"
      height="30"
      alt="epic encounters"
      loading="lazy"
    />
    <library class="mx-2 w-50" />
    <div>
      <button
        class="btn mr-2 rounded"
        @click="undo"
        :disabled="!undoable"
        :class="!undoable ? 'btn-outline-info' : 'btn-info'"
      >
        <i class="fa fa-fw fa-undo"></i>
      </button>
      <button
        class="btn rounded"
        @click="redo"
        :disabled="!redoable"
        :class="!redoable ? 'btn-outline-success' : 'btn-success'"
      >
        <i class="fa fa-fw fa-redo"></i>
      </button>

      <button
        class="btn btn-warning ml-2 rounded"
        @click="state.showHistory = !state.showHistory"
      >
        <i class="fa fa-fw fa-book-open"></i>
      </button>
    </div>
  </div>

  <main class="d-flex w-100">
    <div class="container">
      <encounter-manager class="enemy-camp scrollable-y flex-grow-1" />
    </div>

    <narrative
      class="history bg-primary scrollable-y"
      :class="{ show: state.showHistory }"
    />
  </main>

  <footer class="bg-black text-white text-center p-3">
    <a href="https://github.com/markohnsman/epic-encounters">
      Made with
      <img class="text-image" src="./assets/logo.png" alt="vue logo" /> By Mark
      Ohnsman
    </a>

    <div class="d-none">{{ stateStatus }}</div>
  </footer>
</template>

<script>
import Library from './components/Library'
import EncounterManager from './components/EncounterManager'
import Narrative from './components/Narrative'
import { computed, ref, reactive } from 'vue'
import { AppState } from './AppState'
import { historyService, historyGetters } from './services/HistoryService'

export default {
  name: 'App',
  setup() {
    const state = reactive({
      showHistory: false
    })

    return {
      state,
      undoable: computed(() => historyGetters.undoable),
      redoable: computed(() => {
        return historyService.currentIndex < historyService.appHistory.length - 1
      }),
      stateStatus: computed(() => {
        historyService.addState()
        return AppState
      }),
      undo() {
        historyService.undo()
      },
      redo() {
        historyService.redo()
      }
    }
  },
  components: {
    Library,
    EncounterManager,
    Narrative
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
