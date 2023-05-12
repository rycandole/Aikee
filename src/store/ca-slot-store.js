import axios from 'axios'
import { defineStore } from 'pinia'

export const useSlot_CA = defineStore('ca-slot-store', {
  state: () => ({
    slots: []
  }),
  actions: {
    async fetchSlotByDate_CA(date, country, branch) {
        
        let res = await axios.get('check_slots/triplets/'+ date +'/'+ country +'/'+ branch)

        this.$state.slots = res.data.slot
    },
    clearSlot_AU() {
        this.$state.slots = []
    }
  },
  persist: true
})