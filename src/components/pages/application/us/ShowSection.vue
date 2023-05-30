<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import {useRoute} from "vue-router"
import FormHeader from '@/components/global/FormHeader.vue'
import SubFormHeader from '@/components/global/SubFormHeader.vue'
import PreviewText from '@/components/global/PreviewText.vue'
import moment from 'moment'

const route = useRoute();
const regId = route.params.id;

let showApplication = ref([])
let US_Information = ref(null)

onMounted(async () => {
    showInformation()
})

const showInformation = async () => {
    let res = await axios.get('us-show/' + regId)

    showApplication = res.data.result
    US_Information.value = showApplication

}

</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div v-if="US_Information" class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >Application Details</h1>
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->
      
        <form v-for="(row, index) in US_Information" :key="index" class="col-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Medical Examination Schedule"
                        />
                    </div>
        
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Preferred Date of Medical examination"
                            v-bind:previewText="moment(`${row.PreferredMedicalExamDate}`).format('LL')"
                        />
                        
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Preferred Time of Medical examination"
                            v-bind:previewText="`${row.PreferredMedicalExamTime}`"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-3 col-12">
                        <PreviewText 
                            previewLabel="Date of Birth"
                            v-bind:previewText="moment(`${row.DOB}`).format('LL')"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="COVID-19 VACCINE"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <PreviewText 
                            previewLabel="What category do you belong to?"
                            v-bind:previewText="`${row.PreferredMedicalExamTime}`"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <PreviewText 
                            previewLabel="Have you received your COVID-19 vaccine?"
                        />
                        <ol type="I">
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Brand Name"
                                    v-bind:previewText="`${row.covid_vaccine_priority}`"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Dose 1 Date Received "
                                    v-bind:previewText="`${row.received_vaccine}`"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Dose 2 Date Received "
                                    v-bind:previewText="`${row.vaccine_brand}`"
                                />
                            </li>
                            <li>
                                <hr/>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 1 Brand Name"
                                    v-bind:previewText="`${row.first_dose}`"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 1 Date Received"
                                    v-bind:previewText="`${row.PreferredMedicalExamTime}`"
                                />
                            </li>
                            <li>
                                <hr/>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 2 Brand Name"
                                    v-bind:previewText="`${row.PreferredMedicalExamTime}`"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 2 Date Received"
                                    v-bind:previewText="`${row.PreferredMedicalExamTime}`"
                                />
                            </li>
                        </ol>
                    </div>
                



                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Case Information"
                        />
                    </div>
        
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="NVC Case Number"
                            v-bind:previewText="detail_ci_nvc_number"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-12">
                        <PreviewText 
                            previewLabel="Visa Preferemce Category"
                            v-bind:previewText="detail_ci_visa_pref_category"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Interview Date"
                            v-bind:previewText="detail_ci_interview_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Interview Source"
                            v-bind:previewText="detail_ci_interview_source"
                        />
                    </div>
                    <div class="mb-3 mt-3 col-12">
                        <FormHeader
                            headerText="Applicant Details"
                        />
                        <SubFormHeader 
                            headerText="Basic Information (as indicated in passport)"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Last Name"
                            v-bind:previewText="`${row.LastName}`"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="First Name"
                            v-bind:previewText="`${row.FirstName}`"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Middle Name"
                            v-bind:previewText="detail_ad_middle_name"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Gender"
                            v-bind:previewText="detail_ad_gender"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Civil Status"
                            v-bind:previewText="detail_ad_civil_status"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Country"
                            v-bind:previewText="detail_ad_nationality"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Birthplace"
                            v-bind:previewText="detail_ad_birthplace"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Birth Country"
                            v-bind:previewText="detail_ad_birth_country"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-12">
                        <div class="row mt-1 p-3">
                            <div class="col-12">
                                <label class="text-capitalize">
                                    Mother's maiden name
                                </label>
                            </div>
                            <div class="col-lg-4 col-md-12 col-sm-12">
                                <PreviewText 
                                    previewLabel=""
                                    v-bind:previewText="detail_ad_mother_last_name"
                                    smallLabel="Last Name"
                                />
                            </div>
                            <div class="col-lg-4 col-md-12 col-sm-12">
                                <PreviewText 
                                    v-bind:previewText="detail_ad_mother_first_name"
                                    smallLabel="First Name"
                                />
                            </div>
                            <div class="col-lg-4 col-md-12 col-sm-12">
                                <PreviewText 
                                    v-bind:previewText="detail_ad_mother_middle_name"
                                    smallLabel="Middle Name"
                                />
                            </div>
                        </div>

                    </div>
                    <div class="mb-3 mt-5 col-12">
                        <SubFormHeader 
                            headerText="Contact Information"
                        />
                    </div>
                    <div class="mb-3 mt-3 col-12">
                        <h5 class="text-uppercase">FOR APPLICANTS CURRENTLY LIVING IN THE PHILIPPINES:</h5>
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="PHILIPPINE ADDRESS"
                            v-bind:previewText="detail_ad_address"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="City/Town"
                            v-bind:previewText="detail_ad_city"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Province"
                            v-bind:previewText="detail_ad_province"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Zip Code"
                            v-bind:previewText="detail_ad_zip_code"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-3 mt-5 col-12">
                        <h5 class="text-uppercase">FOR APPLICANTS CURRENTLY LIVING OUTSIDE THE PHILIPPINES:</h5>
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Overseas Address"
                            v-bind:previewText="detail_ad_overseas_country"
                        />
                    </div>
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Street Address"
                            v-bind:previewText="detail_ad_overseas_street_address"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="City/Town"
                            v-bind:previewText="detail_ad_overseas_city"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Province/State"
                            v-bind:previewText="detail_ad_overseas_province"
                        />
                    </div>
                    <div class="mb-1 col-12">
                        <PreviewText 
                            previewLabel="Zip Code"
                            v-bind:previewText="detail_ad_overseas_zipcode"
                        />
                    </div>
                    <div class="col-12 mt-3 mb-1"><hr></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Contact Number"
                            v-bind:previewText="detail_ad_contact_numbers"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Email Address"
                            v-bind:previewText="email"
                        />
                    </div>

                    <div class="col-12 mt-3 mb-1"><hr></div>

                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Present Country of Residence"
                            v-bind:previewText="detail_ad_present_residence"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Prior Country of Residence"
                            v-bind:previewText="detail_ad_prior_residence"
                        />
                    </div>
                    <div class="mb-3 mt-5 col-12">
                        <SubFormHeader 
                            headerText="Passport Information"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Passport Number"
                            v-bind:previewText="detail_ad_passport_number"
                        />
                    </div>
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Issued by (Country) "
                            v-bind:previewText="detail_ad_passport_issued_by"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Issue Date"
                            v-bind:previewText="detail_ad_passport_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Expiration Date"
                            v-bind:previewText="detail_ad_passport_expiration_date"
                        />
                    </div>
                    <div class="mb-3 mt-5 col-12">
                        <SubFormHeader 
                            headerText="Additional Questions"
                        />
                    </div>
                    <div class="mb-1 col-12">
                        <div class="row mt-3">
                            <!-- ====================== Date Input ======================== -->
                            <div class="col-12">
                                <PreviewText 
                                    previewLabel="Have you been issued a U.S. Tourist Visa?"
                                    v-bind:previewText="detail_ad_has_been_issued_visa"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Issuance Date"
                            v-bind:previewText="detail_ad_issuance_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Expiration Date"
                            v-bind:previewText="detail_ad_expiration_date"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Previous Medical Examination at SLEC"
                            smallLabel="Month"
                            v-bind:previewText="detail_ad_prev_medical_exam_month"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            smallLabel="Year"
                            v-bind:previewText="detail_ad_prev_medical_exam_year"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Date of previous Chest X-Ray"
                            smallLabel="Month"
                            v-bind:previewText="detail_ad_prev_xray_month"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            smallLabel="Year"
                            v-bind:previewText="detail_ad_prev_xray_year"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Petitioner's Information"
                        />
                    </div>
                    <div class="mb-1 col-12">
                        <PreviewText 
                            previewLabel="Name of Petitioner"
                            v-bind:previewText="detail_petitioner_fullname"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-12">
                        <PreviewText 
                            previewLabel="Is the petitioner still alive?"
                            v-bind:previewText="detail_petitioner_is_alive"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-12">
                        <PreviewText 
                            previewLabel="Relationship"
                            v-bind:previewText="detail_petitioner_relationship"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="U.S. Address"
                            v-bind:previewText="detail_petitioner_us_street_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="City"
                            v-bind:previewText="detail_petitioner_us_city_addr"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="State"
                            v-bind:previewText="detail_petitioner_us_state_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Postal Code"
                            v-bind:previewText="detail_petitioner_us_postal_code"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Contact Number"
                            v-bind:previewText="detail_petitioner_contact_no"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Email Address"
                            v-bind:previewText="detail_petitioner_email_addr"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Intended Port of Entry"
                            v-bind:previewText="detail_intended_port_of_entry"
                        />
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