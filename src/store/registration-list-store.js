import axios from 'axios'
import { defineStore } from 'pinia'

export const registerList = defineStore('register-list-store', {
  state: () => ({
    list: []
  }),
  actions: {
    async fetchRegisteredList(user_id) {
        
        let res = await axios.get('registration-list/' + user_id)

        this.$state.list = res.data.result
    },
    clearRegisteredList() {
        this.$state.list = []
    }
  },
  persist: true
})