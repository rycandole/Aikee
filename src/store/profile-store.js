import axios from 'axios'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    id: null,
    firstName: null,
    middleName: null,
    lastName: null,
    birthDate: null,
    username: null,
    email: null,
  }),
  actions: {
    async fetchProfileById(id) {
        let res = await axios.get('users/' + id)

        this.$state.id = res.data.user.id
        this.$state.firstName = res.data.user.first_name
        this.$state.middleName = res.data.user.middle_name
        this.$state.lastName = res.data.user.last_name
        this.$state.birthDate = res.data.user.birth_date
        this.$state.username = res.data.user.username
        this.$state.email = res.data.user.email
    },
    clearProfile() {
      this.$state.id = null
      this.$state.firstName = null
      this.$state.middleName = null
      this.$state.lastName = null
      this.$state.birthDate = null
      this.$state.username = null
      this.$state.email = null
    }
  },
  persist: true
})