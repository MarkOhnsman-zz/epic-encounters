import Axios from 'axios'

export const dndApi = Axios.create({
  baseURL: '//www.dnd5eapi.co/api/monsters',
  timeout: 3000
})
