<script setup>
    // import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import { useAUIndividualDetails } from '@/store/au-individual-details'
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
    import { ErrorMessage } from 'vee-validate'
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
    const AUIndividualDetails = useAUIndividualDetails()

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
    let hasMedicalExam = true
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
    

    const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
    const nameRegex = /^[\p{L}\p{M}\s-]+$/u;
    const numOnlyRegex = /^[\p{N}]+$/u;
    const contactNumberRegex = /^[\p{N}\p{M}\s+/]+$/u;
    
    
    const handlePrevMedicalExam = () => {
        if(wasFirstMedicalExam.value === 'yes') {
            hasMedicalExam = true

        } else {
            hasMedicalExam = false
        }

    }

    const schema = yup.object().shape({
        subClassKind: yup.string().required('This field is required, please choose an option!'),
        wasFirstMedicalExam: yup.string().required('This field is required, please choose an option!'),
        prevClinicName: yup.string().nullable(),
        prevSubClass: yup.string().nullable(),
        trn: yup.string().required('This field is required!').min(10, 'Minimium of 10 Chararacters').max(25, 'Maximum of 25 characters'),
        passportNumber: yup.string().required('This field is required!').max(13, 'NVC Case Number must be exactly 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^"),
        issuedCountry: yup.string().required('This field is required, please choose an option!'),
        ad_lastName: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^").nullable(),
        ad_firstName: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^").nullable(),
        ad_middleName: yup.string().optional('Middle name is required!').min(2, 'Middle name must be atleast 2 characters').max(25, 'Middle name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^").nullable(),
        mother_lastName: yup.string().required(),
        mother_firstName: yup.string().required(),
        mother_middleName: yup.string().required('Nationality is required!'),
        gender:yup.string().required('Gender is required!'),
        civil_status:yup.string().required('This field is required, please choose an option!').nullable(),
        nationality: yup.string().required('This field is required, please choose an option!').nullable(),
        contactNumber: yup.string().required('Contact number is required!').min(11, 'Contact number must be exactly 11').max(11, 'Contact number must be exactly 11').matches(contactNumberRegex, "Please avoid using letters and special characters ex: abc!@#$%^").nullable(),
        street: yup.string().required('Street is required').min(1, 'Minimmum of 1 character').max(6, 'maximum of 6 characters').nullable(),
        barangay: yup.string().required('Barangay is required').min(5, 'This field must be atleast 5 characters').max(25, 'This field must be at most 25 characters').nullable(),
        city: yup.string().required('City is required').min(5, 'City must be atleast 5 characters').max(25,'This field must be at most 25 characters').nullable(),
        provinceField: yup.string().required('Province is required!').min(4, 'This field atleast 4 characters').max(25, ''),
        postalCode: yup.string().required('Postal code is required!').min(4, 'Postal code must be atleast 4 numbers').max(4, 'Postal code must be atleast 4 numbers').matches(numOnlyRegex, "Postal Code must be number only!"),
        intendedStay: yup.string().required('This field is required, please choose an option!').nullable(),
        intentToWork: yup.string().required('This field is required, please choose an option!').nullable(),
        intentToStay: yup.string().required('This field is required, please choose an option!').nullable(),
        agencyField: yup.string().required('Agency is required!').nullable(),
    })

    
    /**
     * Submit US individual form
     * 
     */
     const handleDetails = (values) => {

        let dob = moment(new Date(dateOfBirth.value)).format('YYYY-MM-DD')
        let isuedDate = moment(new Date(issuedDate.value)).format('YYYY-MM-DD')
      
        const jsonDATA = {
                json_user_id: user_id,
                json_subClassKind: values.subClassKind,
                json_wasFirstMedicalExam: values.wasFirstMedicalExam,
                json_prevClinicName: values.prevClinicName,
                json_prevSubClass: values.prevSubClass,
                json_trn: values.trn,
                json_passportNumber: values.passportNumber,
                json_issuedCountry: values.issuedCountry,
                json_issuedDate: isuedDate,
                json_ad_lastName:values.ad_lastName,
                json_ad_firstName:values.ad_firstName,
                json_ad_middleName:values.ad_middleName,
                json_mother_lastName:values.mother_lastName,
                json_mother_firstName:values.mother_firstName,
                json_mother_middleName:values.mother_middleName,
                json_dateOfBirth: dob,
                json_gender: values.gender,
                json_civil_status: values.civil_status,
                json_nationality: values.nationality,
                json_contactNumber: values.contactNumber,
                json_email: email,
                json_street: values.street,
                json_barangay: values.barangay,
                json_city: values.city,
                json_provinceField: values.provinceField,
                json_postalCode: values.postalCode,
                json_intendedStay: values.intendedStay,
                json_intentToWork: values.intentToWork,
                json_intentToStay: values.intentToStay,
                json_agencyField: values.agencyField,
        }

        let res = JSON.stringify(jsonDATA)
       

        AUIndividualDetails.setAUIndividualDetails(res)

        router.push('/individual/au/preview')

    }

    


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
                    <div class="col-lg-8 col-md-12 col-sm-12 mb-3">
                        <RequiredSelectField 
                            label="What subclass did you apply for?"
                            FieldName="subClassKind"
                            ErrorName="subClassKind"
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
                     <div class="col-12">
                        <ErrorMessage name="wasFirstMedicalExam" class="text-danger"/>
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
                            <div class="row">
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
                             <div class="col-12 pb-3">
                                <ErrorMessage name="gender" class="text-danger"/>
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
                            <div class="row">
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
                            <div class="col-12 pb-3">
                                <ErrorMessage name="intendedStay" class="text-danger"/>
                            </div>
                            <li>Do you intent to work as, or study to be, a doctor, dentist, nurse or paramedic during your stay in Australia? </li>
                            <div class="row">
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
                            <div class="col-12 pb-3">
                                <ErrorMessage name="intentToWork" class="text-danger"/>
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
                            <div class="col-12 pb-3">
                                <ErrorMessage name="intentToStay" class="text-danger"/>
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
