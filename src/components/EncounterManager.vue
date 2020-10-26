<template>
  <div>
    <monster v-for="m in state.monsters" :key="m.id" :monsterData="m" />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import Monster from './Monster'
export default {
  name: 'EncounterManager',
  setup() {
    const state = reactive({
      /** @type Monster[] */
      monsters: computed(() => AppState.encounterMonsters)
    })

    return {
      state
    }
  },
  components: {
    Monster
  }
}
</script>

<style>
</style>
