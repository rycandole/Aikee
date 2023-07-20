// import axios from 'axios'
import { defineStore } from 'pinia'

export const useUSIndividualSched = defineStore('us-individual-sched', {
  state: () => ({
    branch: null,
    country: null,
    date: null,
    time: null,
    timer: null
  }),
  actions: {
    setUSIndividualSched(res) {
        let jsonPARSE = JSON.parse(res)
        
        this.$state.branch = jsonPARSE.branch
        this.$state.country = jsonPARSE.country
        this.$state.date = jsonPARSE.date
        this.$state.time = jsonPARSE.time
        this.$state.timer = jsonPARSE.timer
    },
    clearUSIndividualSched() {
      this.$state.branch = null,
      this.$state.country = null,
      this.$state.date = null,
      this.$state.time = null,
      this.$state.timer = null
    }
  },
  persist: true
})