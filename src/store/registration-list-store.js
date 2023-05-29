import axios from 'axios'
import { defineStore } from 'pinia'

export const registerList = defineStore('register-list-store', {
  state: () => ({
    list: [],
    list1: []
  }),
  actions: {
    async fetchRegisteredList(user_id) {
        
        let res = await axios.get('registration-list/' + user_id)

        this.$state.list = res.data.result
        this.$state.list1 = res.data.result1
    },
    clearRegisteredList() {
        this.$state.list = [],
        this.$state.list1 = []
    }
  },
  persist: true
})