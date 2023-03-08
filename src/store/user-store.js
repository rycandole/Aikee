import axios from 'axios'
import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
    state: () => ({
        id: null,
        token: null,
        firstName: null,
        middleName: null,
        lastName: null,
        birthDate: null,
        username: null,
        email: null,
    }),
    actions: {
        setUserDetails(res) {
            // console.log('setUserDetails', res.data)
            this.$state.id = res.data.user.id
            this.$state.token = res.data.token
            this.$state.firstName = res.data.user.first_name
            this.$state.middleName = res.data.user.middle_name
            this.$state.lastName = res.data.user.last_name
            this.$state.birthDate = res.data.user.birth_date
            this.$state.username = res.data.user.username
            this.$state.email = res.data.user.email
        },
        async fetchUser() {
            let res = await axios.get('user/' + this.$state.id)
    
            this.$state.id = res.data.user.id
            this.$state.firstName = res.data.user.first_name
            this.$state.middleName = res.data.user.middle_name
            this.$state.lastName = res.data.user.last_name
            this.$state.birthDate = res.data.user.birth_date
            this.$state.username = res.data.user.username
            this.$state.email = res.data.user.email
        },
        clearUser() {
            this.$state.id = null
            this.$state.token = null
            this.$state.firstName = null
            this.$state.middleName = null
            this.$state.lastName = null
            this.$state.birthDate = null
            this.$state.username = null
            this.$state.email = null
        }
    }, 
    persist: true
})