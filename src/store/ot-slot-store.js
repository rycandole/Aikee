import axios from 'axios'
import { defineStore } from 'pinia'

export const useSlot_OT = defineStore('ot-slot-store', {
  state: () => ({
    slots: []
  }),
  actions: {
    async fetchSlotByDate_OT(date, country, branch) {
        
        let res = await axios.get('check_slots/triplets/'+ date +'/'+ country +'/'+ branch)

        this.$state.slots = res.data.slot
    },
    clearSlot_OT() {
        this.$state.slots = []
    }
  },
  persist: true
})