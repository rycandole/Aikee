import axios from 'axios'
import { defineStore } from 'pinia'

export const useUSHolidates = defineStore('us-holidates', {
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