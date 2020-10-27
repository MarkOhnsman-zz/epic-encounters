<template>
  <div class="bg-black p-2 d-flex align-items-center justify-content-between">
    <img
      src="../assets/EE.png"
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
        @click="$emit('show-history')"
      >
        <i class="fa fa-fw fa-book-open"></i>
      </button>
    </div>
    <div class="d-none">{{ AppState }}</div>
  </div>
</template>

<script>
import Library from './Library'
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { historyService, historyGetters } from '../services/HistoryService'
export default {
  name: 'NavBar',
  emits: ['show-history'],
  setup(props) {
    return {
      undoable: computed(() => historyGetters.undoable),
      redoable: computed(() => historyService.currentIndex < historyService.appHistory.length - 1),
      AppState: computed(() => {
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
    Library
  }
}
</script>

<style>
</style>
