import { reactive } from 'vue'
import { Monster } from '../models/Monster'

export const AppState = reactive({
  monsters: [],
  /** @type {Monster[]} */
  encounterMonsters: [],
  actions: []
})

// NOTE Getters are used for repeated computeds
export const Getters = {}
