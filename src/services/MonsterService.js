import { AppState } from '../AppState'
class MonsterService {
  removeMonster(id) {
    const index = AppState.encounterMonsters.findIndex(m => m.id === id)
    if (index === -1) {
      return
    }
    AppState.encounterMonsters.splice(index, 1)
  }
}

export const monsterService = new MonsterService()
