<script setup>
    import CalloutDanger from '@/components/global/CalloutDanger.vue'
    import RouterButton from '@/components/global/RouterButton.vue'



</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >U.S.A. Online Registration</h1>
        </div>
        <div class="col-12">
            <CalloutDanger 
                headerTitle="Reminder"
                description="
                Applicants for <u>repeat</u> medical examination needs to have a <strong>NEW HEALTHCASE</strong> prior to registering online for their medical examination.

                Please submit a healthcase inquiry first before scheduling your medical appointment.<br/>

                <a href='https://slec.ph/inquiry/healthcase/' target='__blank' class='text-decoration-none text-primary'><strong>CLICK here</strong></a>.<br/>

                If this is your first medical examination, there is <strong>NO</strong></strong> need to do a healthcase inquiry. Proceed directly to registration.
                "
            />
        </div>
        <div class="col-12">
            <p class="text-black fs-5">
                This online registration form aims to reduce registration time by having most of the applicant's information ready upon arrival at the registration area. Pre-registered applicants should only need to have their biometrics captured upon arrival at the reception area.
            </p>
        </div>
        <div class="col-12">
            <h4 class="fw-bold">INSTRUCTIONS</h4>
            <ol>
                <li>Complete all fields. Know all details of your application before accomplishing the online registration form.</li>
                <li>For families, an online registration must be submitted for each family member. Families with incomplete online applications will not be accommodated at the reception area.</li>
                <li>Please type your complete address. Do not abbreviate any details pertaining to the street, city, or state.</li>
                <li>Once all fields have been filled out, Click on the 'Preview' button. The next step will display a preview of all data entered.</li>
                <li>Review data for errors. Use the form to correct them as needed, click 'Preview', to preview data to be submitted.</li>
                <li>If all data are correct, click on the 'Register' button to submit your registration.</li>
            </ol>
        </div>
        <div class="col-12">
            <CalloutDanger 
                headerTitle="Reminder"
                description="
                Sudden changes in quarantine restrictions may affect Clinic schedules. Please provide an email address and phone number that is working and accessible to you so we can contact you when needed. Visit our website regularly for important announcements.
                "
            />
            <CalloutDanger 
                headerTitle="Warning"
                description="
                FOR THOSE WHO WILL REGISTER MULTIPLE TIMES, OUR SYSTEM WILL AUTOMATICALLY CANCEL ANY DUPLICATE BOOKINGS. ANY CANCELLED AND UNPAID APPOINTMENTS WILL NOT BE HONORED.
                "
            />
        </div>
       <div class="col-12 d-flex justify-content-center">
            <RouterButton 
                btnUrl="/individual"
                className="btn btn-secondary w-25 mr-5"
                btnText="Back"
            />
            <RouterButton 
                btnUrl="/individual/us/schedule"
                className="btn btn-primary w-25"
                btnText="Next"
            />
        </div>
    </div>
    
    <!-- ============================================================== -->
                                    <!-- End of Main Container -->
    <!-- ============================================================== -->
</template>

<style lang="scss">
.wrapper_container {
    margin: 0;
    margin-top: 1rem;
    width: 100%;
}

@media only screen and (min-width: 768px) {
    .wrapper_container {
        margin: 0;
        margin-top: 1rem;
        padding: 1rem;
    }
}

@media only screen and (min-width: 1000px) {
    .wrapper_container {
        margin: 3rem;
        padding: 2rem;
    }
}
</style>