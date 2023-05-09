import axios from 'axios'
import { defineStore } from 'pinia'

export const useSlot_AU = defineStore('au-slot-store', {
  state: () => ({
    slots: []
  }),
  actions: {
    async fetchSlotByDate_AU(date, country, branch) {
        
        let res = await axios.get('check_slots/triplets/'+ date +'/'+ country +'/'+ branch)

        this.$state.slots = res.data.slot
    },
    clearSlot_AU() {
        this.$state.slots = []
    }
  },
  persist: true
})