<script setup>
    import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import { useUSIndividualSched } from '@/store/us-individual-sched.js'
    import { useUSIndividualDetails } from '@/store/us-individual-details.js'
    import { ErrorMessage } from 'vee-validate'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import SubFormHeader from '@/components/global/SubFormHeader.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import PreviewText from '@/components/global/PreviewText.vue'
    import CheckBox from '@/components/global/CheckBox.vue'
    import Swal from '@/sweetalert2'
    import moment from 'moment'
    import * as yup from 'yup'

    
    // import { ucwords } from '../../../assets/js/string_functions'

    const router = useRouter()
    const profileStore = useProfileStore()
    const US_IndividualSched = useUSIndividualSched()
    const US_IndividualDetails = useUSIndividualDetails()
    const schedule = JSON.parse(localStorage.getItem('us-individual-sched'))
    const details = JSON.parse(localStorage.getItem('us-individual-details'))

    

    /**
     * For Fetching user data
     */
    onMounted(async () => {
        await profileStore.fetchProfileById(router.params.id)
    })


    let errors = ref([])
    let email = profileStore.email
    let user_id = profileStore.id
    let textSuccess = "text-success"
    let textSuccess1 = "text-success"
    let textSuccess2 = "text-success"
    let isButtonDisabled = true
    let checkbox1 = ref(null)
    let checkbox2 = ref(null)
    const priorityCategory = new Map([
                                        ['A1', 'Workers in Frontline Health Services'],
                                        ['All Senior Citizens', 'A2'],
                                        ['A3', 'Persons with Comorbidities'],
                                        ['A4', 'Frontline personnel in essential sectors, including uniformed personnel'],
                                        ['A5', 'Indigent Population'],
                                        ['B1', 'Teachers, Social Workers'],
                                        ['B2', 'Other Government Workers'],
                                        ['B3', 'ther Essential Workers'],
                                        ['B4', 'Socio-demographic groups at significantly higher risk other than senior citizens and poor population based on the NHTS-PR'],
                                        ['B5', 'Overseas FIlipino Workers'],
                                        ['B6', 'Other Remaining Workforce']
                                    ])
    
    const visaPrefCategory = new Map([
                                    ['NONE', 'NONE'],
                                    ['AM-VTNM (VIETNAMESE AMERASIAN)', 'AM-VTNM'],
                                    ['CR1 (SPOUSE OF U.S. CITIZEN UNDER TWO YEARS OF MARRIAGE)', 'CR1'],
                                    ['CR2 (CHILD OF U.S. CITIZEN UNDER TWO YEARS OF MARRIAGE)', 'CR2'],
                                    ['DV (DIVERSITY VISA)', 'DV'],
                                    ['E1 (ALIEN WITH EXTRAORDINARY ABILITY)', 'E1'],
                                    ['E2 (PROFESSIONAL HOLDING ADVANCED DEGREE)', 'E2'],
                                    ['E3 (SKILLED WORKER)', 'E3'],
                                    ['E4 (SD1 MINISTER OF RELIGION)', 'E4'],
                                    ['E5 (IMMIGRANT INVESTORS)', 'E5'],
                                    ['EW (OTHER WORKER (UNSKILLED WORKERS))', 'EW'],
                                    ['EX (SCHEDULE WORKERS)', 'EX'],
                                    ['F1-F11 (UNMARRIED SON/DAUGHTER OF U.S. CITIZEN)', 'F1-F11'],
                                    ['F1-F12 (CHILD OF F11)', 'F1-F12'],
                                    ['F2A-F21 (SPOUSE OF LAWFUL PERMANENT RESIDENT)', 'F2A-F21'],
                                    ['F2A-F22 (CHILD OF LAWFUL PERMANENT RESIDENT)', 'F2A-F22'],
                                    ['F2A-F23 (DERIVATIVE CHILD OF F21 OR F22)', 'F2A-F23'],
                                    ['F2B-F24 (UNMARRIED SON/DAUGHTER OF LAWFUL PER. ADDRESS)', 'F2B-F24'],
                                    ['F2B-F25 (DERIVATIVE CHILD OF F24)', 'F2B-F25'],
                                    ['F3-F31 (MARRIED SON/DAUGHTER OF U.S. CITIZEN)', 'F3-F31'],
                                    ['F3-F32 (DERIVATIVE SPOUSE OF F31)', 'F3-F32'],
                                    ['F3-F33 (DERIVATIVE CHILD OF F31)', 'F3-F33'],
                                    ['F4-F41 (BROTHER/SISTER OF U.S. CITIZEN)', 'F4-F41'],
                                    ['F4-F42 (DERIVATIVE SPOUSE OF F41)', 'F4-F42'],
                                    ['F4-F43 (DERIVATIVE CHILD OF F41)', 'F4-F43'],
                                    ['FX-F21 (SPOUSE OF LAWFUL PERMANENT RESIDENT)', 'FX-F21'],
                                    ['FX-F22 (CHILD OF LAWFUL PERMANENT RESIDENT)', 'FX-F22'],
                                    ['FX-F23 (DERIVATIVE CHILD OF F-21 OR F22)', 'FX-F23'],
                                    ['FP1 (PAROLEE)', 'FP1'],
                                    ['IB1 (SELF PETITIONING SPOUSE OF A U.S. CITIZEN)', 'IB1'],
                                    ['IH3 (ADOPTION CASE)', 'IH3'],
                                    ['IH4 (ADOPTION CASE APPROVE AFTER APR. 2008)', 'IH4'],
                                    ['IH4 (ADOPTION CASE APPROVED AFTER APR. 2008)', 'IH4'],
                                    ['IR1 (SPOUSE OF A U.S. CITIZEN)', 'IR1'],
                                    ['IR2 (CHILDREN OF A U.S. CITIZEN PARENTS UNDER 21 YRS. OLD)', 'IR2'],
                                    ['IR3 (ORPHAN ADOPTED ABROAD BY U.S. CITIZEN)', 'IR3'],
                                    ['IR4 (ORPHAN TO BE ADOPTED ABROAD BY U.S. CITIZEN)', 'IR4'],
                                    ['IR5 (PARENT OF U.S. CITIZEN (18 YEARS OLD ABOVE))', 'IR5'],
                                    ['IW1 (SPOUSE OF A DECEASED U.S.CITIZEN)', 'IW1'],
                                    ['IW2 (DERIVATIVE CHILD OF IW1)', 'IW2'],
                                    ['K1 (FIANCEE)', 'K1'],
                                    ['K2 (DERIVATIVE CHILD OF K1)', 'K2'],
                                    ['K3 (K3 VISA)', 'K3'],
                                    ['K4 (K4 VISA)', 'K4'],
                                    ['SB1 (RETURNING RESIDENT)', 'SB1'],
                                    ['SD (CERTAIN RELIGIOUS WORKER)', 'SD'],
                                    ['SE (SPECIAL IMMIGRANT)', 'SE'],
                                    ['SM1 (SPECIAL IMMIGRANT OR ARMED FORCES GROUP)', 'SM1'],
                                    ['SR (CERTAIN RELIGIOUS WORKER)', 'SR'],
                                    ['SQ (CERTAIN IRAQIS OR AFGHANS EMPLOYED BY THE U.S. GOVERNMENT)', 'SQ'],
                                    ['VISA-93 (REFUGEE FOLLOW-TO-JOIN)', 'VISA-93'],
                                    ['YY (ASYLEE)', 'YY']
                                ])
    const wasChecked = () => {
        if(checkbox1.value == 'checked' && checkbox2.value == 'checked') {
            isButtonDisabled = false
        } else {
            isButtonDisabled = true
        }
    }

    // Schedule Store
    let sched_date = moment(schedule.date).format('LL');
    let sched_time = schedule.time;

    // Details Store 
    let detail_date_of_birth = moment(details.date_of_birth).format('LL');
    let detail_covid_vaccine_priority = details.covid_vaccine_priority+". "+priorityCategory.get(details.covid_vaccine_priority);
    let detail_cv_brand_name = details.cv_brand_name;
    let detail_firstDose = moment(details.firstDose).format('LL');
    let detail_secondDose = moment(details.secondDose).format('LL');
    let detail_cv_booster1 = details.cv_booster1;
    let detail_first_doseBooster = moment(details.first_doseBooster).format('LL');
    let detail_cv_booster2 = details.cv_booster2;
    let detail_second_doseBooster = moment(details.second_doseBooster).format('LL');
    let detail_ci_nvc_number = details.ci_nvc_number;
    let detail_ci_visa_pref_category = details.ci_visa_pref_category;
    let detail_ci_interview_date = moment(details.ci_interview_date).format('LL');
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
    let detail_ad_email = email;
    let detail_ad_present_residence = details.ad_present_residence;
    let detail_ad_prior_residence = details.ad_prior_residence;
    let detail_ad_passport_number = details.ad_passport_number;
    let detail_ad_passport_issued_by = details.ad_passport_issued_by;
    let detail_ad_passport_date = moment(details.ad_passport_date).format('LL');
    let detail_ad_passport_expiration_date = moment(details.ad_passport_expiration_date).format('LL');
    let detail_ad_has_been_issued_visa = details.ad_has_been_issued_visa;
    let detail_ad_issuance_date = moment(details.ad_issuance_date).format('LL');
    let detail_ad_expiration_date = moment(details.ad_expiration_date).format('LL');
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


    const schema = yup.object({
        checkbox1: yup.string().required('Please check the check box to proceed'),
        checkbox2: yup.string().required('Please check the check box to proceed'),
    })


    const handleStore = async () => {

        errors.value = []

        const JSONdata = {
            json_sched_date: moment(schedule.date).format('YYYY-MM-DD'),
            json_sched_time: sched_time,
            json_user_id: user_id,
            json_detail_date_of_birth: moment(details.date_of_birth).format('YYYY-MM-DD'),
            json_detail_covid_vaccine_priority: details.covid_vaccine_priority,
            json_detail_cv_brand_name: detail_cv_brand_name,
            json_detail_firstDose: moment(details.firstDose).format('YYYY-MM-DD'),
            json_detail_secondDose: moment(details.secondDose).format('YYYY-MM-DD'),
            json_detail_cv_booster1: detail_cv_booster1,
            json_detail_first_doseBooster: moment(details.first_doseBooster).format('YYYY-MM-DD'),
            json_detail_cv_booster2: detail_cv_booster2,
            json_detail_second_doseBooster: moment(details.second_doseBooster).format('YYYY-MM-DD'),
            json_detail_ci_nvc_number: detail_ci_nvc_number,
            json_detail_ci_visa_pref_category: visaPrefCategory.get(detail_ci_visa_pref_category),
            json_detail_ci_interview_date: moment(details.ci_interview_date).format('YYYY-MM-DD'),
            json_detail_ci_interview_source: detail_ci_interview_source,
            json_detail_ad_last_name: detail_ad_last_name,
            json_detail_ad_first_name: detail_ad_first_name,
            json_detail_ad_middle_name: detail_ad_middle_name,
            json_detail_ad_gender: detail_ad_gender,
            json_detail_ad_civil_status: detail_ad_civil_status,
            json_detail_ad_nationality: detail_ad_nationality,
            json_detail_ad_birthplace: detail_ad_birthplace,
            json_detail_ad_birth_country: detail_ad_birth_country,
            json_detail_ad_mother_last_name: detail_ad_mother_last_name,
            json_detail_ad_mother_first_name: detail_ad_mother_first_name,
            json_detail_ad_mother_middle_name: detail_ad_mother_middle_name,
            json_detail_ad_address: detail_ad_address,
            json_detail_ad_city: detail_ad_city,
            json_detail_ad_province: detail_ad_province,
            json_detail_ad_zip_code: detail_ad_zip_code,
            json_detail_ad_overseas_country: detail_ad_overseas_country,
            json_detail_ad_overseas_street_address: detail_ad_overseas_street_address,
            json_detail_ad_overseas_city: detail_ad_overseas_city,
            json_detail_ad_overseas_province: detail_ad_overseas_province,
            json_detail_ad_overseas_zipcode: detail_ad_overseas_zipcode,
            json_detail_ad_contact_numbers: detail_ad_contact_numbers,
            json_detail_ad_email: detail_ad_email,
            json_detail_ad_present_residence: detail_ad_present_residence,
            json_detail_ad_prior_residence: detail_ad_prior_residence,
            json_detail_ad_passport_number: detail_ad_passport_number,
            json_detail_ad_passport_issued_by: detail_ad_passport_issued_by,
            json_detail_ad_passport_date: moment(details.ad_passport_date).format('YYYY-MM-DD'),
            json_detail_ad_passport_expiration_date: moment(details.ad_passport_expiration_date).format('YYYY-MM-DD'),
            json_detail_ad_has_been_issued_visa: detail_ad_has_been_issued_visa == 'yes' ? detail_ad_has_been_issued_visa = 1 : detail_ad_has_been_issued_visa = 0,
            json_detail_ad_issuance_date: moment(details.ad_issuance_date).format('YYYY-MM-DD'),
            json_detail_ad_expiration_date: moment(details.ad_expiration_date).format('YYYY-MM-DD'),
            json_detail_ad_prev_medical_exam_month: detail_ad_prev_medical_exam_month,
            json_detail_ad_prev_medical_exam_year: detail_ad_prev_medical_exam_year,
            json_detail_ad_prev_xray_month: detail_ad_prev_xray_month,
            json_detail_ad_prev_xray_year: detail_ad_prev_xray_year,
            json_detail_petitioner_fullname: detail_petitioner_fullname,
            json_detail_petitioner_is_alive: detail_petitioner_is_alive == 'yes' ? detail_petitioner_is_alive = 1 : detail_ad_has_been_issued_visa = 0,
            json_detail_petitioner_relationship: detail_petitioner_relationship,
            json_detail_petitioner_us_street_addr: detail_petitioner_us_street_addr,
            json_detail_petitioner_us_city_addr: detail_petitioner_us_city_addr,
            json_detail_petitioner_us_state_addr: detail_petitioner_us_state_addr,
            json_detail_petitioner_us_postal_code: detail_petitioner_us_postal_code,
            json_detail_petitioner_contact_no: detail_petitioner_contact_no,
            json_detail_petitioner_email_addr: detail_petitioner_email_addr,
            json_detail_intended_port_of_entry: detail_intended_port_of_entry,
        }

        try {

            let res = await axios.post('us-store/', JSONdata)

            if (res.data.status_code === 200 ) {

                Swal.fire('Applicant successfully registered', '', 'success')
                // alert('Success '+ res.data.response +' - '+ res.data.sched)

                US_IndividualSched.clearUSIndividualSched()
                US_IndividualDetails.clearUSIndividualDetails()

                router.push(process.env.BASE_URL +"/")
                
            } else {
                // alert('Reject, '+ res.data.error +', '+ res.data.message)
                Swal.fire('There is something wrong.', 'Please check the fields or contact the administrator', 'info')
                console.log('Reject, '+ res.data.error +', '+ res.data.message)
            }

            // console.log(res)

        } catch (err) {
            errors.value = err.response.data.errors
            // console.log(errors.value)
        }

    }


    const handleBack = () => {

        Swal.fire({
            title: 'Are you sure you want to edit?',
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
            <h1 class="text-secondary text-center fs-1 fw-bold" >Review all the details</h1>
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
        <Form @submit.prevent="handleStore" :validation-schema="schema" class="col-lg-9 col-md-12 col-sm-12 mb-3">
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
                    <div class="mb-3 col-12">
                        <PreviewText 
                            previewLabel="Date of Birth"
                            v-bind:previewText="detail_date_of_birth"
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
                            v-bind:previewText="detail_covid_vaccine_priority"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <PreviewText 
                            previewLabel="What category do you belong to?"
                        />
                        <ol type="I">
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Brand Name"
                                    v-bind:previewText="detail_cv_brand_name"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Dose 1 Date Received "
                                    v-bind:previewText="detail_firstDose"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Dose 2 Date Received "
                                    v-bind:previewText="detail_secondDose"
                                />
                            </li>
                            <li>
                                <hr/>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 1 Brand Name"
                                    v-bind:previewText="detail_cv_booster1"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 1 Date Received"
                                    v-bind:previewText="detail_first_doseBooster"
                                />
                            </li>
                            <li>
                                <hr/>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 2 Brand Name"
                                    v-bind:previewText="detail_cv_booster2"
                                />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Vaccine Booster 2 Date Received"
                                    v-bind:previewText="detail_second_doseBooster"
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
                    <div class="col-12 mt-4 border-top container-fluid p-3 irc_div">
                        <h6 class="text-bold mt-3">Information Registration Consent:</h6>
                        <div class="form-check">
                            <ErrorMessage name="checkbox1" class="text-danger"/>
                        </div>
                        <div class="form-check">
                            <CheckBox 
                                    CheckBoxName="checkbox1"
                                    CheckBoxValue="checked"
                                    v-model:input="checkbox1"
                                    :onChange="wasChecked"
                            />
                            <label class="form-check-label" for="flexCheckDefault">
                                I certify that the information provided in my registration is true and correct to the best of my knowledge and understand that any dishonest answer may cause delay in the process of my medical examination.
                            </label>
                        </div>
                        <div class="form-check">
                            <ErrorMessage name="checkbox2" class="text-danger"/>
                        </div>
                        <div class="form-check mt-2">
                            <CheckBox 
                                    CheckBoxName="checkbox2"
                                    CheckBoxValue="checked"
                                    v-model:input="checkbox2"
                                    :onChange="wasChecked"
                            />
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
                    btnText="Edit"
                    @click="handleBack"
                />
                <SubmitFormButton 
                    btnType="submit"
                    className="btn btn-primary w-25"
                    btnText="Submit"
                    v-bind:disabled="isButtonDisabled"
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