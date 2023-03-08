// import axios from 'axios'
import { defineStore } from 'pinia'

export const useUSIndividualSched = defineStore('us-individual-sched', {
  state: () => ({
    date: null,
    time: null
  }),
  actions: {
    setUSIndividualSched(res) {
        let jsonPARSE = JSON.parse(res)
        
        this.$state.date = jsonPARSE.date
        this.$state.time = jsonPARSE.time
    },
    clearUSIndividualSched() {
        this.$state.date = null,
        this.$state.time = null
    }
  },
  persist: true
})