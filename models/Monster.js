import { generateId } from '../src/utils/IdGenerator'

class Damage {
  constructor(data) {
    this.type = data.damage_type.name
    this.dice = data.damage_dice
  }
}

class Action {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.desc = data.desc
    this.bonus = data.attack_bonus
  }
}
export class StandardAction extends Action {
  constructor(data) {
    super(data)
    /** @type {Damage[]} */
    this.damage = data.damage.map(d => new Damage(d))
  }
}
export class SaveAction extends Action {
  constructor(data) {
    super(data)
    this.dcType = data.dc.dc_type.name
  }
}

export class Monster {
  constructor(data) {
    this.id = generateId()
    this.index = data.index
    this.name = data.name
    this.size = data.size
    this.type = data.type
    this.alignment = data.alignment
    this.ac = data.armor_class
    this.hpAverage = data.hit_points
    this.hpDice = data.hit_dice
    this.walkSpeed = data.speed.walk
    this.swimSpeed = data.speed.swim
    this.flySpeed = data.speed.fly
    this.strength = data.strength
    this.dexterity = data.dexterity
    this.constitution = data.constitution
    this.intelligence = data.intelligence
    this.wisdom = data.wisdom
    this.charisma = data.charisma
    this.xp = data.xp
    this.cr = data.challenge_rating
    this.saveProficiencies = ''
    this.skillProficiencies = ''
    this.senses = this.mapSenses(data.senses)
    this.specialAbilities = data.special_abilities
    this.immunities = data.condition_immunities.map(i => i.name).join(', ')
    this.vulnerabilities = data.damage_vulnerabilities.join(', ')
    this.resistances = data.damage_resistances.join(', ')
    this.immunities = data.damage_immunities.join(', ')
    this.languages = data.languages
    this.mapProficiencies(data.proficiencies)
    /** @type {Action[]} */
    this.actions = this.mapActions(data.actions)
  }

  mapSenses(senses) {
    const output = []
    for (const key in senses) {
      output.push(key.split('_').join(' ') + ' ' + senses[key])
    }
    return output.join(', ')
  }

  mapProficiencies(proficencies) {
    const skills = []
    const saves = []
    proficencies.forEach(p => {
      const stat = p.proficiency.name.substring(p.proficiency.name.lastIndexOf(' '))
      if (p.proficiency.index.includes('saving')) {
        saves.push(`${stat} ${p.value}`)
      } else {
        skills.push(`${stat} ${p.value}`)
      }
    })
    this.saveProficiencies = saves.join(', ')
    this.skillProficiencies = skills.join(', ')
  }

  mapActions(actions) {
    const allActions = []
    actions.forEach(act => {
      if (act.damage) {
        allActions.push(new StandardAction(act))
      } else if (act.options) {
        allActions.push(new Action(act))
      } else if (act.dc) {
        allActions.push(new SaveAction(act))
      }
    })
    return allActions
  }
}
