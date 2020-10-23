<template>
  <div class="library p-3">
    <div class="card p-2 h-100">
      <div class="clean-input-group input-group mb-3">
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
      </div>
      <div class="results">
        <p
          class="result"
          v-for="monster in filteredResults"
          :key="monster.index"
        >
          {{ monster.name }}
        </p>
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
      monsters: computed(() => AppState.monsters)
    })
    onMounted(() => {
      dndApiService.getAllMonsters()
    })
    return {
      state,
      filteredResults: computed(() => {
        return state.monsters.filter(m => m.name.toLowerCase().includes(state.filter.toLowerCase()))
      })
    }
  }
}
</script>

<style lang="scss">
.library {
  height: 90vh;
}
.clean-input-group {
 border-radius: 0;
 .form-control {
   border:none;
   border-radius: 0;
   border-bottom: 1px solid grey;
   &:focus {
     box-shadow: none;
      border-color: var(--info);
     ~.input-group-append span{
       border-color: var(--info);
       color: var(--info);
     }
   }
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
}
.result {
  margin: 0;
  padding: .2em;
 &:hover {
   background-color: var(--light);
   cursor: pointer;
 }
}
</style>
