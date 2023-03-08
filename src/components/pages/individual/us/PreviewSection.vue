<script setup>
    // import axios from 'axios'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import SubFormHeader from '@/components/global/SubFormHeader.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import PreviewText from '@/components/global/PreviewText.vue'
    import Swal from '@/sweetalert2'
    
    // import { ucwords } from '../../../assets/js/string_functions'

    const router = useRouter()
    const profileStore = useProfileStore()
    const schedule = JSON.parse(localStorage.getItem('us-individual-sched'))
    const details = JSON.parse(localStorage.getItem('us-individual-details'))

    

    /**
     * For Fetching user data
     */
     onMounted(async () => {
        await profileStore.fetchProfileById(router.params.id)
    })


    let email = profileStore.email
    let textSuccess = "text-success"
    let textSuccess1 = "text-success"
    let textSuccess2 = "text-success"

    // Schedule Store
    let sched_date = schedule.date;
    let sched_time = schedule.time;

    // Details Store 
    let detail_date_of_birth = details.date_of_birth;
    let detail_ci_nvc_number = details.ci_nvc_number;
    let detail_ci_visa_pref_category = details.ci_visa_pref_category;
    let detail_ci_interview_date = details.ci_interview_date;
    let detail_ci_interview_source = details.ci_interview_source;
    let detail_ad_last_name = details.ad_last_name;
    let detail_ad_first_name = details.ad_first_name;
    let detail_ad_middle_name = details.ad_middle_name;
    let detail_ad_gender = details.ad_gender;
    let detail_ad_civil_status = details.ad_civil_status;
    let detail_ad_nationality = details.ad_nationality;
    let detail_ad_birthplace = details.ad_birthplace;
    let detail_ad_birth_country = details.ad_birth_country;
    let detail_ad_mother_last_name = details.ad_mother_last_name;
    let detail_ad_mother_first_name = details.ad_mother_first_name;
    let detail_ad_mother_middle_name = details.ad_mother_middle_name;
    let detail_ad_address = details.ad_address;
    let detail_ad_city = details.ad_city;
    let detail_ad_province = details.ad_province;
    let detail_ad_zip_code = details.ad_zip_code;
    let detail_ad_overseas_country = details.ad_overseas_country;
    let detail_ad_overseas_street_address = details.ad_overseas_street_address;
    let detail_ad_overseas_city = details.ad_overseas_city;
    let detail_ad_overseas_province = details.ad_overseas_province;
    let detail_ad_overseas_zipcode = details.ad_overseas_zipcode;
    let detail_ad_contact_numbers = details.ad_contact_numbers;
    let detail_ad_present_residence = details.ad_present_residence;
    let detail_ad_prior_residence = details.ad_prior_residence;
    let detail_ad_passport_number = details.ad_passport_number;
    let detail_ad_passport_issued_by = details.ad_passport_issued_by;
    let detail_ad_passport_date = details.ad_passport_date;
    let detail_ad_passport_expiration_date = details.ad_passport_expiration_date;
    let detail_ad_was_in_us = details.ad_was_in_us;
    let detail_ad_issuance_date = details.ad_issuance_date;
    let detail_ad_expiration_date = details.ad_expiration_date;
    let detail_ad_prev_medical_exam_month = details.ad_prev_medical_exam_month;
    let detail_ad_prev_medical_exam_year = details.ad_prev_medical_exam_year;
    let detail_ad_prev_xray_month = details.ad_prev_xray_month;
    let detail_ad_prev_xray_year = details.ad_prev_xray_year;


    let detail_petitioner_fullname = details.petitioner_fullname;
    let detail_petitioner_is_alive = details.petitioner_is_alive;
    let detail_petitioner_relationship = details.petitioner_relationship;
    let detail_petitioner_us_street_addr = details.petitioner_us_street_addr;
    let detail_petitioner_us_city_addr = details.petitioner_us_city_addr;
    let detail_petitioner_us_state_addr = details.petitioner_us_state_addr;
    let detail_petitioner_us_postal_code = details.petitioner_us_postal_code;
    let detail_petitioner_contact_no = details.petitioner_contact_no;
    let detail_petitioner_email_addr = details.petitioner_email_addr;
    let detail_intended_port_of_entry = details.intended_port_of_entry;



    const handleBack = () => {

        Swal.fire({
            title: 'Are you sure you want to go back?',
            text: 'The details you filled up will be gone.',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                router.push('/individual/us/applicant-details')

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }


</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >U.S.A. Online Registration</h1>
        </div>
        <div class="col-lg-3 col-md-12 col-sm-12">
            <SideNav 
                :className="textSuccess ? textSuccess : 'text-secondary'"
                :className1="textSuccess1 ? textSuccess1 : 'text-secondary'"
                :className2="textSuccess2 ? textSuccess2 : 'text-secondary'"
            />
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->
        <form @submit.prevent="handleDetails" class="col-lg-9 col-md-12 col-sm-12 mb-3">
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
                            v-bind:previewText="sched_date"
                        />
                        
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Preferred Time of Medical examination"
                            v-bind:previewText="sched_time"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class=" col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Date of Birth"
                            v-bind:previewText="detail_date_of_birth"
                        />
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
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
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
                            v-bind:previewText="detail_ad_last_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="First Name"
                            v-bind:previewText="detail_ad_first_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Middle Name"
                            v-bind:previewText="detail_ad_middle_name"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Gender"
                            v-bind:previewText="detail_ad_gender"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Civil Status"
                            v-bind:previewText="detail_ad_civil_status"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
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
                        <PreviewText 
                            previewLabel="Mother's maiden name"
                            v-bind:previewText="detail_ad_mother_last_name+', '+detail_ad_mother_first_name+', '+detail_ad_mother_middle_name"

                        />
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
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Province"
                            v-bind:previewText="detail_ad_province"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
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
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="City/Town"
                            v-bind:previewText="detail_ad_overseas_city"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Province/State"
                            v-bind:previewText="detail_ad_overseas_province"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
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
                        <div class="row mt-3">
                            <div class="col-12">
                                <label class="text-capitalize">
                                Email Address
                                </label>
                            </div>
                            <div class="col-12 input-group">
                                <span class=" ml-3 fs-2 fw-normal text-mute">
                                {{ email }}
                                </span>
                            </div>
                        </div>
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
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Passport Number"
                            v-bind:previewText="detail_ad_passport_number"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
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
                    <div class="col-12"><hr /></div>
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
                                    v-bind:previewText="detail_ad_was_in_us"
                                />
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-12 pl-4 input-group">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Default radio
                                </label>
                            </div>     
                            <div class="col-lg-7 col-md-7 col-sm-12 pl-4">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Default checked radio
                                </label>
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
                            v-bind:previewText="detail_ad_prev_medical_exam_month"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            v-bind:previewText="detail_ad_prev_medical_exam_year"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Date of previous Chest X-Ray"
                            v-bind:previewText="detail_ad_prev_xray_month"
                        />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            v-bind:previewText="detail_ad_prev_xray_year"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
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
                            previewLabel=" Is the petitioner still alive?"
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
                    <div class="col-12"><hr /></div>
                    <div class="col-12 mt-4 border-top container-fluid p-3 irc_div">
                        <h6 class="text-bold mt-3">Information Registration Consent:</h6>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                I certify that the information provided in my registration is true and correct to the best of my knowledge and understand that any dishonest answer may cause delay in the process of my medical examination.
                            </label>
                        </div>
                        <div class="form-check mt-2">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
                            <label class="form-check-label" for="flexCheckChecked">
                                I certify that I understand the purpose of the online registration.
                            </label>
                        </div>
                        <div class="form-check">
                            <p class="mt-3">
                                I understand that ST. LUKE'S MEDICAL CENTER EXTENSION CLINIC needs to collect my personal information for the conduct of my medical examination required for my U.S. Visa Application. For this purpose, the information will be shared to the U.S. Embassy Manila. The information provided shall be processed and retained in accordance with the Data Privacy Act and the regulation of the Centers for Disease Control and Prevention and the U.S. Government.
                            </p>
                        </div>
                    </div>
                    
                    
                </div>        
            </div>

            <!-- <div class="col-lg-3 col-md-12 col-sm-12"></div> -->
            <div class="col-12 d-flex justify-content-center">
                <SubmitFormButton 
                    btnType="button"
                    className="btn btn-secondary w-25 mr-5"
                    btnText="Back"
                    @click="handleBack"
                />
                <SubmitFormButton 
                    btnType="submit"
                    className="btn btn-primary w-25"
                    btnText="Preview"
                />
            </div>
        </form>
        <!-- ============================================================== -->
                            <!-- End of Main Container -->
        <!-- ============================================================== -->
        
        
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