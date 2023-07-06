import axios from 'axios'
import { defineStore } from 'pinia'

export const use_AU_MNL_Holidates = defineStore('au-holidates-mnl', {
  state: () => ({
    list: [],
    list1: []
  }),
  actions: {
    async fetchHolidaysByCountryAndBranch(country, branch) {
        let res = await axios.get('get_holidays/' + country + '/' + branch)

       
        this.$state.list = res.data.records
        this.$state.list1 = res.data.record
    },
    clearHolidays() {
        this.$state.list = [],
        this.$state.list1 = []
    }
  },
  persist: true
})