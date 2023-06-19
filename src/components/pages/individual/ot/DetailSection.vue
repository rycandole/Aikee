<script setup>
    import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import {useRoute} from "vue-router"
    import { useProfileStore } from '@/store/profile-store'
    import { useOTIndividualDetails } from '@/store/ot-individual-details'
    import { useOTIndividualSched } from '@/store/ot-individual-sched'
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
    import Swal from '@/sweetalert2'
    import { ErrorMessage } from 'vee-validate'
    import moment from 'moment'
    import * as yup from 'yup';

    // import { ucwords } from "@/assets/js/string_functions"

    // ================= Select Option Array ===================== //
    import civilStatus from '@/assets/js/arrays/civil_status_array'
    import countries from '@/assets/js/arrays/countries_array'
    import years from '@/assets/js/arrays/year_list_array'
    import province from '@/assets/js/arrays/province_array'
    import visaCategory from '@/assets/js/arrays/visa_category_array'
    

    const router = useRouter()
    const profileStore = useProfileStore()
    const OT_IndividualSched = useOTIndividualSched()
    const OTIndividualDetails = useOTIndividualDetails()
    const details = JSON.parse(localStorage.getItem('ot-individual-details'))

    const route = useRoute();
    const regCountry = route.params.country;

    const countryCode = new Map([
                ["sk", "South Korea"],
                ["fi", "Falkland Islands"],
                ["lv", "Latvia"],
                ["mr", "Mauritius"],
                ["ci", "Cook Islands"],
            ]);

    let countryName = countryCode.get(regCountry)

    let email = profileStore.email
    let user_id = profileStore.id
    let textSuccess = "text-success"
    let textSuccess1 = "text-success"
    let embassyOfVisa = regCountry
    let visaCategoryField = ref(null)
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
    let errors = ref([])
    let inputName = ref(null)
    let inputError = ref(null)

    const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
    const nameRegex = /^[\p{L}\p{M}\s-]+$/u;
    const numOnlyRegex = /^[\p{N}]+$/u;
    const contactNumberRegex = /^[\p{N}\p{M}\s+/]+$/u;

    /**
     * For Fetching user data
     */
    //  onMounted(async () => {
    //     await profileStore.fetchProfileById(router.params.id)

    //     embassyOfVisa.value = details.embassyOfVisa || ''
    //     visaCategoryField.value = details.visaCategoryField || ''
    //     passportNumber.value = details.passportNumber || ''
    //     issuedCountry.value = details.issuedCountry || ''
    //     issuedDate.value = details.issuedDate || ''
    //     ad_lastName.value = details.ad_lastName || ''
    //     ad_firstName.value = details.ad_firstName || ''
    //     ad_middleName.value = details.ad_middleName || ''
    //     mother_lastName.value = details.mother_lastName || ''
    //     mother_firstName.value = details.mother_firstName || ''
    //     mother_middleName.value = details.mother_middleName || ''
    //     dateOfBirth.value = details.dob || ''
    //     gender.value = details.gender || ''
    //     civil_status.value = details.civil_status || ''
    //     nationality.value = details.nationality || ''
    //     contactNumber.value = details.contactNumber || ''
    //     street.value = details.street || ''
    //     barangay.value = details.barangay || ''
    //     city.value = details.city || ''
    //     provinceField.value = details.provinceField || ''
    //     postalCode.value = details.postalCode || ''
    // })

    /**
     * Display informaion for edit
     */

    onMounted( () => {
        visaCategoryField.value = details.visaCategoryField || ''
        passportNumber.value = details.passportNumber || ''
        issuedCountry.value = details.issuedCountry || ''
        issuedDate.value = details.issuedDate || ''
        ad_lastName.value = details.ad_lastName || ''
        ad_firstName.value = details.ad_firstName || ''
        ad_middleName.value = details.ad_middleName || ''
        mother_lastName.value = details.mother_lastName || ''
        mother_firstName.value = details.mother_firstName || ''
        mother_middleName.value = details.mother_middleName || ''
        dateOfBirth.value = details.dob || ''
        gender.value = details.gender || ''
        civil_status.value = details.civil_status || ''
        nationality.value = details.nationality || ''
        contactNumber.value = details.contactNumber || ''
        street.value = details.street || ''
        barangay.value = details.barangay || ''
        city.value = details.city || ''
        provinceField.value = details.provinceField || ''
        postalCode.value = details.postalCode || ''
    })

    

    const schema = yup.object().shape({
        visaCategoryField: yup.string().required('This field is required, please choose an option!'),
        passportNumber: yup.string().required('This field is required!').max(13, 'NVC Case Number must be exactly 13 characters').matches(caseNumberRegex, "Please avoid using spaces and special characters ex: !@#$%^"),
        issuedCountry: yup.string().required('This field is required, please choose an option!'),
        ad_lastName: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_firstName: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        ad_middleName: yup.string().optional('Middle name is required!').min(2, 'Middle name must be atleast 2 characters').max(25, 'Middle name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^").nullable(),
        mother_lastName: yup.string().required('Mother Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        mother_firstName: yup.string().required('Mother First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
        mother_middleName: yup.string().optional().nullable(),
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
     const handleDetails = async (values) => {

        errors.value = []

        let dob = moment(new Date(dateOfBirth.value)).format('YYYY-MM-DD')
        let isuedDate = moment(new Date(issuedDate.value)).format('YYYY-MM-DD')
      
        const jsonDATA = {
                json_user_id: user_id,
                json_embassyOfVisa: embassyOfVisa,
                json_visaCategoryField: values.visaCategoryField,
                json_passportNumber: values.passportNumber,
                json_issuedCountry: values.issuedCountry,
                json_issuedDate: isuedDate,
                json_ad_lastName: values.ad_lastName,
                json_ad_firstName: values.ad_firstName,
                json_ad_middleName: values.ad_middleName,
                json_mother_lastName: values.mother_lastName,
                json_mother_firstName: values.mother_firstName,
                json_mother_middleName: values.mother_middleName,
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
        }

        try {
            let validateRequest = await axios.post('ot-validate', jsonDATA)

            if (validateRequest.data.status_code === 200) {

                let res = JSON.stringify(jsonDATA)

                OTIndividualDetails.setOTIndividualDetails(res)

                router.push("/individual/ot/preview/"+ regCountry)

            } else {
                inputName.value = validateRequest.data.name
                inputError.value = validateRequest.data.error
            }

        } catch (err) {
          errors.value = err.response.data.errors
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
            branch: useOTIndividualSched().branch,
            country: useOTIndividualSched().country,
            date: useOTIndividualSched().date,
            time: useOTIndividualSched().time,
        }

        let remove_slot = await axios.post("remove_slot/", jsonDATA);

        if (remove_slot.data.status_code === 200) {

            OT_IndividualSched.clearOTIndividualSched()
            OTIndividualDetails.clearOTIndividualDetails()
            router.push("/individual/ot/schedule/"+ regCountry)

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
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >{{ countryName }} Online Registration</h1>
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
                                        :disabledDate="disableBirthdayState.disabledDates"
                                        v-model:input="dateOfBirth"
                                        :onChange="showBooster1"
                                        :error="(errors.json_dateOfBirth) ? (errors.json_dateOfBirth[0]) : ((inputName == 'json_dateOfBirth') ? (inputError) : '')"
                                    />
                                </div>
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