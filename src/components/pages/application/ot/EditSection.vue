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
import visaCategory from '@/assets/js/arrays/visa_category_array'
// import agency from '@/assets/js/arrays/agency_array'
// import medicalCertificate from '@/assets/js/arrays/medical_certificate_array'
// import nzSubclass from '@/assets/js/arrays/nz_subclass_array'


const router = useRouter()
const route = useRoute();
const regId = route.params.id;
const country = route.params.country;
const payCode = route.params.paycode;
const countryCode = new Map([
            ["KR", "South Korea / KOICA"],
            ["FK", "Falkland Islands"],
            ["LV", "Latvia"],
            ["MU", "Mauritius"],
        ]);

const profileStore = useProfileStore()

let countryName = countryCode.get(country)

let email = profileStore.email
let user_id = profileStore.id
let embassyOfVisa = country
let visaCategoryField = ref(null)
let validate_date_of_issue = ref(null)
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
let errors = ref([])
let inputName = ref(null)
let inputError = ref(null)
let received_date = ref(null)

// const examType = new Map([
//     ["Full", "Full Medical Examination"],
//     ["Chest", "Chest X-ray only"],
//     ["Limited", "Limited Medical Examination"],
// ])


    
const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
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
  let res = await axios.get("ot-show/"+ regId +"/"+ country);
  let showApplication = res.data.result;

  for (var i = 0; i < showApplication.length; i++) {
    visaCategoryField.value = showApplication[i].SubClass || ''
    passportNumber.value = showApplication[i].PassNo || ''
    issuedCountry.value = showApplication[i].IssuedCountry || ''
    issuedDate.value = showApplication[i].IssuedDate || ''
    validate_date_of_issue.value = showApplication[i].IssuedDate || ''
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
    received_date.value = showApplication[i].RcvDate || ''

  }
 
}
    
const alertIssueDate = () => {
    validate_date_of_issue.value = new Date(issuedDate.value);
}

const alertChange = () => {
    validate_date_of_birth.value = new Date(dateOfBirth.value);
}

const schema = yup.object().shape({
        visaCategoryField: yup.string().required('This field is required, please choose an option!'),
        passportNumber: yup.string().required('This field is required!').max(13, 'NVC Case Number must be exactly 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^"),
        issuedCountry: yup.string().required('This field is required, please choose an option!'),
        validate_date_of_issue: yup.string().required("Date of issue is required!"),
        ad_lastName: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_firstName: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_middleName: yup.string().nullable(),
        maiden_name: yup.string().required("Maiden's name is required!").min(10, "Maiden's name must be consist of last name, first name & middle name").max(60, "Maiden's name must be at most 60 characters!"),
        validate_date_of_birth: yup.string().required("Date of birth is required!"),
        gender:yup.string().required('Gender is required!'),
        civil_status:yup.string().required('This field is required, please choose from options!'),
        nationality: yup.string().required('This field is required, please choose from options!'),
        contactNumber: yup.string().required('Contact number is required!').min(11, 'Contact number must be exactly 11').max(11, 'Contact number must be exactly 11').matches(contactNumberRegex, "Please avoid using letters and special characters ex: abc!@#$%^"),
        street: yup.string().required('Street is required').min(2, 'Minimmum of 2 character').max(6, 'maximum of 6 characters'),
        barangay: yup.string().required('Barangay is required').min(5, 'This field must be atleast 5 characters').max(25, 'This field must be at most 25 characters'),
        city: yup.string().required('City is required').min(5, 'City must be atleast 5 characters').max(25,'This field must be at most 25 characters'),
        provinceField: yup.string().required('Province is required!').min(4, 'This field atleast 4 characters').max(25, 'This field must be at most 25 characters'),
        postalCode: yup.string().required('Postal code is required!').min(4, 'Postal code must be atleast 4 numbers').max(4, 'Postal code must be atleast 4 numbers').matches(numOnlyRegex, "Postal Code must be number only!"),
})

    
/**
 * Submit US individual form
 * 
 */
const updateDetails = async (values) => {

    errors.value = []

    let dob = moment(new Date(dateOfBirth.value)).format('YYYY-MM-DD')
    let issued_date = moment(new Date(issuedDate.value)).format('YYYY-MM-DD')
    
    const requestPayload = {
            json_reg_id: regId,
            json_user_id: user_id,
            json_embassyOfVisa: embassyOfVisa,
            json_visaCategoryField: values.visaCategoryField,
            json_passportNumber: values.passportNumber,
            json_issuedCountry: values.issuedCountry,
            json_issuedDate: issued_date,
            json_ad_lastName: values.ad_lastName,
            json_ad_firstName: values.ad_firstName,
            json_ad_middleName: values.ad_middleName,
            json__maiden_name: values.maiden_name,
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
            json_received_date: values.received_date,
            json_country: country
    }

    try {
        let validateRequest = await axios.post('ot-validate', requestPayload)

        if (validateRequest.data.status_code === 200) {
            
            let updateRequest = await axios.post('ot-update', requestPayload)
            
            if (updateRequest.data.status_code === 200) {
            
            Swal.fire({
                    icon: 'success',
                    title: 'Successfully updated',
                    text: 'Please check also your email',
                    showConfirmButton: false,
                    timer: 1500
                })

            router.push("/application/show/"+country+"/"+regId+"/"+payCode)

            } else {
            Swal.fire("Update Failed", "Check your internet connection", "error");
            }
            

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
            <h1 class="text-secondary text-center fs-1 fw-bold" >{{ countryName }}</h1>
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
                    <!-- <div class="col-lg-8 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Embassy of Visa Application"
                            FieldName="embassyOfVisa"
                            ErrorName="embassyOfVisa"
                            v-model:input="embassyOfVisa"
                            :items="koica"
                        />
                    </div> -->
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <RequiredSelectField 
                            label="Visa category"
                            FieldName="visaCategoryField"
                            ErrorName="visaCategoryField"
                            v-model:input="visaCategoryField"
                            :items="visaCategory"
                        />
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <RequiredInputField 
                            label="Passport Number"
                            type="text"
                            FieldName="passportNumber"
                            ErrorName="passportNumber"
                            v-model:input="passportNumber"
                        />
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <RequiredSelectField 
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
                            color="red"
                            :onChange="alertIssueDate"
                            :disabledDate="disableBirthdayState.disabledDates"
                            v-model:input="issuedDate"
                            :error="(errors.json_issuedDate) ? (errors.json_issuedDate[0]) : ((inputName == 'json_issuedDate') ? (inputError) : '')"
                        />
                        <Field
                            type="hidden"
                            name="validate_date_of_issue"
                            width="100px"
                            v-model="validate_date_of_issue"
                        />
                        <ErrorMessage name="validate_date_of_issue" class="text-danger pt-3 pl-3" />
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
                                        :error="errors.json_ad_lastName ? errors.json_ad_lastName[0] : ''"
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
                                        :error="errors.json_firstName ? errors.json_firstName[0] : ''"
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
                            <li class="mt-3">Mother's Maiden Name (Last Name, First Name, Middle Name)</li>
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

                <!-- <div class="col-lg-3 col-md-12 col-sm-12"></div> -->
                <div class="col-12 mt-3 d-flex justify-content-center">
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
