<template>
  <div class="p-3">
    <h1 class="border-bottom text-uppercase text-light">History</h1>
    <div v-for="(action, index) in state.narrative" :key="index">
      <p class="text-light bg-dark rounded shadow p-2">
        {{ action }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'

export const state = reactive({
  narrative: computed(() => AppState.actions)
})

</script>

<style>
</style>
