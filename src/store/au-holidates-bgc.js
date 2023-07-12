import axios from 'axios'
import { defineStore } from 'pinia'

export const use_AU_BGC_Holidates = defineStore('au-holidates-bgc', {
  state: () => ({
    holidays: [],
    full_dates: []
  }),
  actions: {
    async fetchHolidaysByCountryAndBranch(country, branch) {
        let res = await axios.get('get_holidays/' + country + '/' + branch)

        this.$state.holidays = res.data.records
        this.$state.full_dates = res.data.date_full
    },
    clearHolidays() {
      this.$state.holidays = [],
      this.$state.full_dates = []
    }
  },
  persist: true
})