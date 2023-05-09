import axios from 'axios'
import { defineStore } from 'pinia'

export const useSlot_US = defineStore('us-slot-store', {
  state: () => ({
    slots: []
  }),
  actions: {
    async fetchSlotByDate_US(prefDate, country) {
        let res = await axios.get('check_slots/'+ prefDate +'/'+ country)

        this.$state.slots = res.data.slot
    },
    clearSlot_US() {
        this.$state.slots = []
    }
  },
  persist: true
})