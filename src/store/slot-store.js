
import { defineStore } from 'pinia'

export const useSlotStore = defineStore('slots', {
  state: () => ({
    country: null,
    prefDate: null,
  }),
  actions: {
    setStoreDetails(res) {
        let jsonPARSE = JSON.parse(res)

        this.$state.country = jsonPARSE.country
        this.$state.prefDate = jsonPARSE.prefDate
    },
    clearSlot() {
      this.$state.country = null
      this.$state.prefDate = null
    }
  },
  persist: true
})