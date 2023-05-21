<script setup>
    import axios from 'axios'
    import { ref } from 'vue'
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '@/store/profile-store'
    import { useCAIndividualSched } from '@/store/ca-individual-sched.js'
    import { useCAIndividualDetails } from '@/store/ca-individual-details.js'
    import { useSlot_CA } from '@/store/ca-slot-store.js'
    import { ErrorMessage } from 'vee-validate'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import PreviewText from '@/components/global/PreviewText.vue'
    import PreviewSmallText from '@/components/global/PreviewSmallText.vue'
    import CheckBox from '@/components/global/CheckBox.vue'
    import Swal from '@/sweetalert2'
    import moment from 'moment'
    import * as yup from 'yup'

    
    // import { ucwords } from '../../../assets/js/string_functions'

    const router = useRouter()
    const profileStore = useProfileStore()
    const CA_IndividualSched = useCAIndividualSched()
    const CA_IndividualDetails = useCAIndividualDetails()
    const CA_SlotStore = useSlot_CA()
    const schedule = JSON.parse(localStorage.getItem('ca-individual-sched'))
    const details = JSON.parse(localStorage.getItem('ca-individual-details'))



    /**
     * For Fetching user data
     */
    onMounted(async () => {
        await profileStore.fetchProfileById(router.params.id)
    })


    let errors = ref([])
    let user_id = profileStore.id
    let textSuccess = "text-success"
    let textSuccess1 = "text-success"
    let textSuccess2 = "text-success"
    let isButtonDisabled = true
    let checkbox1 = ref(null)
    let checkbox2 = ref(null)
    let branch = ref(null)
    

    const wasChecked = () => {
        if(checkbox1.value == 'checked' && checkbox2.value == 'checked') {
            isButtonDisabled = false
        } else {
            isButtonDisabled = true
        }
    }


    // Schedule Store
    let sched_date = moment(schedule.date).format('LL');
    let sched_time = schedule.time
    let sched_branch = schedule.clinic

    let wasFirstMedExam = details.wasFirstMedicalExam
    let prevClinic = details.prevClinicName
    let prevCategory = details.prevCategory
    let passportNumber = details.passportNumber
    let issuedCountry = details.issuedCountry
    let issuedDate = moment(details.issuedDate).format('LL');
    let lastName = details.ad_lastName
    let firstName = details.ad_firstName
    let middleName = details.ad_middleName
    let alias_lastName = details.alias_lastName
    let alias_firstName = details.alias_firstName
    let alias_middleName = details.alias_middleName
    let motherLastName = details.mother_lastName
    let motherFirstName = details.mother_firstName
    let motherdiddleName = details.mother_middleName
    let birthDate = moment(details.dob).format('LL');
    let gender = details.gender
    let civilStatus = details.civil_status
    let nationality = details.nationality
    let contactNo = details.contactNumber
    let emailAdd = details.email
    let street = details.street
    let barangay = details.barangay
    let city = details.city
    let province = details.provinceField
    let postalCode = details.postalCode
    let applicantCategory = details.applicantCategory
    let fileNumber = details.fileNumber
    let agencyField = details.agencyField


    const schema = yup.object({
        checkbox1: yup.string().required('Please check the check box to proceed'),
        checkbox2: yup.string().required('Please check the check box to proceed')
    })

    if(sched_branch === 'Ermita, Manila') {
        branch = 'MNL'
    } else {
        branch = 'BGC'
    }
    

    const handleDetails = async () => {

        errors.value = []

        const JSONdata = {
                json_userId: user_id,
                json_sched_date: schedule.date,
                json_sched_time: sched_time,
                json_sched_branch: branch,
                json_wasFirstMedExam: wasFirstMedExam,
                json_prevClinic: prevClinic,
                json_prevCategory: prevCategory,
                json_passportNumber: passportNumber,
                json_issuedCountry: issuedCountry,
                json_issuedDate: details.issuedDate,
                json_lastName: lastName,
                json_firstName: firstName,
                json_middleName: middleName,
                json_alias_lastName: alias_lastName,
                json_alias_firstName: alias_firstName,
                json_alias_middleName: alias_middleName,
                json_motherLastName: motherLastName,
                json_motherFirstName: motherFirstName,
                json_motherdiddleName: motherdiddleName,
                json_birthDate: details.dob,
                json_gender: gender,
                json_civilStatus: civilStatus,
                json_nationality: nationality,
                json_contactNo: contactNo,
                json_emailAdd: emailAdd,
                json_street: street,
                json_barangay: barangay,
                json_city: city,
                json_province: province,
                json_postalCode: postalCode,
                json_applicantCategory: applicantCategory,
                json_fileNumber: fileNumber,
                json_agency: agencyField,
        }

        console.log(JSONdata)

        try {

            let res = await axios.post('ca-individual/', JSONdata)

            if (res.request.status === 200 ) {

                Swal.fire(res.data.message, '', 'success')
                // alert('Success '+ res.data.response +' - '+ res.data.sched)

                CA_IndividualSched.clearCAIndividualSched()
                CA_IndividualDetails.clearCAIndividualDetails()
                CA_SlotStore.clearSlot_CA()

                router.push(process.env.BASE_URL +"")
                
            } else {
                // alert('Reject, '+ res.data.error +', '+ res.data.message)
                Swal.fire('There is something wrong.', 'Please check the fields or contact the administrator', 'info')
                console.log('Reject, '+ res.data.error +', '+ res.data.message)
            }

            // console.log(res)

        } catch (err) {
            errors.value = err.response.data.errors
            Swal.fire(err.response.data.message, '', 'error')
            console.log(errors.value)
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

                router.push('/individual/ca/applicant-details')

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
        <Form @submit.prevent="handleDetails" :validation-schema="schema" class="col-lg-9 col-md-12 col-sm-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Medical Examination Schedule"
                        />
                    </div>
                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Preferred Clinic Location"
                            v-bind:previewText="sched_branch"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Preferred Date of Medical examination"
                            v-bind:previewText="sched_date"
                        />
                        
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-8 col-md-12 col-sm-12 mb-3">
                        <PreviewText 
                            previewLabel="Preferred Time of Medical examination"
                            v-bind:previewText="sched_time"
                        />
                    </div>
                    <div class="col-12"><hr /></div>

                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Is this your first medical examination for the Canadian Embassy? "
                            v-bind:previewText="wasFirstMedExam == 'N' ? 'No' : 'Yes' "
                        />
                    </div>
                    <div class="col-12 pl-5">
                        <div class="row">
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <PreviewText 
                                    previewLabel="Name of Clinic and Year of Visa Medical Examination"
                                    v-bind:previewText="prevClinic"
                                />
                            </div>
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <PreviewText 
                                    previewLabel="Category applied for"
                                    v-bind:previewText="prevCategory"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Passport Number"
                            v-bind:previewText="passportNumber"
                        />
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Country of Issue"
                            v-bind:previewText="issuedCountry"
                        />
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12 mb-3">
                        <PreviewText 
                            previewLabel="Date of Issue"
                            v-bind:previewText="issuedDate"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="APPLICANT DETAILS"
                        />
                    </div>
                    <div class="col-12">
                        <ol>
                            <li>
                                <PreviewText 
                                    previewLabel="Applicant's Name"
                                />
                            </li>
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="lastName"
                                        smallLabel="Last Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="firstName"
                                        smallLabel="First Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="middleName"
                                        smallLabel="Middle Name"
                                    />
                                </div>
                            </div>
                            <hr />
                            <li>
                                <PreviewText 
                                    previewLabel="ALIAS/A.K.A. Name on Passport, if any."
                                />
                            </li>
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="alias_lastName"
                                        smallLabel="Last Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="alias_firstName"
                                        smallLabel="First Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="alias_middleName"
                                        smallLabel="Middle Name"
                                    />
                                </div>
                            </div>
                            <hr />
                            <li>
                                <PreviewText 
                                    previewLabel="Mother's Maiden Name (Last Name, First Name, Middle Name)"
                                />
                                <div class="row">
                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="motherLastName"
                                            smallLabel="Last Name"
                                        />
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="motherFirstName"
                                            smallLabel="First Name"
                                        />
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="motherdiddleName"
                                            smallLabel="Middle Name"
                                        />
                                    </div>
                                </div>
                                <hr />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Applicant's Date of Birth"
                                    v-bind:previewText="birthDate"
                                />
                                <hr/>
                            </li>
                            <li>
                                <div class="row">
                                    <div class="col-6">
                                        <PreviewText 
                                            previewLabel="Gender"
                                            v-bind:previewText="gender == 'M' ? 'Male' : 'Female'"
                                        />
                                    </div>
                                    <div class="col-6">
                                        <PreviewText
                                            previewLabel="Civil Status"
                                            v-bind:previewText="civilStatus"
                                        />
                                    </div>
                                </div>
                                <hr/>
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Country of Nationality"
                                    v-bind:previewText="nationality"
                                />
                                <hr/>
                            </li>
                            <li>
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewText 
                                            previewLabel="Contact Number"
                                            v-bind:previewText="contactNo"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewText 
                                            previewLabel="Email Address"
                                            v-bind:previewText="emailAdd"
                                        />
                                    </div>
                                </div>
                                <hr/>
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Residential Address"
                                />
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="street"
                                            smallLabel="Street"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="barangay"
                                            smallLabel="Barangay"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="city"
                                            smallLabel="City"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="province"
                                            smallLabel="Province"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="postalCode"
                                            smallLabel="Postal Code"
                                        />
                                    </div>
                                    
                                </div>
                                <hr/>
                            </li>
                        </ol>
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="VISA APPLICATION INFORMATION"
                        />
                    </div>
                    <div class="col-12">
                        <div class="row pb-3"> 
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <PreviewText 
                                    previewLabel="Category of Applicant"
                                    v-bind:previewText="applicantCategory"
                            />
                            </div>
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <PreviewText 
                                    previewLabel="File Number/IME"
                                    v-bind:previewText="fileNumber"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="ADDITIONAL QUESTIONS"
                        />
                    </div>
                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Agency"
                            v-bind:previewText="agencyField"
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
                                I understand that ST. LUKE'S MEDICAL CENTER EXTENSION CLINIC needs to collect my personal information for the conduct of my medical examination required for my Australia Visa Application. For this purpose, the information will be shared to Immigration, Refugees and Citizenship Australia. The information provided shall be processed and retained in accordance with the Data Privacy Act of 2012.
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