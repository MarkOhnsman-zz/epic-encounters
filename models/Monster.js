class Damage {
  constructor(data) {
    this.type = data.damage_type.name
    this.dice = data.damage_dice
  }
}

class Action {
  constructor(data) {
    this.name = data.name
    this.desc = data.desc
    this.bonus = data.attack_bonus
    /** @type {Damage[]} */
    this.damage = data.damage.map(d => new Damage(d))
  }
}

export default class Monster {
  constructor(data) {
    this.index = data.index
    this.name = data.name
    this.size = data.size
    this.type = data.type
    this.ac = data.armor_class
    this.hpAverage = data.hit_points
    this.hpDice = data.hit_dice
    this.walkSpeed = data.speed.walk || 'N/A'
    this.swimSpeed = data.speed.swim || 'N/A'
    this.flySpeed = data.speed.fly || 'N/A'
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
    this.immunities = data.condition_immunities.map(i => i.name).join(', ')
    this.vulnerabilities = data.damage_vulnerabilities.join(', ')
    this.resistances = data.damage_resistances.join(', ')
    this.immunities = data.damage_immunities.join(', ')
    this.mapProficiencies(data.proficiencies)
    /** @type {Action[]} */
    this.actions = data.actions.map(a => new Action(a))
  }

  mapProficiencies(proficencies) {
    const skills = []
    const saves = []
    proficencies.forEach(p => {
      const stat = p.name.substring(p.name.lastIndexOf(' '))
      if (p.index.contains('saving')) {
        saves.push(`${stat} ${p.value}`)
      } else {
        skills.push(`${stat} ${p.value}`)
      }
    })
    this.saveProficiencies = saves.join(', ')
    this.skillProficiencies = skills.join(', ')
  }
}
