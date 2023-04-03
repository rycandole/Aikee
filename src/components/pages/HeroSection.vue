<script setup>
    import { onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useProfileStore } from '../../store/profile-store'

    import TopNavBar from '../includes/TopNavBar.vue'
    import SideNavigation from '../includes/SideNavigation.vue'
    import FooterSection from '../includes/FooterSection.vue'
    import CalloutDanger from '../global/CalloutDanger.vue'
    

    const route = useRoute()
    const profileStore = useProfileStore()

    onMounted(async () => {
        await profileStore.fetchProfileById(route.params.id)
    })

</script>

<template>
    <div class="wrapper">
        <TopNavBar />
        <SideNavigation />

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <div class="container-md">
                <div class="row mb-2  pt-5 pb-5class_for_padding">
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <h1 class="m-0">Welcome <strong>{{ profileStore.firstName }}</strong></h1>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item "><router-link to="/" class="text-secondary"> Home </router-link></li>
                        </ol>
                    </div>
                    <!-- ===================================================================================== -->
                                                        <!-- Main Container -->
                    <!-- ===================================================================================== -->
                    <div class="wrapper_container row bg-white border">
                        <div class="col-sm-12 mb-5">
                            <h1 class="text-secondary text-center fs-1 fw-bold" >Medical Online Registration</h1>
                        </div>
                        <div class="col-sm-12">
                            <CalloutDanger 
                                headerTitle="Reminder"
                                description="
                                Sudden changes in quarantine restrictions may affect Clinic schedules. Please provide an email address and phone number that is working and accessible to you so we can contact you when needed. Visit our website regularly for important announcements..
                                "
                            />
                        </div>
                        <div class="col-sm-12">
                            <p class="text-black fs-5">
                                This online registration form aims to reduce registration time by having most of the applicant's information ready upon arrival at the registration area. Pre-registered applicants should only need to have their biometrics captured upon arrival at the reception area.
                            </p>
                        </div>
                        <div class="col-sm-12">
                            <h4 class="fw-bold">TERMS AND CONDITIONS</h4>
                            <ul>
                                <li>This appointment and scheduling system allocates slots on a first come, first served basis.</li>
                                <li>Users accept the responsibility for supplying, checking, and verifying the accuracy and correctness of the information they provide on this system in connection with their application. Incorrect or inaccurate information supplied may result in forfeiture of passport application.</li>
                            </ul>
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12">
                            <router-link to="/individual" class="btn btn-info btn-lg mt-3 mb-3 w-100"><i class="fas fa-user mt-1 pr-1"></i> Start Individual Appointment </router-link>
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12">
                            <router-link to="/family" class="btn btn-info btn-lg mt-3 mb-3 w-100"><i class="fas fa-users mt-1 pr-1"></i> Start Family Appointment </router-link>
                        </div>
                        <div class="col-sm-12">
                            <p class="text-secondary p-1">
                                After agreeing to the Terms and Conditions above, you may start your online application by clicking either "Start Individual Appointment" or "Start Family Appointment"
                            </p>
                        </div>
                    </div>
                    
                    <!-- ============================================================== -->
                                                    <!-- End of Main Container -->
                    <!-- ============================================================== -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->

            
        </div>
        <!-- /.content -->

        <FooterSection />

    </div>
</template>

<style lang="scss">

.wrapper_container {
        margin: 0;
        padding: 0;
}

@media only screen and (min-width: 768px) {
    .wrapper_container {
        margin: 0;
        padding: 1rem;
    }
}

@media only screen and (min-width: 1000px) {
    .class_for_padding {
        padding: 3rem 3rem 3rem 3rem;
    }
}
</style>

