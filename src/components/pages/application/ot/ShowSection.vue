<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import {useRoute} from "vue-router"
import FormHeader from '@/components/global/FormHeader.vue'
// import SubFormHeader from '@/components/global/SubFormHeader.vue'
import PreviewText from '@/components/global/PreviewText.vue'
import moment from 'moment'

const route = useRoute();
const regId = route.params.id;

let showApplication = ref([])
let OT_Information = ref(null)

onMounted(async () => {
    showInformation()
})

const showInformation = async () => {
    let res = await axios.get('ot-show/' + regId)

    showApplication = res.data.result
    OT_Information.value = showApplication

}

</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div v-if="OT_Information" class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >Application Details</h1>
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->

        <form v-for="(row, index) in OT_Information" :key="index" class="col-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Medical Examination Schedule"
                        />
                    </div>
                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Preferred Clinic Location"
                            v-bind:previewText="`${row.branch}`"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Preferred Date of Medical examination"
                            v-bind:previewText="moment(`${row.PreferredMedicalExamDate}`).format('LL')"
                        />
                        
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-8 col-md-12 col-sm-12 mb-3">
                        <PreviewText 
                            previewLabel="Preferred Time of Medical examination"
                            v-bind:previewText="`${row.priorityTime}`"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Visa Application Information"
                        />
                    </div>
                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Embassy of Visa Application"
                            v-bind:previewText="`${row.priorityTime}`"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-12 pb-3">
                        <PreviewText 
                            previewLabel="Visa Category"
                            v-bind:previewText="`${row.SubClass}`"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="PASSPORT INFORMATION"
                        />
                    </div>
                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Passport Number"
                            v-bind:previewText="`${row.PassNo}`"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Country of Issue"
                            v-bind:previewText="`${row.issuedCountry}`"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-12 pb-3">
                        <PreviewText 
                            previewLabel="Date of Issue"
                            v-bind:previewText="moment(`${row.issuedDate}`).format('LL')"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="APPLICANT DETAILS"
                        />
                    </div>
                    <div class="col-12">
                        <ol>
                            <li>
                                <PreviewText 
                                    previewLabel="Applicant's Name"
                                />
                            </li>
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="lastName"
                                        smallLabel="Last Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="firstName"
                                        smallLabel="First Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="middleName"
                                        smallLabel="Middle Name"
                                    />
                                </div>
                            </div>
                            <hr />
                            <li>
                                <PreviewText 
                                    previewLabel="Mother's Maiden Name (Last Name, First Name, Middle Name)"
                                />
                                <div class="row">
                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="motherLastName"
                                            smallLabel="Last Name"
                                        />
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="motherFirstName"
                                            smallLabel="First Name"
                                        />
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="motherdiddleName"
                                            smallLabel="Middle Name"
                                        />
                                    </div>
                                </div>
                                <hr />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Applicant's Date of Birth"
                                    v-bind:previewText="birthDate"
                                />
                                <hr/>
                            </li>
                            <li>
                                <div class="row">
                                    <div class="col-6">
                                        <PreviewText 
                                            previewLabel="Gender"
                                            v-bind:previewText="gender == 'M' ? 'Male' : 'Female'"
                                        />
                                    </div>
                                    <div class="col-6">
                                        <PreviewText
                                            previewLabel="Civil Status"
                                            v-bind:previewText="civilStatus"
                                        />
                                    </div>
                                </div>
                                <hr/>
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Country of Nationality"
                                    v-bind:previewText="nationality"
                                />
                                <hr/>
                            </li>
                            <li>
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewText 
                                            previewLabel="Contact Number"
                                            v-bind:previewText="contactNo"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewText 
                                            previewLabel="Email Address"
                                            v-bind:previewText="emailAdd"
                                        />
                                    </div>
                                </div>
                                <hr/>
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Residential Address"
                                />
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="street"
                                            smallLabel="Street"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="barangay"
                                            smallLabel="Barangay"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="city"
                                            smallLabel="City"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="province"
                                            smallLabel="Province"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="postalCode"
                                            smallLabel="Postal Code"
                                        />
                                    </div>
                                    
                                </div>
                                <hr/>
                            </li>
                        </ol>
                    </div>
                </div>        
            </div>
        </form>    
        <!-- ============================================================== -->
                            <!-- End of Main Container -->
        <!-- ============================================================== -->
    </div>
    <div v-else class="row">
        <div class="col-12 m-5 p-5">
            <h2 class="text-secondary text-center fs-1 fw-bold">Please wait...</h2>
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
    padding: 1rem;
}

.section_header {
    background-color: #069;
}

.inputDate {
    width: 100%;
}
.irc_div {
    background: #f1f1f1;
}

@media only screen and (min-width: 768px) {
    .wrapper_container {
        margin: 0;
        margin-top: 1rem;
        padding: 1rem;
    }
    .inputDate {
        width: 100%;
    }
}

@media only screen and (min-width: 1000px) {
    .wrapper_container {
        margin: 3rem;
        padding: 2rem;
    }
    .inputDate {
        width: 50%;
    }
}
</style>