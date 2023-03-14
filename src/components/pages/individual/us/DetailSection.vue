<script setup>
    // import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import { useUSIndividualDetails } from '@/store/us-individual-details'
    import { Form } from 'vee-validate'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import SubFormHeader from '@/components/global/SubFormHeader.vue'
    import RequiredInputField from '@/components/global/RequiredInputField.vue'
    import RequiredSelectField from '@/components/global/RequiredSelectField.vue'
    import SelectField from '@/components/global/SelectField.vue'
    import InputField from '@/components/global/InputField.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import Swal from '@/sweetalert2'
    import * as yup from 'yup';

    // import { ucwords } from '../../../assets/js/string_functions'

    // ================= Select Option Array ===================== //
    import interviewSources from '@/assets/js/arrays/interviev_source_array'
    import visaCategories from '@/assets/js/arrays/visa_categories_array'
    import genderOption from '@/assets/js/arrays/gender_array'
    import civilStatus from '@/assets/js/arrays/civil_status_array'
    import countries from '@/assets/js/arrays/countries_array'
    import philppineProvince from '@/assets/js/arrays/phil_province_array'
    import months from '@/assets/js/arrays/month_array'
    import years from '@/assets/js/arrays/year_list_array'
    import relationship from '@/assets/js/arrays/relationship_array'
    import states from '@/assets/js/arrays/states_array'
    // import YearList from '@/assets/js/arrays/year_list_array'
    

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




    const handleBack = () => {

        Swal.fire({
            title: 'Are you sure you want to go back?',
            text: 'The details you filled up will be gone.',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                router.push('/individual/us/schedule')

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
    let ad_has_been_issued_visa = ref(null)
    let ad_issuance_date = ref(null)
    let ad_expiration_date = ref(null)
    let ad_prev_medical_exam_month = ref(null)
    let ad_prev_medical_exam_year = ref(null)
    let ad_prev_xray_month = ref(null)
    let ad_prev_xray_year = ref(null)
    let petitioner_fullname = ref(null)
    let petitioner_is_alive = ref(null)
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
                json_ad_province: ad_province.value,
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
                json_ad_has_been_issued_visa: ad_has_been_issued_visa.value,
                json_ad_issuance_date: ad_issuance_date.value,
                json_ad_expiration_date: ad_expiration_date.value,
                json_ad_prev_medical_exam_month: ad_prev_medical_exam_month.value,
                json_ad_prev_medical_exam_year: ad_prev_medical_exam_year.value,
                json_ad_prev_xray_month: ad_prev_xray_month.value,
                json_ad_prev_xray_year: ad_prev_xray_year.value,
                json_petitioner_fullname: petitioner_fullname.value,
                json_petitioner_is_alive: petitioner_is_alive.value,
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

const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
const nameRegex = /^[\p{L}\p{M}\s-]+$/u;
const numOnlyRegex = /^[\p{N}]+$/u;

const schema = yup.object({
  birthdate: yup.string().required('Birthdate is required!').min(new Date(1925, 0, 1), "Birthdate must be atleast January 01, 1923"),
  nvc_caseNumber: yup.string().required('NVC Case Number is required!').min(13, 'NVC Case Number must be atleast 13 characters').max(13, 'NVC Case Number must be at most 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^"),
  confirm_nvc_caseNumber: yup.string().required('NVC Case Number is required!').min(13, 'NVC Case Number must be atleast 13 characters').max(13, 'NVC Case Number must be at most 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^").oneOf([yup.ref('nvc_caseNumber')], 'NVC Case Number do not match'),
  visa_category: yup.string().required('Last name is required!'),
  first_name: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  middle_name: yup.string().nullable().matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  last_name: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  interview_date: yup.string().required('Interview date is required!').min(new Date(1925, 0, 1), "Interview date must be atleast January 01, 1923"),
  mother_middle_name: yup.string().nullable().matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  ad_addrs: yup.string().nullable().matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  ad_ct: yup.string().nullable().matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  zip_code: yup.string().min(4, "Zip Code must be at least 4 character").max(4, "Zip Code must be at most 4 characters").matches(numOnlyRegex, "Zip Code must be number only!").nullable(),
})


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
        <Form @submit="handleDetails" :validation-schema="schema" class="col-lg-9 col-md-12 col-sm-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="col-12">
                        <span class="text-danger">Fields with asterisks(*) are required</span>
                    </div>
                    <div class="mb-3 col-lg-8 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Date of Birth"
                            FieldName="birthdate"
                            ErrorName="birthdate"
                            type="date"
                            v-model:input="date_of_birth"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Case Information"
                        />
                    </div>
        
                    <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="NVC Case Number"
                            type="text"
                            FieldName="nvc_caseNumber"
                            ErrorName="nvc_caseNumber"
                            smallLabel="3-character Consulate Code+10-digit case number (ex. MNL##########)"
                            v-model:input="ci_nvc_number"
                        />
                    </div>
                    <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Confirm NVC Case Number"
                            type="text"
                            FieldName="confirm_nvc_caseNumber"
                            ErrorName="confirm_nvc_caseNumber"
                            smallLabel="Please re-enter your NVC Case Number"
                            v-model:input="ci_nvc_confirm"
                        />
                    </div>
                    <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Visa Preferemce Category"
                            FieldName="visa_category"
                            v-model:input="ci_visa_pref_category"
                            :items="visaCategories"
                        />
                        <!-- <div class="row mt-3">
                            <div class="col-12">
                                <label class="text-capitalize"> Visa Preference Category <b class="text-danger">*</b></label>
                            </div>
                            <div class="col-12 input-group">
                                <select class="form-control form-select w-100" v-model="ci_visa_pref_category" aria-label="Default select example" required>
                                    <option v-for="visaCategory in visaCategories" :key="visaCategory" :value="visaCategory">
                                        {{ visaCategory }}
                                    </option>
                                </select>
                            </div>
                        </div> -->
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <InputField 
                            label="Interview Date"
                            type="date"
                            FieldName="interview_date"
                            ErrorName="interview_date"
                            v-model:input="ci_interview_date"
                            smallLabel="If none, leave blank'"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            label="Interview Source"
                            v-model:input="ci_interview_source"
                            :items="interviewSources"
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
                            type="text"
                            FieldName="last_name"
                            ErrorName="last_name"
                            v-model:input="ad_last_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="First Name"
                            placeholder="First Name"
                            type="text"
                            FieldName="first_name"
                            ErrorName="first_name"
                            v-model:input="ad_first_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            label="Middle Name"
                            placeholder="Middle Name"
                            type="text"
                            FieldName="middle_name"
                            ErrorName="middle_name"
                            v-model:input="ad_middle_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Gender"
                            v-model:input="ad_gender"
                            :items="genderOption"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Civil Status"
                            v-model:input="ad_civil_status"
                            :items="civilStatus"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Country or Nationality"
                            v-model:input="ad_nationality"
                            :items="countries"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Birthplace"
                            placeholder="Birth City"
                            smallLabel="Birth City"
                            type="text"
                            FieldName="birth_city"
                            ErrorName="birth_city"
                            v-model:input="ad_birthplace"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Country"
                            smallLabel="Birth Country"
                            v-model:input="ad_birth_country"
                            :items="countries"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Mother's maiden name"
                            placeholder="Last Name"
                            type="text"
                            FieldName="mother_last_name"
                            ErrorName="mother_last_name"
                            smallLabel="Last Name"
                            v-model:input="ad_mother_last_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <RequiredInputField 
                            inputClassName="mt-2"
                            starClassName="d-none"
                            placeholder="First Name"
                            type="text"
                            FieldName="mother_first_name"
                            ErrorName="mother_first_name"
                            smallLabel="First Name"
                            v-model:input="ad_mother_first_name"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="Middle Name"
                            type="text"
                            smallLabel="Middle Name"
                            v-model:input="ad_mother_middle_name"
                            FieldName="mother_middle_name"
                            ErrorName="mother_middle_name"
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
                            label="PHILIPPINES ADDRESS"
                            placeholder="Building Name and Street Address"
                            type="text"
                            v-model:input="ad_address"
                            FieldName="ad_addrs"
                            ErrorName="ad_addrs"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="City/Town"
                            type="text"
                            v-model:input="ad_city"
                            FieldName="ad_ct"
                            ErrorName="ad_ct"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <SelectField 
                            label="Province"
                            v-model:input="ad_province"
                            :items="philppineProvince"
                        />
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <InputField 
                            placeholder="Zip Code"
                            type="text"
                            v-model:input="ad_zip_code"
                            FieldName="zip_code"
                            ErrorName="zip_code"
                        />
                    </div>
                    <div class="mb-3 mt-5 col-12">
                        <h5 class="text-uppercase">FOR APPLICANTS CURRENTLY LIVING OUTSIDE THE PHILIPPINES:</h5>
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <SelectField 
                            label="Overseas Address"
                            v-model:input="ad_overseas_country"
                            :items="countries"
                        />
                    </div>
                    <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
                        <!-- <InputField 
                            placeholder="Street Address"
                            type="text"
                            v-model:input="ad_overseas_street_address"
                        /> -->
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <!-- <InputField 
                            placeholder="City/Town"
                            type="text"
                            v-model:input="ad_overseas_city"
                        /> -->
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <!-- <InputField 
                            placeholder="Province/State"
                            type="text"
                            v-model:input="ad_overseas_province"
                        /> -->
                    </div>
                    <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
                        <!-- <InputField 
                            placeholder="Zip Code"
                            type="text"
                            v-model:input="ad_overseas_zipcode"
                        /> -->
                    </div>
                    <div class="col-12 mt-3 mb-1"><hr></div>
                    
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Contact Number(s), separate with a slash"
                            placeholder="Contact Number"
                            type="text"
                            FieldName="contact_no"
                            ErrorName="contact_no"
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
                            :items="countries"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Prior Country of Residence"
                            v-model:input="ad_prior_residence"
                            :items="countries"
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
                            type="text"
                            FieldName="passport_number"
                            ErrorName="passport_number"
                            v-model:input="ad_passport_number"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Issued by (Country) "
                            v-model:input="ad_passport_issued_by"
                            :items="countries"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Issue Date"
                            type="date"
                            FieldName="passport_date"
                            ErrorName="passport_date"
                            v-model:input="ad_passport_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Expiration Date"
                            type="date"
                            FieldName="exp_passport_date"
                            ErrorName="exp_passport_date"
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
                            <div class="col-lg-2 col-md-2 col-sm-12 pl-4 input-group">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" v-model="ad_has_been_issued_visa" value="yes" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>     
                            <div class="col-lg-10 col-md-8 col-sm-12 pl-4">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" v-model="ad_has_been_issued_visa" value="no" id="flexRadioDefault2" checked>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    No
                                </label>
                            </div>   
                        </div>
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Issuance Date"
                            type="date"
                            FieldName="issuance_date"
                            ErrorName="issuance_date"
                            v-model:input="ad_issuance_date"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Expiration Date"
                            type="date"
                            FieldName="expiration_date"
                            ErrorName="expiration_date"
                            v-model:input="ad_expiration_date"
                        />
                        
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            label="Previous Medical Examination at SLEC"
                            smallLabel="Month"
                            v-model:input="ad_prev_medical_exam_month"
                            :items="months"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            smallLabel="Year"
                            v-model:input="ad_prev_medical_exam_year"
                            :items="years"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            label="Date of previous Chest X-Ray"
                            smallLabel="Month"
                            v-model:input="ad_prev_xray_month"
                            :items="months"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <SelectField 
                            smallLabel="Year"
                            v-model:input="ad_prev_xray_year"
                            :items="years"
                        />
                    </div>
                    <div class="mt-3 mb-3 col-12">
                        <FormHeader
                            headerText="Petitioner's Information"
                        />
                    </div>
                    <div class="mb-1 col-12">
                        <RequiredInputField 
                            label="Name of Petitioner"
                            placeholder="Enter Full Name"
                            type="text"
                            FieldName="petitioner_name"
                            ErrorName="petitioner_name"
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
                                <input class="form-check-input" type="radio" name="flexRadioDefault" v-model="petitioner_is_alive" value="yes" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Yes
                                </label>
                            </div>     
                            <div class="col-lg-10 col-md-10 col-sm-12 pl-4">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" v-model="petitioner_is_alive" value="no" id="flexRadioDefault2" checked>
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
                            :items="relationship"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="U.S. Address"
                            type="text"
                            FieldName="petitioner_us_street_addr"
                            ErrorName="petitioner_us_street_addr"
                            smallLabel="Street Address"
                            v-model:input="petitioner_us_street_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <!-- <InputField 
                            label="City"
                            type="text"
                            smallLabel="City"
                            v-model:input="petitioner_us_city_addr"
                        /> -->
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="State"
                            v-model:input="petitioner_us_state_addr"
                            :items="states"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Postal Code"
                            placeholder="Enter postal code"
                            type="text"
                            FieldName="petitioner_us_postal_code"
                            ErrorName="petitioner_us_postal_code"
                            v-model:input="petitioner_us_postal_code"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Contact Number"
                            placeholder="Enter postal code"
                            type="text"
                            FieldName="petitioner_contact_no"
                            ErrorName="petitioner_contact_no"
                            v-model:input="petitioner_contact_no"
                        />
                    </div>
                    <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Email Address"
                            placeholder="Enter postal code"
                            type="text"
                            FieldName="petitioner_email_addr"
                            ErrorName="petitioner_email_addr"
                            v-model:input="petitioner_email_addr"
                        />
                    </div>
                    <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Intended Port of Entry"
                            v-model:input="intended_port_of_entry"
                            :items="states"
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
        </Form>
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