<script setup>
    // import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import { useUSIndividualDetails } from '@/store/us-individual-details'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import SubFormHeader from '@/components/global/SubFormHeader.vue'
    import RequiredInputField from '@/components/global/RequiredInputField.vue'
    import RequiredSelectField from '@/components/global/RequiredSelectField.vue'
    import SelectField from '@/components/global/SelectField.vue'
    import InputField from '@/components/global/InputField.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import Swal from '@/sweetalert2'
    // import { ucwords } from '../../../assets/js/string_functions'

    const router = useRouter()
    const profileStore = useProfileStore()
    const USIndividualDetails = useUSIndividualDetails()


    /**
     * For Fetching user data
     */
     onMounted(async () => {
        await profileStore.fetchProfileById(router.params.id)
    })

    let email = profileStore.email
    let textSuccess = "text-success"
    let textSuccess1 = "text-success"
    // let textSuccess2 = "text-success"

    const handleBack = () => {

        Swal.fire({
            title: 'Are you sure you want to go back?',
            text: 'The details you filled up will be gone.',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                router.push('/individual/us/date')

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    // ======================================================== //

    let date_of_birth = ref(null)
    let ci_nvc_number = ref(null)
    let ci_nvc_confirm = ref(null)
    let ci_visa_pref_category = ref(null)
    let ci_interview_date = ref(null)
    let ci_interview_source = ref(null)
    let ad_last_name = ref(null)
    let ad_first_name = ref(null)
    let ad_middle_name = ref(null)
    let ad_gender = ref(null)
    let ad_civil_status = ref(null)
    let ad_nationality = ref(null)
    let ad_birthplace = ref(null)
    let ad_birth_country = ref(null)
    let ad_mother_last_name = ref(null)
    let ad_mother_first_name = ref(null)
    let ad_mother_middle_name = ref(null)
    let ad_address = ref(null)
    let ad_city = ref(null)
    let ad_province = ref(null)
    let ad_zip_code = ref(null)
    let ad_overseas_country = ref(null)
    let ad_overseas_street_address = ref(null)
    let ad_overseas_city = ref(null)
    let ad_overseas_province = ref(null)
    let ad_overseas_zipcode = ref(null)
    let ad_contact_numbers = ref(null)
    let ad_present_residence = ref(null)
    let ad_prior_residence = ref(null)
    let ad_passport_number = ref(null)
    let ad_passport_issued_by = ref(null)
    let ad_passport_date = ref(null)
    let ad_passport_expiration_date = ref(null)
    let ad_issuance_date = ref(null)
    let ad_expiration_date = ref(null)
    let ad_prev_medical_exam_month = ref(null)
    let ad_prev_medical_exam_year = ref(null)
    let ad_prev_xray_month = ref(null)
    let ad_prev_xray_year = ref(null)
    let petitioner_fullname = ref(null)
    let petitioner_relationship = ref(null)
    let petitioner_us_street_addr = ref(null)
    let petitioner_us_city_addr = ref(null)
    let petitioner_us_state_addr = ref(null)
    let petitioner_us_postal_code = ref(null)
    let petitioner_contact_no = ref(null)
    let petitioner_email_addr = ref(null)
    let intended_port_of_entry = ref(null)

    

    /**
     * Submit US individual form
     * 
     */
     const handleDetails = async () => {

        const jsonDATA = {
                json_date_of_birth: date_of_birth.value,
                json_ci_nvc_number: ci_nvc_number.value,
                json_ci_nvc_confirm: ci_nvc_confirm.value,
                json_ci_visa_pref_category: ci_visa_pref_category.value,
                json_ci_interview_date: ci_interview_date.value,
                json_ci_interview_source: ci_interview_source.value,
                json_ad_last_name: ad_last_name.value,
                json_ad_first_name: ad_first_name.value,
                json_ad_middle_name: ad_middle_name.value,
                json_ad_gender: ad_gender.value,
                json_ad_civil_status: ad_civil_status.value,
                json_ad_nationality: ad_nationality.value,
                json_ad_birthplace: ad_birthplace.value,
                json_ad_birth_country: ad_birth_country.value,
                json_ad_mother_last_name: ad_mother_last_name.value,
                json_ad_mother_first_name: ad_mother_first_name.value,
                json_ad_mother_middle_name: ad_mother_middle_name.value,
                json_ad_address: ad_address.value,
                json_ad_city: ad_city.value,
                json_ad_zip_code: ad_zip_code.value,
                json_ad_overseas_country: ad_overseas_country.value,
                json_ad_overseas_street_address: ad_overseas_street_address.value,
                json_ad_overseas_city: ad_overseas_city.value,
                json_ad_overseas_province: ad_overseas_province.value,
                json_ad_overseas_zipcode: ad_overseas_zipcode.value,
                json_ad_contact_numbers: ad_contact_numbers.value,
                json_ad_present_residence: ad_present_residence.value,
                json_ad_prior_residence: ad_prior_residence.value,
                json_ad_passport_number: ad_passport_number.value,
                json_ad_passport_issued_by: ad_passport_issued_by.value,
                json_ad_passport_date: ad_passport_date.value,
                json_ad_passport_expiration_date: ad_passport_expiration_date.value,
                json_ad_issuance_date: ad_issuance_date.value,
                json_ad_expiration_date: ad_expiration_date.value,
                json_ad_prev_medical_exam_month: ad_prev_medical_exam_month.value,
                json_ad_prev_medical_exam_year: ad_prev_medical_exam_year.value,
                json_ad_prev_xray_month: ad_prev_xray_month.value,
                json_ad_prev_xray_year: ad_prev_xray_year.value,
                json_petitioner_fullname: petitioner_fullname.value,
                json_petitioner_relationship: petitioner_relationship.value,
                json_petitioner_us_street_addr: petitioner_us_street_addr.value,
                json_petitioner_us_city_addr: petitioner_us_city_addr.value,
                json_petitioner_us_state_addr: petitioner_us_state_addr.value,
                json_petitioner_us_postal_code: petitioner_us_postal_code.value,
                json_petitioner_contact_no: petitioner_contact_no.value,
                json_petitioner_email_addr: petitioner_email_addr.value,
                json_intended_port_of_entry: intended_port_of_entry.value
        }

        let res = JSON.stringify(jsonDATA)
        // console.log(res)

        USIndividualDetails.setUSIndividualDetails(res)
        router.push('/individual/us/preview')

        


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
                    <div class="col-12">
                        <span class="text-danger">Fields with asterisks(*) are required</span>
                    </div>
                    <div class="mb-3 col-lg-8 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Date of Birth"
                            inputType="date"
                            v-model:input="date_of_birth"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Case Information"
                        />
                    </div>
        
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="NVC Case Number"
                            inputType="text"
                            minLength=3
                            maxLength=14
                            smallLabel="3-character Consulate Code+10-digit case number (ex. MNL##########)"
                            v-model:input="ci_nvc_number"
                        />
                    </div>
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Confirm NVC Case Number"
                            inputType="text"
                            maxLength=14
                            smallLabel="Please re-enter your NVC Case Number"
                            v-model:input="ci_nvc_confirm"
                        />
                    </div>
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Visa Preferemce Category"
                            v-model:input="ci_visa_pref_category"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <InputField 
                            label="Interview Date"
                            inputType="date"
                            v-model:input="ci_interview_date"
                            smallLabel="If none, leave blank'"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            label="Interview Source"
                            v-model:input="ci_interview_source"
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
                        <RequiredInputField 
                            label="Last Name"
                            placeholder="Last Name"
                            inputType="text"
                            v-model:input="ad_last_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="First Name"
                            placeholder="First Name"
                            inputType="text"
                            v-model:input="ad_first_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            label="Middle Name"
                            placeholder="Middle Name"
                            inputType="text"
                            v-model:input="ad_middle_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Gender"
                            v-model:input="ad_gender"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Civil Status"
                            v-model:input="ad_civil_status"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Country or Nationality"
                            v-model:input="ad_nationality"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Birthplace"
                            placeholder="Birth City"
                            inputType="text"
                            v-model:input="ad_birthplace"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Country"
                            smallLabel="Birth Country"
                            v-model:input="ad_birth_country"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Mother's maiden name"
                            placeholder="Last Name"
                            inputType="text"
                            smallLabel="Last Name"
                            v-model:input="ad_mother_last_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredInputField 
                            inputClassName="mt-2"
                            starClassName="d-none"
                            placeholder="First Name"
                            inputType="text"
                            smallLabel="First Name"
                            v-model:input="ad_mother_first_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="Middle Name"
                            inputType="text"
                            smallLabel="Middle Name"
                            v-model:input="ad_mother_middle_name"
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
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <InputField 
                            label="PHILIPPINE ADDRESS"
                            placeholder="Building Name and Street Address"
                            inputType="text"
                            v-model:input="ad_address"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="City/Town"
                            inputType="text"
                            v-model:input="ad_city"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <SelectField 
                            label="Province"
                            v-model:input="ad_province"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="Zip Code"
                            inputType="text"
                            v-model:input="ad_zip_code"
                        />
                    </div>
                    <div class="mb-3 mt-5 col-12">
                        <h5 class="text-uppercase">FOR APPLICANTS CURRENTLY LIVING OUTSIDE THE PHILIPPINES:</h5>
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <SelectField 
                            label="Overseas Address"
                            v-model:input="ad_overseas_country"
                        />
                    </div>
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="Street Address"
                            inputType="text"
                            v-model:input="ad_overseas_street_address"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="City/Town"
                            inputType="text"
                            v-model:input="ad_overseas_city"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="Province/State"
                            inputType="text"
                            v-model:input="ad_overseas_province"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="Zip Code"
                            inputType="text"
                            v-model:input="ad_overseas_zipcode"
                        />
                    </div>
                    <div class="col-12 mt-3 mb-1"><hr></div>
                    
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Contact Number(s), separate with a slash"
                            placeholder="Contact Number"
                            inputType="text"
                            smallLabel="(Area Code)<space>Tel.Number."
                            v-model:input="ad_contact_numbers"
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
                                <span class=" ml-3 fs-2 fw-normal text-secondary">
                                {{ email }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-3 mb-1"><hr></div>

                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Present Country of Residence"
                            v-model:input="ad_present_residence"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Prior Country of Residence"
                            v-model:input="ad_prior_residence"
                        />
                    </div>
                    <div class="mb-3 mt-5 col-12">
                        <SubFormHeader 
                            headerText="Passport Information"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Passport Number"
                            placeholder="Passport Number"
                            inputType="text"
                            v-model:input="ad_passport_number"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Issued by (Country) "
                            v-model:input="ad_passport_issued_by"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Issue Date"
                            inputType="date"
                            v-model:input="ad_passport_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Expiration Date"
                            inputType="date"
                            v-model:input="ad_passport_expiration_date"
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
                                <label class="text-capitalize">
                                    Have you been issued a U.S. Tourist Visa? <b class="text-danger">*</b>
                                </label>
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
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Issuance Date"
                            inputType="date"
                            v-model:input="ad_issuance_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Expiration Date"
                            inputType="date"
                            v-model:input="ad_expiration_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            label="Previous Medical Examination at SLEC"
                            v-model:input="ad_prev_medical_exam_month"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            v-model:input="ad_prev_medical_exam_year"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            label="Date of previous Chest X-Ray"
                            v-model:input="ad_prev_xray_month"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            v-model:input="ad_prev_xray_year"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Petitioner's Information"
                        />
                    </div>
                    <div class="mb-1 col-12">
                        <RequiredInputField 
                            label="Name of Petitioner"
                            placeholder="Enter Full Name"
                            inputType="text"
                            smallLabel="(Area Code)<space>Tel.Number."
                            v-model:input="petitioner_fullname"
                        />
                    </div>

                    <div class="mb-1 col-12">
                        <div class="row mt-3">
                            <!-- ====================== Date Input ======================== -->
                            <div class="col-12">
                                <label class="text-capitalize">
                                Is the petitioner still alive? <b class="text-danger">*</b>
                                </label>
                            </div>
                            <div class="col-lg-2 col-md-2 col-sm-12 pl-4 input-group">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>     
                            <div class="col-lg-10 col-md-10 col-sm-12 pl-4">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    No
                                </label>
                            </div>   
                        </div>
                    </div>
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Relationship"
                            v-model:input="petitioner_relationship"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="U.S. Address"
                            inputType="text"
                            smallLabel="Street Address"
                            v-model:input="petitioner_us_street_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <InputField 
                            label="City"
                            inputType="text"
                            smallLabel="City"
                            v-model:input="petitioner_us_city_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="State"
                            v-model:input="petitioner_us_state_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Postal Code"
                            placeholder="Enter postal code"
                            inputType="text"
                            v-model:input="petitioner_us_postal_code"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Contact Number"
                            placeholder="Enter postal code"
                            inputType="text"
                            v-model:input="petitioner_contact_no"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Email Address"
                            placeholder="Enter postal code"
                            inputType="text"
                            v-model:input="petitioner_email_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Intended Port of Entry"
                            v-model:input="intended_port_of_entry"
                        />
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