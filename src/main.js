import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './axios.js'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import '../src/assets/css/style.css'
import 'admin-lte/plugins/fontawesome-free/css/all.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import 'admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import 'admin-lte/plugins/jqvmap/jqvmap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import 'admin-lte/plugins/daterangepicker/daterangepicker.css'
import 'admin-lte/plugins/summernote/summernote-bs4.min.css'

// createApp(App).use(router).mount('#app')

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')


import 'admin-lte/plugins/jquery/jquery.min.js'
import 'admin-lte/plugins/jquery-ui/jquery-ui.min.js'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.js'
import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js'
import 'admin-lte/plugins/chart.js/Chart.min.js'
import 'admin-lte/plugins/sparklines/sparkline.js'
import 'admin-lte/dist/js/adminlte.js'
import 'admin-lte/plugins/daterangepicker/daterangepicker.js'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/popover.js'
// import 'admin-lte/dist/js/pages/dashboard.js'
