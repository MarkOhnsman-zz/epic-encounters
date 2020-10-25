<template>
  <div class="card p-2">
    <div class="title d-flex justify-content-between">
      <h3 class="card-title text-primary">{{ monster.name }}</h3>
      <i
        class="fa fa-times text-danger action"
        aria-hidden="true"
        @click="removeMonster"
      ></i>
    </div>
    <h6 class="card-subtitle text-muted border-primary border-bottom pb-1">
      <em>{{ monster.size }} {{ monster.type }}, {{ monster.alignment }}</em>
    </h6>
    <div class="card-body p-2 border-primary border-bottom pb-1">
      <p class="card-text"><strong>Armor Class:</strong> {{ monster.ac }}</p>
      <p class="card-text">
        <strong> Hit Points:</strong> {{ monster.hpAverage }} ({{
          monster.hpDice
        }})
      </p>
      <p class="card-text"><strong>Speed:</strong> {{ monster.walkSpeed }}</p>
      <p class="card-text" v-if="monster.swimSpeed">
        <strong> Swim:</strong> {{ monster.swimSpeed }}
      </p>
      <p class="card-text" v-if="monster.flySpeed">
        <strong>Fly:</strong> {{ monster.flySpeed }}
      </p>
    </div>
    <div
      class="card-body p-2 d-flex justify-content-between border-primary border-bottom"
    >
      <div class="stat text-center">
        <p><strong>STR</strong></p>
        <p>{{ monster.strength }} ({{ modifier(monster.strength) }})</p>
      </div>
      <div class="stat text-center">
        <p><strong>DEX</strong></p>
        <p>{{ monster.dexterity }} ({{ modifier(monster.dexterity) }})</p>
      </div>
      <div class="stat text-center">
        <p><strong>CON</strong></p>
        <p>{{ monster.constitution }} ({{ modifier(monster.constitution) }})</p>
      </div>
      <div class="stat text-center">
        <p><strong>INT</strong></p>
        <p>{{ monster.intelligence }} ({{ modifier(monster.intelligence) }})</p>
      </div>
      <div class="stat text-center">
        <p><strong>WIS</strong></p>
        <p>{{ monster.wisdom }} ({{ modifier(monster.wisdom) }})</p>
      </div>
      <div class="stat text-center">
        <p><strong>CHA</strong></p>
        <p>{{ monster.charisma }} ({{ modifier(monster.charisma) }})</p>
      </div>
    </div>
    <div class="card-body p-2 border-primary border-bottom">
      <p class="card-text" v-if="monster.saveProficiencies">
        <strong>Throws: </strong>{{ monster.saveProficiencies }}
      </p>
      <p class="card-text" v-if="monster.skillProficiencies">
        <strong>Skills: </strong>{{ monster.skillProficiencies }}
      </p>
      <p class="card-text" v-if="monster.vulnerabilities">
        <strong>Damage Vulnerabilities: </strong>{{ monster.vulnerabilities }}
      </p>
      <p class="card-text" v-if="monster.resistances">
        <strong>Damage Resistances: </strong>{{ monster.resistances }}
      </p>
      <p class="card-text" v-if="monster.immunities">
        <strong>Damage Immunities: </strong>{{ monster.immunities }}
      </p>
      <p class="card-text" v-if="monster.senses">
        <strong>Senses: </strong>{{ monster.senses }}
      </p>
      <p class="card-text" v-if="monster.languages">
        <strong>Languages: </strong>{{ monster.languages }}
      </p>
      <p class="card-text" v-if="monster.xp && monster.cr">
        <strong>Challenge: </strong>{{ monster.cr }} ({{ monster.xp }} xp)
      </p>
    </div>
    <h4 class="text-primary border-primary border-bottom pt-3">Actions</h4>
    <div class="card-body p-2">
      <div class="action" v-for="action in monster.actions" :key="action.id">
        <strong>{{ action.name }}</strong
        >: {{ action.desc }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { monsterService } from '../services/MonsterService'

export default {
  name: 'Monster',
  props: ['monsterData'],
  setup(props) {
    const state = reactive({
    })
    return {
      monster: props.monsterData,
      modifier(stat) {
        const value = Math.floor((stat - 10) / 2)
        return value > -1 ? '+' + value : value
      },
      removeMonster() {
        monsterService.removeMonster(props.monsterData.id)
      }
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
strong {
  color: var(--primary);
}
</style>
