<script setup>
    // import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import { useUSIndividualDetails } from '@/store/us-individual-details'
    import { Form } from 'vee-validate'
    // import CalloutDanger from '@/components/global/CalloutDanger.vue'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    // import SubFormHeader from '@/components/global/SubFormHeader.vue'
    import DateField from '@/components/global/DateField.vue'
    import RequiredInputField from '@/components/global/RequiredInputField.vue'
    import RequiredSelectField from '@/components/global/RequiredSelectField.vue'
    // import RequiredRadioButton from '@/components/global/RequiredRadioButton.vue'
    import SelectField from '@/components/global/SelectField.vue'
    import InputField from '@/components/global/InputField.vue'
    import RadioButton from '@/components/global/RadioButtton.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import Swal from '@/sweetalert2'
    // import { Field, ErrorMessage } from 'vee-validate'
    import moment from 'moment'
    import * as yup from 'yup';

    // import { ucwords } from '../../../assets/js/string_functions'

    // ================= Select Option Array ===================== //
    // import interviewSources from '@/assets/js/arrays/interviev_source_array'
    // import visaCategories from '@/assets/js/arrays/visa_categories_array'
    // import genderOption from '@/assets/js/arrays/gender_array'
    import civilStatus from '@/assets/js/arrays/civil_status_array'
    import countries from '@/assets/js/arrays/countries_array'
    // import philppineProvince from '@/assets/js/arrays/phil_province_array'
    // import months from '@/assets/js/arrays/month_array'
    import years from '@/assets/js/arrays/year_list_array'
    // import relationship from '@/assets/js/arrays/relationship_array'
    // import states from '@/assets/js/arrays/states_array'
    // import vaccine from '@/assets/js/arrays/vaccine_list_array'
    import subClass from '@/assets/js/arrays/subclass_array'
    // import YearList from '@/assets/js/arrays/year_list_array'
    import province from '@/assets/js/arrays/province_array'
    import agency from '@/assets/js/arrays/agency_array'
    

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
    let user_id = profileStore.id
    let textSuccess = "text-success"
    let textSuccess1 = "text-success"
    let firstDose = ref(null)
    let secondDose = ref(null)
    let hasMedicalExam = true
    let first_dose_booster = ref(null)
    let second_dose_booster = ref(null)
    let date_of_birth = ref(null)
    let ci_intervue_date = ref(null)
    let add_passport_date = ref(null)
    let add_passport_expiration_date = ref(null)
    let add_issuance_date = ref(null)
    let add_expiration_date = ref(null)

    let subClassKind = ref(null)
    let wasFirstMedicalExam = ref(null)
    let prevClinicName = ref(null)
    let prevSubClass = ref(null)
    let trn = ref(null)
    let passportNumber = ref(null)
    let issuedCountry = ref(null)
    let issuedDate = ref(null)
    let ad_lastName = ref(null)
    let ad_firstName = ref(null)
    let ad_middleName = ref(null)
    let mother_lastName = ref(null)
    let mother_firstName = ref(null)
    let mother_middleName = ref(null)
    let dateOfBirth = ref(null)
    let gender = ref(null)
    let civil_status = ref(null)
    let nationality = ref(null)
    let contactNumber = ref(null)
    let street = ref(null)
    let barangay = ref(null)
    let city = ref(null)
    let provinceField = ref(null)
    let postalCode = ref(null)
    let intendedStay = ref(null)
    let intentToWork = ref(null)
    let intentToStay = ref(null)
    let agencyField = ref(null)
    
    
    const handlePrevMedicalExam = () => {
        if(wasFirstMedicalExam.value === 'yes') {
            hasMedicalExam = true

        } else {
            hasMedicalExam = false
        }

    }

    
    /**
     * Submit US individual form
     * 
     */
     const handleDetails = (values) => {
        let birthDate = moment(new Date(date_of_birth.value)).format('YYYY-MM-DD')
        let first_dose = moment(new Date(firstDose.value)).format('YYYY-MM-DD')
        let second_dose = moment(new Date(secondDose.value)).format('YYYY-MM-DD')
        let first_doseBooster = moment(new Date(first_dose_booster.value)).format('YYYY-MM-DD')
        let second_doseBooster = moment(new Date(second_dose_booster.value)).format('YYYY-MM-DD')
        let ci_interview_date = moment(new Date(ci_intervue_date.value)).format('YYYY-MM-DD')
        let ad_passport_date = moment(new Date(add_passport_date.value)).format('YYYY-MM-DD')
        let ad_passport_expiration_date = moment(new Date(add_passport_expiration_date.value)).format('YYYY-MM-DD')
        let ad_issuance_date = moment(new Date(add_issuance_date.value)).format('YYYY-MM-DD')
        let ad_expiration_date = moment(new Date(add_expiration_date.value)).format('YYYY-MM-DD')
        
        const jsonDATA = {
                json_user_id: user_id,
                json_date_of_birth: birthDate,
                json_covid_vaccine_priority: values.covid_vaccine_priority,
                json_covid_vaccine_received: values.vaccine_received,
                json_cv_brand_name: values.cv_brand_name,
                json_firstDose: first_dose,
                json_secondDose: second_dose,
                json_cv_booster1: values.cv_booster1,
                json_first_doseBooster: first_doseBooster,
                json_cv_booster2: values.cv_booster2,
                json_second_doseBooster: second_doseBooster,
                json_ci_nvc_number: values.ci_nvc_number,
                json_ci_nvc_confirm: values.ci_nvc_confirm,
                json_ci_visa_pref_category: values.ci_visa_pref_category,
                json_ci_interview_date: ci_interview_date,
                json_ci_interview_source: values.ci_interview_source,
                json_ad_last_name: values.ad_last_name,
                json_ad_first_name: values.ad_first_name,
                json_ad_middle_name: values.ad_middle_name,
                json_ad_gender: values.ad_gender,
                json_ad_civil_status: values.ad_civil_status,
                json_ad_nationality: values.ad_nationality,
                json_ad_birthplace: values.ad_birthplace,
                json_ad_birth_country: values.ad_birth_country,
                json_ad_mother_last_name: values.ad_mother_last_name,
                json_ad_mother_first_name: values.ad_mother_first_name,
                json_ad_mother_middle_name: values.ad_mother_middle_name,
                json_ad_address: values.ad_address,
                json_ad_city: values.ad_city,
                json_ad_province: values.ad_province,
                json_ad_zip_code: values.ad_zip_code,
                json_ad_overseas_country: values.ad_overseas_country,
                json_ad_overseas_street_address: values.ad_overseas_street_address,
                json_ad_overseas_city: values.ad_overseas_city,
                json_ad_overseas_province: values.ad_overseas_province,
                json_ad_overseas_zipcode: values.ad_overseas_zipcode,
                json_ad_contact_numbers: values.ad_contact_numbers,
                json_ad_email_add: email,
                json_ad_present_residence: values.ad_present_residence,
                json_ad_prior_residence: values.ad_prior_residence,
                json_ad_passport_number: values.ad_passport_number,
                json_ad_passport_issued_by: values.ad_passport_issued_by,
                json_ad_passport_date: ad_passport_date,
                json_ad_passport_expiration_date: ad_passport_expiration_date,
                json_ad_has_been_issued_visa: values.ad_has_been_issued_visa,
                json_ad_issuance_date: ad_issuance_date,
                json_ad_expiration_date: ad_expiration_date,
                json_ad_prev_medical_exam_month: values.ad_prev_medical_exam_month,
                json_ad_prev_medical_exam_year: values.ad_prev_medical_exam_year,
                json_ad_prev_xray_month: values.ad_prev_xray_month,
                json_ad_prev_xray_year: values.ad_prev_xray_year,
                json_petitioner_fullname: values.petitioner_fullname,
                json_petitioner_is_alive: values.petitioner_is_alive,
                json_petitioner_relationship: values.petitioner_relationship,
                json_petitioner_us_street_addr: values.petitioner_us_street_addr,
                json_petitioner_us_city_addr: values.petitioner_us_city_addr,
                json_petitioner_us_state_addr: values.petitioner_us_state_addr,
                json_petitioner_us_postal_code: values.petitioner_us_postal_code,
                json_petitioner_contact_no: values.petitioner_contact_no,
                json_petitioner_email_addr: values.petitioner_email_addr,
                json_intended_port_of_entry: values.intended_port_of_entry
        }

        let res = JSON.stringify(jsonDATA)

        USIndividualDetails.setUSIndividualDetails(res)
        router.push('/individual/us/preview')

    }

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

    const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
    const nameRegex = /^[\p{L}\p{M}\s-]+$/u;
    const numOnlyRegex = /^[\p{N}]+$/u;
    const contactNumberRegex = /^[\p{N}\p{M}\s+/]+$/u;

    const schema = yup.object().shape({
        covid_vaccine_priority: yup.string().required('This field is required, please choose an option!'),
        vaccine_receive: yup.string().required('This field is required, please choose an option!'),
        cv_brand_name: yup.string().required('Please choose vaccine brand name'),
        cv_booster1: yup.string(),
        cv_booster2: yup.string(),
        ci_nvc_number: yup.string().required('NVC Case Number is required!').min(13, 'NVC Case Number must be exactly 13 characters').max(13, 'NVC Case Number must be exactly 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^"),
        ci_nvc_confirm: yup.string().required('NVC Case Number is required!').min(13, 'NVC Case Number must be exactly 13 characters').max(13, 'NVC Case Number must be exactly 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^").oneOf([yup.ref('ci_nvc_number')], 'NVC Case Number do not match'),
        // ci_interview_date: yup.string().nullable().min(new Date(1925, 0, 1), "Interview date must be atleast January 01, 1923"),
        ci_visa_pref_category: yup.string().required('Interview date is required!'),
        ci_interview_source: yup.string().nullable(),
        ad_last_name: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_first_name: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_middle_name: yup.string().nullable().optional(),
        ad_gender: yup.string().required('Gender is required!'),
        ad_civil_status: yup.string().required('Civil status is required!'),
        ad_nationality: yup.string().required('Nationality is required!'),
        ad_birthplace:yup.string().required('Birthplace is required!').min(2, 'Birthplace must be atleast 4 characters').max(25, 'Birthplace must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_birth_country:yup.string().required('Birth country is required!').min(4, 'Birth country must be atleast 4 characters').max(25, 'Birth country must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_mother_last_name: yup.string().required('Last name is required!').min(4, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_mother_first_name: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_mother_middle_name: yup.string().nullable().optional(),
        ad_address: yup.string().nullable().optional().min(5, 'Address must be atleast 5 characters'),
        ad_city: yup.string().nullable().optional().min(5, 'City must be atleast 5 characters'),
        ad_province: yup.string().nullable().optional(),
        ad_zip_code: yup.string().nullable().optional().min(4, 'Zip code must be exactly 4 numbers').max(4, 'Zip code must be exactly 4 numbers').matches(numOnlyRegex, "Zip Code must be number only!"),
        ad_overseas_country: yup.string().nullable().optional(),
        ad_overseas_street_address: yup.string().nullable().optional().min(5, 'Street address must be atleast 5 characters'),
        ad_overseas_city: yup.string().nullable().optional().min(5, 'City must be atleast 5 characters'),
        ad_overseas_province: yup.string().nullable().optional().min(5, 'Province must be atleast 5 characters'),
        ad_overseas_zipcode: yup.string().nullable().optional().min(5, 'Zip code must be exactly 5 characters').max(5, 'Zip code must be exactly 5 numbers').matches(numOnlyRegex, "Zip Code must be number only!"),
        ad_contact_numbers: yup.string().required('Contact number is required!').min(7, 'Contact number must be atleast 7 characters').max(39, 'Contact number at most 39 characters').matches(contactNumberRegex, "Please avoid using letters and special characters ex: abc!@#$%^"),
        ad_present_residence: yup.string().required('Present residence is required!'),
        ad_prior_residence: yup.string().required('Prior residence is required!'),
        ad_passport_number: yup.string().required('Passport number is required!').min(9, "Passport number must be at least 9 characters").max(10, "Passport number must be at most 10 characters"),
        ad_passport_issued_by: yup.string().required('Passport issued by is required!'),
        // ad_passport_date: yup.date().required('Passport date is required!').min(new Date(1925, 0, 1), "Passport must be atleast January 01, 1923").max(new Date(), "Invalid date"),
        // ad_passport_expiration_date: yup.date().required('Passport expiration date is required!').min(yup.ref('ad_passport_date'), 'Expiration date must not be less than the issuance date').notOneOf([yup.ref('ad_passport_date')], 'Expiration date must not be equal to the issuance date'),
        ad_has_been_issued_visa: yup.string().required("This field is required, please choose an option"),
        // ad_issuance_date: yup.date().required("Issuance date is required").min(new Date(1925, 0, 1), "Passport must be atleast January 01, 1923").max(new Date(), "Invalid date"),
        // ad_expiration_date: yup.date().required("Expiration date is required").min(yup.ref('ad_issuance_date'), 'Expiration date must not be less than the issuance date').notOneOf([yup.ref('ad_issuance_date')], 'Expiration date must not be equal to the issuance date'),
        ad_prev_medical_exam_month: yup.string().nullable().optional(),
        ad_prev_medical_exam_year: yup.string().nullable().optional(),
        ad_prev_xray_month: yup.string().nullable().optional(),
        ad_prev_xray_year: yup.string().nullable().optional(),
        petitioner_fullname: yup.string().required("Petitioner name is required").min(6, "Petitioner name must be atleast 6 characters").max(50, "Petitioner name must be at most 50 characters").matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        petitioner_is_alive: yup.string().required("This field is required, please choose an option"),
        petitioner_relationship: yup.string().required("Petitioner relationship is required!"),
        petitioner_us_street_addr: yup.string().required("Street address is required!").min(5, "Street Address must be atleast 5 characters").max(100, "Street Address must be most 100 characters"),
        petitioner_us_city_addr: yup.string().required("City is required!").min(5, "City must be atleast 5 characters").max(25, "City must be most 25 characters").matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        petitioner_us_state_addr: yup.string().required("State is required!"),
        petitioner_us_postal_code: yup.string().required("Postal code is required!").min(5, 'Postal code must be exactly 5 numbers').max(5, 'Postal code must be exactly 5 numbers').matches(numOnlyRegex, "Postal Code must be number only!"),
        petitioner_contact_no: yup.string().required("Petitioner contact no. is required!").min(11, 'Contact number must be atleast 11 characters').max(11, 'Contact number must be at most 11 characters').matches(contactNumberRegex, "Please avoid using letters and special characters ex: abc!@#$%^"),
        petitioner_email_addr: yup.string().required("Petitioner email address is required!").min(10, "Email must be atleast 10 characters").max(30, "Email must be at most 30 characters").email("Enter a valid email"),
        intended_port_of_entry: yup.string().required("Port of entry is required!"),
    })


    // Get the current year
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDay = new Date().getDate()

    let currentDate = currentYear+", "+currentMonth+", "+currentDay;

    // =========== Inline Date ==================== //
    const disableBirthdayState = {
        // months start's to 0(January) - 11(December) 
        disabledDates: {
            to: new Date(years[99], currentMonth, currentDay),
            from: new Date(currentDate),

        }
    }

    // const disableFutureDateState = {
    //     // months start's to 0(January) - 11(December) 
    //     disabledDates: {
    //         to: new Date(years[99], currentMonth, currentDay),
    //         from: new Date(currentYear, new Date().getMonth(), currentDay + 1),
    //     }
    // }
    // const disablePastDateState = {
    //     // months start's to 0(January) - 11(December) 
    //     disabledDates: {
    //         to: new Date(currentYear, new Date().getMonth(), currentDay),
    //         from: new Date(currentYear + 99, new Date().getMonth(), currentDay + 1),
    //     }
    // }
    // ============ Inline End =================== //

   

</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >Australia Online Registration {{ isVaccinated }} </h1>
        </div>
        <div class="col-lg-3 col-md-12 col-sm-12">
            <SideNav 
                :className="textSuccess ? textSuccess : 'text-secondary'"
                :className1="textSuccess1 ? textSuccess1 : 'text-secondary'"
            />
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->
        
        <Form @submit="handleDetails" :validation-schema="schema"  class="col-lg-9 col-md-12 col-sm-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="col-12">
                        <span class="text-danger">Fields with asterisks(*) are required</span>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="What subclass did you apply for?"
                            FieldName="subClassKind"
                            ErrorName="subClassKind"
                            className="mb-5 w-75"
                            v-model:input="subClassKind"
                            :items="subClass"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <strong>Is this your first medical examination for the Australian Embassy?</strong>
                    </div>
                    <div class=" col-lg-3 col-md-4 col-sm-12 examRadioLeft">
                        <RadioButton 
                                RadioLabel="Yes"
                                RadioLabelClass="font-weight-normal"
                                RadioBtnName="wasFirstMedicalExam"
                                RadioValue="yes"
                                v-model:input="wasFirstMedicalExam"
                                :onChange="handlePrevMedicalExam"
                        />
                        <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="yes" /><label for="">Yes</label> -->
                    </div>
                    <div class="col-lg-9 col-md-8 col-sm-12 examRadioRight">
                        <RadioButton 
                                RadioLabel="No"
                                RadioLabelClass="font-weight-normal"
                                RadioBtnName="wasFirstMedicalExam"
                                RadioValue="no"
                                v-model:input="wasFirstMedicalExam"
                                :onChange="handlePrevMedicalExam"
                        />
                        <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="no" /><label for="">No</label> -->
                    </div>
                    <div class="col-12 pl-5" :hidden="hasMedicalExam">
                        <div class="row">
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <InputField 
                                    label="Name of Clinic and Year of Visa Medical Examination"
                                    type="text"
                                    FieldName="prevClinicName"
                                    ErrorName="prevClinicName"
                                    v-model:input="prevClinicName"
                                />
                            </div>
                            <div class="col-lg-8 col-md-12 col-sm-12 pb-3">
                                    <SelectField 
                                        label="What subclass did you apply for?"
                                        FieldName="prevSubClass"
                                        ErrorName="prevSubClass"
                                        v-model:input="prevSubClass"
                                        :items="subClass"
                                    />
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="TRN/HAP I.D."
                            type="text"
                            FieldName="trn"
                            ErrorName="trn"
                            v-model:input="trn"
                        />
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <InputField 
                            label="Passport Number"
                            type="text"
                            FieldName="passportNumber"
                            ErrorName="passportNumber"
                            v-model:input="passportNumber"
                        />
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <SelectField 
                            label="Country of Issue"
                            FieldName="issuedCountry"
                            ErrorName="issuedCountry"
                            v-model:input="issuedCountry"
                            :items="countries"
                        />
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12 pb-3">
                        <DateField 
                            label="Date of Issue"
                            placeholder="Date Received"
                            :disabledDate="disableBirthdayState.disabledDates"
                            v-model:input="issuedDate"
                            :onChange="showBooster1"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="APPLICANT DETAILS"
                        />
                    </div>
                    <div class="col-12">
                        <ol class="applicant_detail_list">
                            <li>Applicant's Name</li>
                            <div class="row pb-3">
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <InputField 
                                        label="Last Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="ad_lastName"
                                        ErrorName="ad_lastName"
                                        v-model:input="ad_lastName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <InputField 
                                        label="First Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="ad_firstName"
                                        ErrorName="ad_firstName"
                                        v-model:input="ad_firstName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <InputField 
                                        label="Middle Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="ad_middleName"
                                        ErrorName="ad_middleName"
                                        v-model:input="ad_middleName"
                                    />
                                </div>
                            </div>
                            <li>Mother's Maiden Name (Last Name, First Name, Middle Name)</li>
                            <div class="row pb-3">
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <InputField 
                                        label="Last Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="mother_lastName"
                                        ErrorName="mother_lastName"
                                        v-model:input="mother_lastName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <InputField 
                                        label="First Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="mother_firstName"
                                        ErrorName="mother_firstName"
                                        v-model:input="mother_firstName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <InputField 
                                        label="Middle Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="mother_middleName"
                                        ErrorName="mother_middleName"
                                        v-model:input="mother_middleName"
                                    />
                                </div>
                            </div>
                            <li>Applicant's Date of Birth</li>
                            <div class="row pb-3">
                                <div class="col-12">
                                    <DateField 
                                        requiredClass="d-none dateField"
                                        placeholder="Date of Birth"
                                        :disabledDate="disableBirthdayState.disabledDates"
                                        v-model:input="dateOfBirth"
                                        :onChange="showBooster1"
                                    />
                                </div>
                            </div>
                            <li>Gender </li>
                            <div class="row pb-3">
                                <div class=" col-lg-3 col-md-4 col-sm-12 examRadioLeft">
                                    <RadioButton 
                                            RadioLabel="Male"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="gender"
                                            RadioValue="male"
                                            v-model:input="gender"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="yes" /><label for="">Yes</label> -->
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12 examRadioRight">
                                    <RadioButton 
                                            RadioLabel="Female"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="gender"
                                            RadioValue="female"
                                            v-model:input="gender"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="no" /><label for="">No</label> -->
                                </div>
                            </div>
                            <li>Civil Status </li>
                            <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <SelectField 
                                        className="civil_stat_select"
                                        FieldName="civil_status"
                                        ErrorName="civil_status"
                                        v-model:input="civil_status"
                                        :items="civilStatus"
                                    />
                                </div>
                            </div>
                            <li>Country of Nationality</li>
                            <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <SelectField 
                                        className="nationality_select"
                                        FieldName="nationality"
                                        ErrorName="nationality"
                                        v-model:input="nationality"
                                        :items="countries"
                                    />
                                </div>
                            </div>
                            <li>Contact Number</li>
                            <div class="row pb-3">
                                <div class="col-12">
                                    <InputField 
                                        inputClassName="contact_num"
                                        type="text"
                                        FieldName="contactNumber"
                                        ErrorName="contactNumber"
                                        v-model:input="contactNumber"
                                    />
                                </div>
                            </div>
                            <li>Email Address</li>
                            <div class="row"><div class="col-12"><p>{{ email }}</p></div></div>
                            <li>Residential Address</li>
                            <div class="row pb-3">
                                <div class="col-lg-6 col-md-12 col-sm-12">
                                    <RequiredInputField 
                                        labelClassName="font-weight-normal"
                                        label="House No./Street"
                                        type="text"
                                        FieldName="street"
                                        ErrorName="street"
                                        v-model:input="street"
                                    />
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12">
                                    <RequiredInputField 
                                        labelClassName="font-weight-normal"
                                        label="Barangay"
                                        type="text"
                                        FieldName="barangay"
                                        ErrorName="barangay"
                                        v-model:input="barangay"
                                    />
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12">
                                    <RequiredInputField 
                                        labelClassName="font-weight-normal"
                                        label="City"
                                        type="text"
                                        FieldName="city"
                                        ErrorName="city"
                                        v-model:input="city"
                                    />
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12">
                                    <RequiredSelectField 
                                        labelClassName="font-weight-normal"
                                        label="Province"
                                        FieldName="provinceField"
                                        ErrorName="provinceField"
                                        v-model:input="provinceField"
                                        :items="province"
                                    />
                                </div>
                                <div class="col-lg-6 col-md-12 col-sm-12">
                                    <RequiredInputField 
                                        labelClassName="font-weight-normal"
                                        label="Postal Code"
                                        type="text"
                                        FieldName="postalCode"
                                        ErrorName="postalCode"
                                        v-model:input="postalCode"
                                    />
                                </div>
                                
                            </div>
                            <li>How long do you intend staying in Australia? </li>
                            <div class="row pb-3">
                                <div class=" col-lg-3 col-md-4 col-sm-12 examRadioLeft">
                                    <RadioButton 
                                            RadioLabel="Temporary"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="intendedStay"
                                            RadioValue="temporary"
                                            v-model:input="intendedStay"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="yes" /><label for="">Yes</label> -->
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12 examRadioRight">
                                    <RadioButton 
                                            RadioLabel="Permanent"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="intendedStay"
                                            RadioValue="permanent"
                                            v-model:input="intendedStay"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="no" /><label for="">No</label> -->
                                </div>
                            </div>
                            <li>Do you intent to work as, or study to be, a doctor, dentist, nurse or paramedic during your stay in Australia? </li>
                            <div class="row pb-3">
                                <div class=" col-lg-3 col-md-4 col-sm-12 examRadioLeft">
                                    <RadioButton 
                                            RadioLabel="Yes"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="intentToWork"
                                            RadioValue="yes"
                                            v-model:input="intentToWork"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="yes" /><label for="">Yes</label> -->
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12 examRadioRight">
                                    <RadioButton 
                                            RadioLabel="No"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="intentToWork"
                                            RadioValue="no"
                                            v-model:input="intentToWork"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="no" /><label for="">No</label> -->
                                </div>
                            </div>
                            <li>For Temporary Visa: Do you intend to apply for a permanent stay in Australia within the next 6-12 months?</li>
                            <div class="row pb-3">
                                <div class=" col-lg-3 col-md-4 col-sm-12 examRadioLeft">
                                    <RadioButton 
                                            RadioLabel="Yes"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="intentToStay"
                                            RadioValue="yes"
                                            v-model:input="intentToStay"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="yes" /><label for="">Yes</label> -->
                                </div>
                                <div class="col-lg-9 col-md-8 col-sm-12 examRadioRight">
                                    <RadioButton 
                                            RadioLabel="No"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="intentToStay"
                                            RadioValue="no"
                                            v-model:input="intentToStay"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="no" /><label for="">No</label> -->
                                </div>
                            </div>
                            <li>Agency?</li>
                            <div class="row">
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <SelectField 
                                        labelClassName="font-weight-normal"
                                        FieldName="agencyField"
                                        ErrorName="agencyField"
                                        className="agency_select mb-5 w-75"
                                        v-model:input="agencyField"
                                        :items="agency"
                                    />
                                </div>
                            </div>
                        </ol>
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
            </div>
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

.covid_category  li { 
    list-style: none;
}

.inputDate {
    width: 100%;
}
.irc_div {
    background: #f1f1f1;
}
.cell.day.selected{
    background: green !important;
}
.examRadioLeft, .examRadioRight {
    padding-left: 20px !important;
}
.applicant_detail_list li {
    font-weight: bold;
    font-size: 17px;
}
.civil_stat_select {
    margin-top: -25px;
    padding-bottom: 10px;
}
.nationality_select {
    margin-top: -25px;
    padding-bottom: 10px;
}
.contact_num {
    margin-top: -25px;
    padding-bottom: 10px;
}
.agency_select {
    margin-top: -25px;
    padding-bottom: 10px;
}
.dateField {
    margin-top: -35px;
    padding-bottom: 10px;
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
    .examRadioLeft {
        padding-left: 30px !important;
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
    .examRadioLeft {
        padding-left: 30px !important;
    }
}
</style>
