import Monster from '../../models/Monster'
import { AppState } from '../AppState'
import { dndApi } from './AxiosService'

class DndApiService {
  async getAllMonsters() {
    try {
      const res = await dndApi.get('')
      AppState.monsters = res.data.results
    } catch (error) {
      console.error(error)
    }
  }

  async getMonster(name) {
    try {
      const res = await dndApi.get(name)
      AppState.activeMonster = new Monster(res.data)
    } catch (error) {
      console.error(error)
    }
  }
}

export const dndApiService = new DndApiService()
