<script setup>
    import axios from 'axios'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/store/user-store.js'
    import { useProfileStore } from '@/store/profile-store.js'

    import { useUSIndividualSched } from '@/store/us-individual-sched.js'
    import { useUSIndividualDetails } from '@/store/us-individual-details.js'

    import { useCAIndividualSched } from '@/store/ca-individual-sched.js'
    import { useCAIndividualDetails } from '@/store/ca-individual-details.js'

    import { useAUIndividualSched } from '@/store/au-individual-sched.js'
    import { useAUIndividualDetails } from '@/store/au-individual-details.js'

    import { useNZIndividualSched } from '@/store/nz-individual-sched.js'
    import { useNZIndividualDetails } from '@/store/nz-individual-details.js'

    import { useOTIndividualSched } from '@/store/ot-individual-sched.js'
    import { useOTIndividualDetails } from '@/store/ot-individual-details.js'

    import { registerList } from '@/store/registration-list-store.js'

    import { ucwords } from '@/assets/js/string_functions.js'
    import Swal from '@/sweetalert2'
    // import slecLogo from '@/assets/img/icons/favicon.ico'


    const router = useRouter()
    const userStore = useUserStore()
    const profileStore = useProfileStore()

    const US_IndividualSched = useUSIndividualSched()
    const US_IndividualDetails = useUSIndividualDetails()

    const CA_IndividualSched = useCAIndividualSched()
    const CA_IndividualDetails = useCAIndividualDetails()

    const AU_IndividualSched = useAUIndividualSched()
    const AU_IndividualDetails = useAUIndividualDetails()

    const NZ_IndividualSched = useNZIndividualSched()
    const NZ_IndividualDetails = useNZIndividualDetails()

    const OT_IndividualSched = useOTIndividualSched()
    const OT_IndividualDetails = useOTIndividualDetails()

    const RegisterList = registerList()



    /**
     * For Fetching user data
     */
    onMounted(async () => {
        await profileStore.fetchProfileById(router.params.id)
    })

    let full_name = ucwords(profileStore.firstName +" "+ profileStore.lastName)


    /**
     * For Logout function
     */
    const logout = async () => {

        Swal.fire({
                title: 'Are you sure you want to logout?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                icon: 'question',
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    try {
                        let res = axios.post('logout/', { id: userStore.id })
                        
                        if (res) {
                            // Cleard all the state
                                                    
                            Swal.fire('Logged out', '', 'success')

                            userStore.clearUser()
                            profileStore.clearProfile()

                            US_IndividualSched.clearUSIndividualSched()
                            US_IndividualDetails.clearUSIndividualDetails()

                            CA_IndividualSched.clearCAIndividualSched()
                            CA_IndividualDetails.clearCAIndividualDetails()

                            AU_IndividualSched.clearAUIndividualSched()
                            AU_IndividualDetails.clearAUIndividualDetails()

                            NZ_IndividualSched.clearNZIndividualSched()
                            NZ_IndividualDetails.clearNZIndividualDetails()

                            OT_IndividualSched.clearOTIndividualSched()
                            OT_IndividualDetails.clearOTIndividualDetails()

                            RegisterList.clearRegisteredList()

                            router.push(process.env.BASE_URL +"signin")
                        } else {
                            Swal.fire(res.data.message, '', 'error')
                        }

                    } catch (err) {
                        // console.log(err)
                        Swal.fire("Unsuccessful logout", err, 'error')
                    }
                    
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'error')
                }
            })
    }

    
</script>

<template>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link to="/" class="brand-link pl-5">
            <!-- <img src="img/icons/favicon.ico" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">AdminLTE 3</span> -->
            <!-- :src="slecLogo" -->
            <!-- <img  src="img/icons/favicon.ico" alt="SLEC LOGO" class="brand-image img-circle elevation-2" style="opacity: .8" /> -->
            <span class="brand-text font-weight-light">SLEC</span>
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="img/icons/favicon.ico" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <router-link to="/profile" class="d-block">{{ full_name }}</router-link>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <!-- Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library -->
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">
                            <i class="nav-icon fas fa-home"></i>
                            <p>
                                Home
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/application" class="nav-link">
                            <i class="nav-icon fas fa-tasks"></i>
                            <p>
                                Application
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="" class="nav-link">
                            <i class="nav-icon fas fa-edit"></i>
                            <p>
                                Status
                                <span class="right badge badge-danger">New</span>
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item" @click="logout">
                        <router-link to="" class="nav-link">
                            <i class="nav-icon fas fa-sign-out-alt"></i>
                            <!-- <i class="nav-icon fas fa-table"></i> -->
                            <p>
                                Logout
                            </p>
                        </router-link>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<style lang="scss">

</style>