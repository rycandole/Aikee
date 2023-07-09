import axios from 'axios'
import { defineStore } from 'pinia'

export const use_AU_BGC_Holidates = defineStore('au-holidates-bgc', {
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