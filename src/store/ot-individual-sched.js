// import axios from 'axios'
import { defineStore } from 'pinia'

export const useOTIndividualSched = defineStore('ot-individual-sched', {
  state: () => ({
    clinic: null,
    country: null,
    date: null,
    time: null
  }),
  actions: {
    async setOTIndividualSched(res) {
        let jsonPARSE = JSON.parse(res)
        
        this.$state.clinic = jsonPARSE.actionsclinic
        this.$state.country = jsonPARSE.actionscountry
        this.$state.date = jsonPARSE.actionsdate
        this.$state.time = jsonPARSE.actionstime
    },
    clearOTIndividualSched() {
        this.$state.clinic = null,
        this.$state.country = null,
        this.$state.date = null,
        this.$state.time = null
    }
  },
  persist: true
})