<script setup>
    import axios from 'axios'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/store/user-store.js'
    import { useProfileStore } from '@/store/profile-store.js'
    import { useUSIndividualSched } from '@/store/us-individual-sched.js'
    import { useUSIndividualDetails } from '@/store/us-individual-details.js'
    import { ucwords } from '@/assets/js/string_functions.js'
    import Swal from '@/sweetalert2'
    // import slecLogo from '@/assets/img/icons/favicon.ico'


    const router = useRouter()
    const userStore = useUserStore()
    const profileStore = useProfileStore()
    const US_IndividualSched = useUSIndividualSched()
    const US_IndividualDetails = useUSIndividualDetails()



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
                        let res = axios.post('logout/', {
                            id: userStore.id
                        })
                        console.log(res.data)

                        Swal.fire('Logged out', '', 'success')

                        userStore.clearUser()
                        profileStore.clearProfile()
                        US_IndividualSched.clearUSIndividualSched()
                        US_IndividualDetails.clearUSIndividualDetails()

                        router.push(process.env.BASE_URL +"signin")
                        

                    } catch (err) {
                        console.log(err)
                    }
                    
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
    }

    
</script>

<template>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link to="/" class="brand-link">
            <!-- :src="slecLogo" -->
            <img  src="img/icons/favicon.ico" alt="" class="img-circle elevation-2 m-2" style="opacity: .8" />
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
                        <router-link to="/" class="nav-link active">
                            <i class="nav-icon fas fa-home"></i>
                            <p>
                                Home
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="" class="nav-link">
                            <i class="nav-icon fas fa-edit"></i>
                            <p>
                                Application
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="" class="nav-link">
                            <i class="nav-icon fas fa-tasks"></i>
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
.main-sidebar {
    position: fixed;
}
</style>