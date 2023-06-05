// import axios from 'axios'
import { defineStore } from 'pinia'

export const useOTIndividualSched = defineStore('ot-individual-sched', {
  state: () => ({
    branch: null,
    country: null,
    date: null,
    time: null
  }),
  actions: {
    setOTIndividualSched(res) {
        let jsonPARSE = JSON.parse(res)
        
        this.$state.branch = jsonPARSE.branch
        this.$state.country = jsonPARSE.country
        this.$state.date = jsonPARSE.date
        this.$state.time = jsonPARSE.time
    },
    clearOTIndividualSched() {
        this.$state.branch = null,
        this.$state.country = null,
        this.$state.date = null,
        this.$state.time = null
    }
  },
  persist: true
})