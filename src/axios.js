import axios from "axios"

const user = JSON.parse(window.localStorage.getItem('user'))

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
axios.defaults.baseURL = process.env.VUE_APP_API_URL

if (user) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
}
