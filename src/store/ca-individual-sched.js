// import axios from 'axios'
import { defineStore } from 'pinia'

export const useCAIndividualSched = defineStore('ca-individual-sched', {
  state: () => ({
    clinic: null,
    date: null,
    time: null
  }),
  actions: {
    setCAIndividualSched(res) {
        let jsonPARSE = JSON.parse(res)
        
        this.$state.clinic = jsonPARSE.clinic
        this.$state.date = jsonPARSE.date
        this.$state.time = jsonPARSE.time
    },
    clearCAIndividualSched() {
        this.$state.clinic = null,
        this.$state.date = null,
        this.$state.time = null
    }
  },
  persist: true
})