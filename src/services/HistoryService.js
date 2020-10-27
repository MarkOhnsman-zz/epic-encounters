import { computed, reactive } from 'vue'

const { AppState } = require('../AppState')

class HistoryService {
  appHistory = []
  traveling = false
  currentIndex = -1

  get undoable() {
    return this.currentIndex > 0
  }

  get redoable() {
    return this.currentIndex < this.appHistory.length - 1
  }

  addState() {
    if (this.traveling) {
      this.currentIndex--
    }
    if (this.currentIndex + 1 < this.appHistory.length && !this.traveling) {
      this.appHistory.splice(this.currentIndex + 1)
    }
    this.currentIndex++
    this.appHistory.splice(this.currentIndex, 1, this.cloneState())
    this.traveling = false
  }

  undo() {
    if (this.undoable) {
      this.traveling = true
      const previousState = this.appHistory[this.currentIndex - 1]
      for (const key in previousState) {
        AppState[key] = previousState[key]
      }
      this.currentIndex--
    }
  }

  redo() {
    if (this.redoable) {
      this.traveling = true
      const nextState = this.appHistory[this.currentIndex + 1]
      if (nextState) {
        for (const key in nextState) {
          AppState[key] = nextState[key]
        }
      }
      this.currentIndex++
    }
  }

  cloneState() {
    return JSON.parse(JSON.stringify(AppState))
  }
}

export const historyService = reactive(new HistoryService())
export const historyGetters = reactive({
  undoable: computed(() => historyService.currentIndex > 0)
})
