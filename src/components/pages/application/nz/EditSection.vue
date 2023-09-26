<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from "vue-router";
import { useProfileStore } from '@/store/profile-store'
// import { useCAIndividualSched } from '@/store/ca-individual-sched'
import { Form } from 'vee-validate'
import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
import FormHeader from '@/components/global/FormHeader.vue'
import DateField from '@/components/global/DateField.vue'
import RequiredInputField from '@/components/global/RequiredInputField.vue'
import RequiredSelectField from '@/components/global/RequiredSelectField.vue'
import SelectField from '@/components/global/SelectField.vue'
import InputField from '@/components/global/InputField.vue'
import RadioButton from '@/components/global/RadioButtton.vue'
import SubNavbar from "@/components/includes/SubNavbar.vue";
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
import medicalCertificate from '@/assets/js/arrays/medical_certificate_array'
import nzSubclass from '@/assets/js/arrays/nz_subclass_array'


const router = useRouter()
const route = useRoute();
const regId = route.params.id;
const country = route.params.country;
const payCode = route.params.paycode;

const profileStore = useProfileStore()

let email = profileStore.email
let user_id = profileStore.id
let hasMedicalExam = true
let is_first_med_exam = true
let wasFirstMedicalExam = ref(null)
let prevClinic = ref(null)
let prevCategory = ref(null)
let passportNumber = ref(null)
let issuedCountry = ref(null)
let issuedDate = ref(null)
let ad_lastName = ref(null)
let ad_firstName = ref(null)
let ad_middleName = ref(null)
let maiden_name = ref(null)
let dateOfBirth = ref(null)
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
let isPermanent = true
let medCertType = ref(null)
let intendedStay = ref(null)
let validate_intended_stay = true
let intendedOccupation = ref(null)
let stayYear = ref(null)
let stayMonth = ref(null)
let visaCategory = ref(null)
let agencyField = ref(null)
let errors = ref([])
let inputName = ref(null)
let inputError = ref(null)

const examType = new Map([
    ["Full", "Full Medical Examination"],
    ["Chest", "Chest X-ray only"],
    ["Limited", "Limited Medical Examination"],
])

const medical_certificate = new Map([
    ['Full Medical Examination', 'Full'],
    ['Chest X-ray only', 'CXR'],
    ['Limited Medical Examination', 'Limited']
])


    
// const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
const nameRegex = /^[\p{L}\p{M}\s-]+$/u;
const numOnlyRegex = /^[\p{N}]+$/u;
const contactNumberRegex = /^[\p{N}\p{M}\s+/]+$/u;

  /**
 * For Fetching user data
 */
onMounted(async () => {
  showInformation();
  // await profileStore.fetchProfileById(router.params.id)
  
})

const showInformation = async () => {
  let res = await axios.get("nz-show/" + regId);
  let showApplication = res.data.result;

  for (var i = 0; i < showApplication.length; i++) {
    medCertType.value = examType.get(showApplication[i].ExamType_NZ) || ''
    wasFirstMedicalExam.value = showApplication[i].Prev_AUMed || ''
    prevClinic.value = showApplication[i].PrevMedDetail1 || ''
    prevCategory.value = showApplication[i].PrevMedDetail2 || ''
    passportNumber.value = showApplication[i].PassNo || ''
    issuedCountry.value = showApplication[i].IssuedCountry || ''
    issuedDate.value = showApplication[i].IssuedDate || ''
    ad_lastName.value = showApplication[i].LastName || ''
    ad_firstName.value = showApplication[i].FirstName || ''
    ad_middleName.value = showApplication[i].MiddleName || ''
    maiden_name.value = showApplication[i].MaidenName || ''
    dateOfBirth.value = showApplication[i].DOB || ''
    validate_date_of_birth.value = showApplication[i].DOB || ''
    gender.value = showApplication[i].Gender || ''
    civil_status.value = showApplication[i].CivStatus || ''
    nationality.value = showApplication[i].country_nationality || ''
    contactNumber.value = showApplication[i].ContactNo || ''
    street.value = showApplication[i].Add1 || ''
    barangay.value = showApplication[i].AddBrgy || ''
    city.value = showApplication[i].Add2 || ''
    provinceField.value = showApplication[i].Add3 || ''
    postalCode.value = showApplication[i].AddPost || ''
    intendedOccupation.value = showApplication[i].Intended || ''
    intendedStay.value = showApplication[i].Stay || ''
    stayYear.value = showApplication[i].StayYr || ''
    stayMonth.value = showApplication[i].StayMt || ''
    visaCategory.value = showApplication[i].SubClass || ''
    agencyField.value = showApplication[i].agency || ''
    

    wasFirstMedicalExam.value === 'Y' ? hasMedicalExam = true : hasMedicalExam = false
    wasFirstMedicalExam.value === 'Y' ? prevClinic.value = "" : prevClinic.value = showApplication[i].PrevMedDetail1
    wasFirstMedicalExam.value === 'Y' ? prevCategory.value = "" : prevCategory.value = showApplication[i].PrevMedDetail2
    intendedStay.value === 'P' ? isPermanent = true : isPermanent = false
    intendedStay.value === 'P' ? stayYear.value = "" : stayYear.value = showApplication[i].StayYr
    intendedStay.value === 'P' ? stayMonth.value = "" : stayMonth.value = showApplication[i].StayMt
    validate_intended_stay = intendedStay.value === 'P' ? false : true
  }


 
}
    
const handlePrevMedicalExam = () => {
    if(wasFirstMedicalExam.value === 'Y') {
        hasMedicalExam = true
        prevClinic.value = ""
        prevCategory.value = ""
        is_first_med_exam = true
    } else {
        hasMedicalExam = false
        is_first_med_exam = false
    }

}

const handleIntendedStay = () => {
    if(intendedStay.value === 'P') {
        isPermanent = true
        stayYear.value = ""
        stayMonth.value = ""
        validate_intended_stay = false

    } else {
        isPermanent = false
        validate_intended_stay = true
    }
}

const alertChange = () => {
    validate_date_of_birth.value = new Date(dateOfBirth.value);
}

const schema = yup.object().shape({
    medCertType: yup.string().required('This field is required, please choose from options'),
    wasFirstMedicalExam: yup.string().required('This field is required, please choose from options'),
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
    // passportNumber: yup.string().required('This field is required!').max(13, 'NVC Case Number must be exactly 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^"),
    issuedCountry: yup.string().nullable(),
    ad_lastName: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
    ad_firstName: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
    // ad_middleName: yup.string().nullable().min(2, 'Middle name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
    gender:yup.string().required('Gender is required!'),
    maiden_name: yup.string().required("Mother's maiden name is required").min(2, 'The value of this field must be at least 2 characters').max(50, 'The value must be at most 50 characters'),
    // mother_firstName: yup.string().required("Mother last name is required").min(2, 'The value of this field must be at least 2 characters').max(25, 'The value must be at most 25 characters'),
    // mother_middleName: yup.string().nullable().min(2, "Mother's middle name must be atleast 2 characters").max(25, "Mother's middle name must be at most 25 characters").matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
    validate_date_of_birth: yup.string().required("Date of Birth is Required!"),
    civil_status:yup.string().required('This field is required, please choose an option!'),
    nationality: yup.string().required('This field is required, please choose an option!'),
    contactNumber: yup.string().required('Contact number is required!').min(11, 'Contact number must be exactly 11').max(11, 'Contact number must be exactly 11').matches(contactNumberRegex, "characters ex: abc!@#$%^").nullable(),
    street: yup.string().required('Street is required').min(1, 'Minimmum of 1 character').max(6, 'maximum of 6 characters'),
    barangay: yup.string().required('Barangay is required').min(5, 'This field must be atleast 5 characters').max(25, 'This field must be at most 25 characters'),
    city: yup.string().required('City is required').min(5, 'City must be atleast 5 characters').max(25,'This field must be at most 25 characters'),
    provinceField: yup.string().required('Province is required!').min(4, 'This field atleast 4 characters').max(25, ''),
    postalCode: yup.string().required('Postal code is required!').min(4, 'Postal code must be atleast 4 numbers').max(4, 'Postal code must be atleast 4 numbers').matches(numOnlyRegex, "Postal Code must be number only!"),
    intendedOccupation: yup.string().required('This field is required').min(4, 'Minimum of 4 characters').max(25, 'Maximum of 25 characters'),
    intendedStay: yup.string().required('This field is required, please choose from options'),
    validate_intended_stay: yup.string(),
    stayYear: yup.string().when('validate_intended_stay', {
        is: 'true',
        then: (schema) => schema.required('Year is required!').matches(numOnlyRegex, "Number only!"),
        otherwise: (schema) => schema.nullable()
    }),
    stayMonth: yup.string().when('validate_intended_stay', {
        is: 'true',
        then: (schema) => schema.required('Month is required!').matches(numOnlyRegex, "Number only!"),
        otherwise: (schema) => schema.nullable()
    }),
    // stayMonth: yup.number().typeError("You must specify a number").when("validate_intended_stay", {
    //     is: "true",
    //     then: (schema) =>schema.moreThan(0, "Number of month must be greater than 0!").lessThan(13, "The maximum number of month is 12!").required("Month is required!"),
    //     otherwise: (schema) => schema.nullable()
    // }),
    visaCategory: yup.string().required('This field is required, please choose from options'),
    agencyField: yup.string().required('This field is required, please choose from options'),
})

const modifyDetails = async (regInformation) => {
    let validateRequest = await axios.post('nz-validate', regInformation)

        if (validateRequest.data.status_code === 200) {
            
            let res = await axios.post('nz-update', regInformation)

            let status_code = res.data.status_code;
            let error_msg = res.data.error_msg;
            let message = res.data.message;
            
            if (status_code === 200) {
            
            Swal.fire({
                icon: 'success',
                title: error_msg,
                text: message,
            })

            router.push("/application/show/"+country+"/"+regId+"/"+payCode)

            } else {
            Swal.fire("Update Failed", "Check your internet connection", "error");
            }
            

        } else {
            inputName.value = validateRequest.data.name
            inputError.value = validateRequest.data.error
        }
}
    
/**
 * Submit US individual form
 * 
 */
const updateDetails = async (values) => {

    errors.value = []

    let dob = moment(new Date(dateOfBirth.value)).format('YYYY-MM-DD')
    let issued_date = moment(new Date(issuedDate.value)).format('YYYY-MM-DD')
    
    try {

        Swal.fire({
            title: "Are you sure you want to update?",
            text: "Confirm your action",
            showCancelButton: true,
            confirmButtonText: "Yes",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                const requestPAYLOAD = {
                        json_registrationID: regId,
                        json_user_id: user_id,
                        json_medCertType: medical_certificate.get(values.medCertType),
                        json_wasFirstMedicalExam: values.wasFirstMedicalExam,
                        json_prevClinic: values.prevClinicName,
                        json_prevCategory: values.prevCategory,
                        json_passportNumber: values.passportNumber,
                        json_issuedCountry: values.issuedCountry,
                        json_issuedDate: issued_date,
                        json_ad_lastName: values.ad_lastName,
                        json_ad_firstName: values.ad_firstName,
                        json_ad_middleName: values.ad_middleName,
                        json_gender: values.gender,
                        json_maiden_name: values.maiden_name,
                        json_dateOfBirth: dob,
                        json_civil_status: values.civil_status,
                        json_nationality: values.nationality,
                        json_contactNumber: values.contactNumber,
                        json_emailAdd: email,
                        json_street: values.street,
                        json_barangay: values.barangay,
                        json_city: values.city,
                        json_provinceField: values.provinceField,
                        json_postalCode: values.postalCode,
                        json_intendedOccupation: values.intendedOccupation,
                        json_intendedStay: values.intendedStay,
                        json_stayYear: values.stayYear,
                        json_stayMonth: values.stayMonth,
                        json_visaCategory: values.visaCategory,
                        json_agencyField: values.agencyField,
                }
                modifyDetails(requestPAYLOAD);
            } else if (result.isDenied) {
                Swal.fire("Update failed", "Check your internet connection", "error");
            }
        });

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

</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="row">
      <div class="col-12">
        <SubNavbar />
      </div>
    </div>
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-2">
            <h1 class="text-secondary text-center fs-1 fw-bold" >New Zealand</h1>
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->
        <Form @submit="updateDetails" :validation-schema="schema"  class="col-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="col-12">
                        <span class="text-danger">Fields with asterisks(*) are required</span>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12 pb-3">
                        <RequiredSelectField 
                            label="Medical Certificate Type:"
                            FieldName="medCertType"
                            ErrorName="medCertType"
                            v-model:input="medCertType"
                            :items="medicalCertificate"
                        />
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
                                    v-model:input="prevClinic"
                                />
                            </div>
                            <div class="col-lg-8 col-md-12 col-sm-12 pb-3">
                                    <SelectField 
                                        label="What Visa Category and Visa Type did you apply for?"
                                        FieldName="prevCategory"
                                        ErrorName="prevCategory"
                                        v-model:input="prevCategory"
                                        :items="nzSubclass"
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
                            :onChange="showBooster1"
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
                              
                            </div>
                            <li class="mt-3">Mother's Maiden Name (Last Name, First Name, Middle Name) <b class="text-danger">*</b></li>
                            <div class="row pb-3">
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <RequiredInputField 
                                        label="Last name, First name Middle name"
                                        labelClassName="font-weight-normal"
                                        type="text"
                                        FieldName="maiden_name"
                                        ErrorName="maiden_name"
                                        v-model:input="maiden_name"
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
                                        v-model:input="dateOfBirth"
                                        :onChange="alertChange"
                                        :error="(errors.json_dateOfBirth) ? (errors.json_dateOfBirth[0]) : ((inputName == 'json_dateOfBirth') ? (inputError) : '')"
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
                            headerText="ADDITIONAL QUESTIONS"
                        />
                    </div>
                    <div class="col-12">
                        <ol>
                            <li class="pb-3">What is your intended occupation or activity in New Zealand <b class="text-danger">*</b></li>
                            <InputField 
                                divLabelClass="d-none"
                                type="text"
                                FieldName="intendedOccupation"
                                ErrorName="intendedOccupation"
                                v-model:input="intendedOccupation"
                            />
                            <li class="pt-3">How long do you intend staying in New Zealand  <b class="text-danger">*</b></li>
                            <div class="row pb-3 pt-2"> 
                                <div class="col-12 pl-5">
                                    <RadioButton
                                        RadioLabel="Permanent"
                                        RadioLabelClass="font-weight-normal"
                                        RadioBtnName="intendedStay"
                                        RadioValue="P"
                                        v-model:input="intendedStay"
                                        :onChange="handleIntendedStay"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="yes" /><label for="">Yes</label> -->
                                </div>
                                <div class="col-12 pl-5">
                                    <RadioButton 
                                        RadioLabel="Temporary"
                                        RadioLabelClass="font-weight-normal"
                                        RadioBtnName="intendedStay"
                                        RadioValue="T"
                                        v-model:input="intendedStay"
                                        :onChange="handleIntendedStay"
                                    />
                                    <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="vaccine_receive" v-model.lazy="vaccine_receive" value="no" /><label for="">No</label> -->
                                </div>
                                <Field type="hidden" name="validate_intended_stay" :value="validate_intended_stay" v-model="validate_intended_stay"/>
                                <div class="col-12">
                                    <ErrorMessage name="intendedStay" class="text-danger pb-3"/>
                                </div>
                                <div class="col-2">
                                    <InputField 
                                        label="year"
                                        type="text"
                                        FieldName="stayYear"
                                        ErrorName="stayYear"
                                        v-model:input="stayYear"
                                        :isDisabled="isPermanent"
                                    />
                                </div>
                                <div class="col-2">
                                    <InputField 
                                        label="Months"
                                        type="text"
                                        FieldName="stayMonth"
                                        ErrorName="stayMonth"
                                        v-model:input="stayMonth"
                                        :isDisabled="isPermanent"
                                    />
                                </div>
                                <div class="8"></div>
                                <div class="col-12">
                                    <ErrorMessage name="radioIntendedStay" class="text-danger"/>
                                </div>
                            </div>
                            <li>What is the visa category and visa type that you are applying for? <b class="text-danger">*</b></li>
                            <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <SelectField 
                                        className="civil_stat_select"
                                        FieldName="visaCategory"
                                        ErrorName="visaCategory"
                                        v-model:input="visaCategory"
                                        :items="nzSubclass"
                                    />
                                </div>
                            </div>
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
                    btnType="submit"
                    className="btn btn-primary btn-lg w-25"
                    btnText="Update"
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
