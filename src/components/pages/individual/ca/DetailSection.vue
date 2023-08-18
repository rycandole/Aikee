<script setup>
    import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { defineExpose } from  "vue";
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import { useCAIndividualSched } from '@/store/ca-individual-sched'
    import { useCAIndividualDetails } from '@/store/ca-individual-details'
    import { Form } from 'vee-validate'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import DateField from '@/components/global/DateField.vue'
    import RequiredInputField from '@/components/global/RequiredInputField.vue'
    import RequiredSelectField from '@/components/global/RequiredSelectField.vue'
    import SelectField from '@/components/global/SelectField.vue'
    import InputField from '@/components/global/InputField.vue'
    import RadioButton from '@/components/global/RadioButtton.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import CheckBox from '@/components/global/CheckBox.vue'
    import Swal from '@/sweetalert2'
    import { Field, ErrorMessage } from 'vee-validate'
    import moment from 'moment'
    import * as yup from 'yup';

    // import { ucwords } from '../../../assets/js/string_functions'

    // ================= Select Option Array ===================== //
    import civilStatus from '@/assets/js/arrays/civil_status_array'
    import countries from '@/assets/js/arrays/countries_array'
    import years from '@/assets/js/arrays/year_list_array'
    import province from '@/assets/js/arrays/province_array'
    import agency from '@/assets/js/arrays/agency_array'
    import visaCategory from '@/assets/js/arrays/visa_category_array'
    

    const router = useRouter()
    const profileStore = useProfileStore()
    const CA_IndividualSched = useCAIndividualSched()
    const CAIndividualDetails = useCAIndividualDetails()
    const details = JSON.parse(localStorage.getItem('ca-individual-details'))

    let email = profileStore.email
    let user_id = profileStore.id
    let textSuccess = "text-success"
    let textSuccess1 = "text-success"
    let hasMedicalExam = true
    let is_first_med_exam = true
    let has_alias =  true
    let wasFirstMedicalExam = ref(null)
    let prevClinicName = ref(null)
    let passportNumber = ref(null)
    let issuedCountry = ref(null)
    let issuedDate = ref(null)
    let ad_lastName = ref(null)
    let ad_firstName = ref(null)
    let ad_middleName = ref(null)
    let mother_lastName = ref(null)
    let mother_firstName = ref(null)
    let mother_middleName = ref(null)
    let date_of_birth = ref(null)
    let validate_date_of_birth = ref(null)
    let gender = ref(null)
    let civil_status = ref(null)
    let nationality = ref(null)
    let contactNumber = ref(null)
    let street = ref(null)
    let barangay = ref(null)
    let city = ref(null)
    let provinceField = ref(null)
    let postalCode = ref(null)
    let prevCategory = ref(null)
    let alias_lastName = ref(null)
    let alias_firstName = ref(null)
    let alias_middleName = ref(null)
    let applicantCategory = ref(null)
    let fileNumber = ref(null)
    let agencyField = ref(null)
    let errors = ref([])
    let inputName = ref(null)
    let inputError = ref(null)

    let check_alias = ref(null)
    let isButtonDisabled = true
    
    // const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
    const nameRegex = /^[\p{L}\p{M}\s-]+$/u;
    const numOnlyRegex = /^[\p{N}]+$/u;
    const contactNumberRegex = /^[\p{N}\p{M}\s+/]+$/u;

     /**
     * For Fetching user data
     */
     onMounted(async () => {
        // await profileStore.fetchProfileById(router.params.id)
        wasFirstMedicalExam.value = details.wasFirstMedicalExam || ''
        prevCategory.value = details.prevCategory || ''
        issuedCountry.value = details.issuedCountry || ''
        passportNumber.value = details.passportNumber || ''
        issuedDate.value = details.issuedDate || ''
        ad_lastName.value = details.ad_lastName || ''
        ad_firstName.value = details.ad_firstName || ''
        ad_middleName.value = details.ad_middleName || ''
        mother_lastName.value = details.mother_lastName || ''
        mother_firstName.value = details.mother_firstName || ''
        mother_middleName.value = details.mother_middleName || ''
        date_of_birth.value = details.dob || ''
        validate_date_of_birth.value = details.dob || ''
        gender.value = details.gender || ''
        civil_status.value = details.civil_status || ''
        nationality.value = details.nationality || ''
        contactNumber.value = details.contactNumber || ''
        street.value = details.street || ''
        barangay.value = details.barangay || ''
        city.value = details.city || ''
        provinceField.value = details.provinceField || ''
        postalCode.value = details.postalCode || ''
        check_alias.value = details.check_alias || ''
        alias_lastName.value = details.alias_lastName || ''
        alias_firstName.value = details.alias_firstName || ''
        alias_middleName.value = details.alias_middleName || ''
        applicantCategory.value = details.applicantCategory || ''
        fileNumber.value = details.fileNumber || ''
        agencyField.value = details.agencyField || ''

        wasFirstMedicalExam.value == 'N' ? hasMedicalExam = false : hasMedicalExam = true
        wasFirstMedicalExam.value === 'Y' ? prevClinicName.value = "" : prevClinicName.value = details.prevClinicName
        wasFirstMedicalExam.value === 'Y' ? prevCategory.value = "" : prevCategory.value = details.prevCategory
        check_alias.value === 'checked' ? isButtonDisabled = false : isButtonDisabled = true
        check_alias.value === 'checked' ? alias_lastName.value = details.alias_lastName : alias_lastName.value = ""
        check_alias.value === 'checked' ? alias_firstName.value = details.alias_firstName : alias_firstName.value = ""
        check_alias.value === 'checked' ? alias_middleName.value = details.alias_middleName : alias_middleName.value = ""
    })
    
    
    const handlePrevMedicalExam = () => {
        if(wasFirstMedicalExam.value === 'Y') {
            hasMedicalExam = true
            prevClinicName.value = ""
            prevCategory.value = ""
            is_first_med_exam = true
        } else {
            hasMedicalExam = false
            is_first_med_exam = false
        }
    }

    const hasAlias = () => {
        if(check_alias.value == 'checked') {
            isButtonDisabled = false
            has_alias = false
        } else {
            isButtonDisabled = true
            alias_lastName.value = ""
            alias_firstName.value = ""
            alias_middleName.value = ""
            has_alias = true
        }
    }

    const alertChange = () => {
        validate_date_of_birth.value = new Date(date_of_birth.value);
    }

    const schema = yup.object().shape({
        wasFirstMedicalExam: yup.string().required('This field is required, please choose an option!'),
        is_first_med_exam:yup.string(),
        prevClinicName: yup.string().when('is_first_med_exam', {
            is: 'false',
            then: (schema) => schema.required('Previous clinic name required!'),
            otherwise: (schema) => schema.nullable()
        }),
        prevCategory: yup.string().when('is_first_med_exam', {
            is: 'false',
            then: (schema) => schema.required('Previous category name required!'),
            otherwise: (schema) => schema.nullable()
        }),
        // passportNumber: yup.string().nullable().max(13, 'NVC Case Number must be exactly 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^"),
        issuedCountry: yup.string().nullable(),
        ad_lastName: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_firstName: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_middleName: yup.string().optional('Middle name is required!').min(2, 'Middle name must be atleast 2 characters').max(25, 'Middle name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^").nullable(),
        has_alias: yup.string(),
        alias_lastName: yup.string().when('has_alias', {
            is: 'false',
            then: (schema) => schema.required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(30, 'Last name must be at most 30 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
            otherwise: (schema) => schema.nullable()
        }),
        alias_firstName: yup.string().when('has_alias', {
            is: 'false',
            then: (schema) => schema.required('First name is required!').min(2, 'First name must be atleast 2 characters').max(30, 'First name must be at most 30 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
            otherwise: (schema) => schema.nullable()
        }),
        // alias_middleName: yup.string().max(25, 'Middle name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^").nullable(),
        mother_lastName: yup.string().required('Mother Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        mother_firstName: yup.string().required('Mother First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        mother_middleName: yup.string().optional().nullable(),
        validate_date_of_birth: yup.string().required("Date of Birth is Required!"),
        gender:yup.string().required('Gender is required!'),
        civil_status:yup.string().required('This field is required, please choose from options!'),
        nationality: yup.string().required('This field is required, please choose from options!'),
        contactNumber: yup.string().required('Contact number is required!').min(11, 'Contact number must be exactly 11').max(11, 'Contact number must be exactly 11').matches(contactNumberRegex, "Please avoid using letters and special characters ex: abc!@#$%^"),
        street: yup.string().required('Street is required').min(2, 'Minimmum of 2 character').max(20, 'maximum of 20 characters'),
        barangay: yup.string().required('Barangay is required').min(5, 'This field must be atleast 5 characters').max(25, 'This field must be at most 25 characters'),
        city: yup.string().required('City is required').min(5, 'City must be atleast 5 characters').max(25,'This field must be at most 25 characters'),
        provinceField: yup.string().required('Province is required!').min(4, 'This field atleast 4 characters').max(25, 'This field must be at most 25 characters'),
        postalCode: yup.string().required('Postal code is required!').min(4, 'Postal code must be atleast 4 numbers').max(4, 'Postal code must be atleast 4 numbers').matches(numOnlyRegex, "Postal Code must be number only!"),
        applicantCategory: yup.string().required('This field is required, please choose an options'),
        fileNumber: yup.string().required('File Number / IME is required!').min(2, 'File Number / IME must be atleast 2 characters').max(25,'File Number / IME must be at most 25 characters'),
        agencyField: yup.string().required("This field is required, please choose from options"),
    })

    
    /**
     * Submit US individual form
     * 
     */
     const handleDetails = async (values) => {

        errors.value = []

        let dob = moment(new Date(date_of_birth.value)).format('YYYY-MM-DD')
        let isuedDate = moment(new Date(issuedDate.value)).format('YYYY-MM-DD')
      
        const jsonDATA = {
                json_user_id: user_id,
                json_wasFirstMedicalExam: values.wasFirstMedicalExam,
                json_prevClinicName: values.prevClinicName,
                json_prevCategory: values.prevCategory,
                json_passportNumber: values.passportNumber,
                json_issuedCountry: values.issuedCountry,
                json_issuedDate: isuedDate,
                json_ad_lastName: values.ad_lastName,
                json_ad_firstName: values.ad_firstName,
                json_ad_middleName: values.ad_middleName,
                json_check_alias: values.check_alias,
                json_alias_lastName: values.alias_lastName,
                json_alias_firstName: values.alias_firstName,
                json_alias_middleName: values.alias_middleName,
                json_mother_lastName: values.mother_lastName,
                json_mother_firstName: values.mother_firstName,
                json_mother_middleName: values.mother_middleName,
                json_date_of_birth: dob,
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
                json_applicantCategory: values.applicantCategory,
                json_fileNumber: values.fileNumber,
                json_agencyField: values.agencyField,
        }

        try {
            let validateRequest = await axios.post('ca-validate', jsonDATA)

            if (validateRequest.data.status_code === 200) {

                let res = JSON.stringify(jsonDATA)

                CAIndividualDetails.setCAIndividualDetails(res)

                router.push('/individual/ca/preview')

            } else {
                inputName.value = validateRequest.data.name
                inputError.value = validateRequest.data.error
            }

        } catch (err) {
          errors.value = err.response.data.errors
        }

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
            icon: 'warning',
            title: 'Are you sure you want to go back?',
            text: 'The slot you saved and the details you filled up will be gone.',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                moveBackSlot();
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const moveBackSlot = async () => {
        const jsonDATA = {
            branch: useCAIndividualSched().branch,
            country: useCAIndividualSched().country,
            date: useCAIndividualSched().date,
            time: useCAIndividualSched().time,
            timer: useCAIndividualSched().timer,
        }

        let remove_slot = await axios.post("remove_slot/", jsonDATA);

        if (remove_slot.data.status_code === 200) {

            CA_IndividualSched.clearCAIndividualSched()
            CAIndividualDetails.clearCAIndividualDetails()
            router.push('/individual/ca/schedule')

        }
    }

const sampleFunction = () => {
  console.log("Function called!")
}
defineExpose({
  sampleFunction,
})
</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >Canada Online Registration {{ isVaccinated }} </h1>
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
                    <div class="mb-3 col-12">
                        <strong>Is this your first medical examination for the Canadian Embassy? <b class="text-danger">*</b></strong>
                    </div>
                    <div class=" col-lg-2 col-md-3 col-sm-12 examRadioLeft">
                        <RadioButton 
                                RadioLabel="Yes"
                                RadioLabelClass="font-weight-normal"
                                RadioBtnName="wasFirstMedicalExam"
                                RadioValue="Y"
                                v-model:input="wasFirstMedicalExam"
                                :onChange="handlePrevMedicalExam"
                        />
                    </div>
                   
                    <div class="col-lg-10 col-md-9 col-sm-12 examRadioRight">
                        <RadioButton 
                                RadioLabel="No"
                                RadioLabelClass="font-weight-normal"
                                RadioBtnName="wasFirstMedicalExam"
                                RadioValue="N"
                                v-model:input="wasFirstMedicalExam"
                                :onChange="handlePrevMedicalExam"
                        />
                    </div>
                    <Field type="hidden" name="is_first_med_exam" :value="is_first_med_exam" v-model="is_first_med_exam"/>
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
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <InputField 
                                    label="Category Applied for"
                                    type="text"
                                    FieldName="prevCategory"
                                    ErrorName="prevCategory"
                                    v-model:input="prevCategory"
                                />
                            </div>
                        </div>
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
                            requiredClass="d-none"
                            :disabledDate="disableBirthdayState.disabledDates"
                            v-model:input="issuedDate"
                            :error="(errors.json_issuedDate) ? (errors.json_issuedDate[0]) : ((inputName == 'json_issuedDate') ? (inputError) : '')"
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
                                    <RequiredInputField 
                                        label="Last Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="ad_lastName"
                                        ErrorName="ad_lastName"
                                        v-model:input="ad_lastName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <RequiredInputField 
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
                                <div class="col-lg-8 col-md-12 col-sm-12 pl-4 pt-3">
                                    <CheckBox 
                                            CheckBoxName="check_alias"
                                            CheckBoxValue="checked"
                                            v-model:input="check_alias"
                                            :onChange="hasAlias"
                                    />
                                    <label class="form-check-label font-weight-bold " for="flexCheckDefault">
                                        ALIAS/A.K.A. Name on Passport, if any.
                                    </label>
                                    <Field type="hidden" name="has_alias" :value="has_alias" v-model="has_alias"/>
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12" :hidden="isButtonDisabled">
                                    <InputField 
                                        label="Last Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="alias_lastName"
                                        ErrorName="alias_lastName"
                                        v-model:input="alias_lastName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12" :hidden="isButtonDisabled">
                                    <InputField 
                                        label="First Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="alias_firstName"
                                        ErrorName="alias_firstName"
                                        v-model:input="alias_firstName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12" :hidden="isButtonDisabled">
                                    <InputField 
                                        label="Middle Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="alias_middleName"
                                        ErrorName="alias_middleName"
                                        v-model:input="alias_middleName"
                                    />
                                </div>
                            </div>
                            <li class="mt-3">Mother's Maiden Name (Last Name, First Name, Middle Name)</li>
                            <div class="row pb-3">
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <RequiredInputField 
                                        label="Last Name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="mother_lastName"
                                        ErrorName="mother_lastName"
                                        v-model:input="mother_lastName"
                                    />
                                </div>
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <RequiredInputField 
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
                            <li>Applicant's Date of Birth <b class="text-danger">*</b></li>
                            <div class="row pb-3 mt-3">
                                <div class="col-12">
                                    <DateField 
                                        divLabelClass="d-none"
                                        placeholder="Date of Birth"
                                        color="red"
                                        :disabledDate="disableBirthdayState.disabledDates"
                                        v-model:input="date_of_birth"
                                        :onChange="alertChange"
                                        :error="(errors.json_date_of_birth) ? (errors.json_date_of_birth[0]) : ((inputName == 'json_date_of_birth') ? (inputError) : '')"
                                    />
                                </div>
                                <Field
                                    type="hidden"
                                    name="validate_date_of_birth"
                                    width="100px"
                                    v-model="validate_date_of_birth"
                                />
                                <ErrorMessage name="validate_date_of_birth" class="text-danger pt-3 pl-3" />
                            </div>
                            <li>Gender <b class="text-danger">*</b></li>
                            <div class="row">
                                <div class=" col-lg-3 col-md-4 col-sm-12 examRadioLeft">
                                    <RadioButton 
                                            RadioLabel="Male"
                                            RadioLabelClass="font-weight-normal"
                                            RadioBtnName="gender"
                                            RadioValue="M"
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
                                            RadioValue="F"
                                            v-model:input="gender"
                                            :onChange="handlePrevMedicalExam"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="no" /><label for="">No</label> -->
                                </div>
                            </div>
                             <div class="col-12 pb-3">
                                <ErrorMessage name="gender" class="text-danger"/>
                            </div>
                            <li>Civil Status <b class="text-danger">*</b></li>
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
                            <li>Country of Nationality <b class="text-danger">*</b></li>
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
                            <li>Contact Number <b class="text-danger">*</b></li>
                            <div class="row pb-3">
                                <div class="col-8">
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
                            
                        </ol>
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="VISA APPLICATION INFORMATION"
                        />
                    </div>
                    <div class="col-12">
                        <ol>
                            <li>Category of Applicant <b class="text-danger">*</b></li>
                            <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <SelectField 
                                        className="civil_stat_select"
                                        FieldName="applicantCategory"
                                        ErrorName="applicantCategory"
                                        v-model:input="applicantCategory"
                                        :items="visaCategory"
                                    />
                                </div>
                            </div>
                        <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    
                                   <li class="pb-3">File Number/IME <b class="text-danger">*</b></li>
                                   <InputField divLabelClass="d-none"
                                        type="text"
                                        FieldName="fileNumber"
                                        ErrorName="fileNumber"
                                        v-model:input="fileNumber"
                                    />
                                </div>
                            </div>

                        </ol>
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="ADDITIONAL QUESTIONS"
                        />
                    </div>
                    <div class="col-12">
                        <ol>
                            <li>Agency? <b class="text-danger">*</b></li>
                            <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <SelectField 
                                        className="civil_stat_select"
                                        FieldName="agencyField"
                                        ErrorName="agencyField"
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
