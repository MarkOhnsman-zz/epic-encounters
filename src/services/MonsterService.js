import { Monster, StandardAction } from '../../models/Monster'
import { AppState } from '../AppState'

function diceRoller(type, count = 1) {
  let total = 0
  for (let i = 0; i < count; i++) {
    if (typeof type === 'string') {
      type = parseInt(type)
    }
    total += Math.round(Math.random() * type)
  }
  return total
}

class MonsterService {
  removeMonster(id) {
    const index = AppState.encounterMonsters.findIndex(m => m.id === id)
    if (index === -1) {
      return
    }
    AppState.encounterMonsters.splice(index, 1)
  }

  /**
   * Triggers the monsters action and roll's damage
   * @param {Monster} monster
   * @param {StandardAction} action
   */
  triggerAction(monster, action) {
    const roll = diceRoller(20)
    const toHit = roll + (action.bonus ? action.bonus : 0)
    let total = 0
    const damageString = []
    action.damage.forEach(d => {
      d.dice = d.dice.toLowerCase()
      const breakdown = d.dice.split(/[d+]/gi)
      const damage = diceRoller(parseInt(breakdown[1]), parseInt(breakdown[0]))
      const bonus = parseInt(breakdown[2]) || 0
      total += damage + bonus
      damageString.push(`${damage} ${d.type}${bonus ? ' + ' + bonus : ''}`)
    })
    const story = `The ${monster.name} attacks using its ${action.name}. ${toHit} to hit, and dealing ${total} points of damage (${damageString.join(', ')})`

    AppState.events.push(story)
  }
}

export const monsterService = new MonsterService()
