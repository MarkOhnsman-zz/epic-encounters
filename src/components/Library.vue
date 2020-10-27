<template>
  <div>
    <div class="card rounded">
      <div class="clean-input-group input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search"
          v-model="state.filter"
        />
        <div class="input-group-append">
          <span class="input-group-text" id="search"
            ><i class="fas fa-search"></i
          ></span>
        </div>
        <div class="results position-absolute bg-white shadow">
          <div class="position-relative" style="z-index: 999">
            <div
              class="result p-2"
              v-for="monster in state.filteredResults"
              :key="monster.index"
              @click="addMonster(monster.index)"
            >
              {{ monster.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { dndApiService } from '../services/DndApiService'
export default {
  name: 'Library',
  setup() {
    const state = reactive({
      filter: '',
      filteredResults: computed(() => {
        return AppState.monsters.filter(m => m.name.toLowerCase().includes(state.filter.toLowerCase()))
      })
    })
    onMounted(() => {
      dndApiService.getAllMonsters()
    })
    return {
      state,
      async addMonster(index) {
        await dndApiService.getMonster(index)
      }
    }
  }
}
</script>

<style lang="scss">
.clean-input-group {
 border-radius: 0;
 .form-control {
   border:none;
   border-radius: 0;
   border-bottom: 1px solid grey;
   &:focus, &:active {
      box-shadow: none;
      transition-delay: .3s;
      border-color: var(--info);
     ~.input-group-append span{
       border-color: var(--info);
       color: var(--info);
     }
   }
 }
  &:hover .results{
    max-height: 75vh;
    pointer-events: all;
    z-index: 2;
  }
 .input-group-text {
   border:inherit;
   border-radius: inherit;
   background-color:inherit;
   border-bottom: 1px solid grey;
 }
}
.results{
  overflow-y: auto;
  max-height: 0;
  transition: height .15s linear;
  top: 2.5em;
  width: 100%;
}
.result {
  margin: 0;
  padding: .2em;
  position: relative;
 &:hover {
   background-color: var(--light);
   cursor: pointer;
 }
}
</style>
