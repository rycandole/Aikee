import axios from 'axios'
import { defineStore } from 'pinia'

export const useSlot_NZ = defineStore('nz-slot-store', {
  state: () => ({
    slots: []
  }),
  actions: {
    async fetchSlotByDate_NZ(date, country, branch) {
        
        let res = await axios.get('check_slots/triplets/'+ date +'/'+ country +'/'+ branch)

        this.$state.slots = res.data.slot
    },
    clearSlot_NZ() {
        this.$state.slots = []
    }
  },
  persist: true
})