import axios from 'axios'
import { defineStore } from 'pinia'

export const use_AU_MNL_Holidates = defineStore('au-holidates-mnl', {
  state: () => ({
    list: []
  }),
  actions: {
    async fetchHolidaysByCountryAndBranch(country, branch) {
        let res = await axios.get('get_holidays/' + country + '/' + branch)

        this.$state.list = res.data.records
    },
    clearHolidays() {
        this.$state.list = []
    }
  },
  persist: true
})