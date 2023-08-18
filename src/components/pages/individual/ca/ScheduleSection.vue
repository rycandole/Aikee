<script setup>
    import axios from 'axios'
    import { onMounted } from 'vue'
    import { ref, watch } from 'vue'
    import { useRouter } from 'vue-router'
    import { use_TRIPLETS_MNL_Holidates } from '@/store/triplets-holidates-mnl'
    import { use_TRIPLETS_BGC_Holidates } from '@/store/triplets-holidates-bgc'
    import { useCAIndividualSched } from '@/store/ca-individual-sched'
    import { Form } from 'vee-validate'
    import { ErrorMessage } from 'vee-validate'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import InlineDatePicker from '@/components/global/InlineDatepicker.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import RadioBtnSched from '@/components/global/RadioBtnSched.vue'
    import RequiredSelectField from '@/components/global/RequiredSelectField.vue'
    import Swal from '@/sweetalert2'
    // import Datepicker from '@/datepicker.js'
    import moment from 'moment'
    import * as yup from 'yup';
    
    
    const router = useRouter()
    const CAIndividualSched = useCAIndividualSched()
    const TRIPLETS_MNL_Holidates = use_TRIPLETS_MNL_Holidates()
    const TRIPLETS_BGC_Holidates = use_TRIPLETS_BGC_Holidates()
  

    let currentDate = ref(null)

    // Get the current year
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDay = new Date().getDate() + 1
    const currentMonthIfDayIsThirtyTwo = new Date().getMonth() + 2

    if (currentDay === 32) {
        currentDate = currentYear+", "+currentMonthIfDayIsThirtyTwo+", "+ 1;
    } else {
        currentDate = currentYear+", "+currentMonth+", "+currentDay;
    }
    
    // GET THE DATE 3 MONTHS FROM NOW
    let d = new Date(new Date().setMonth(new Date().getMonth() + 2))
    let formatted_d = moment(d).format('YYYY, MM, DD')

    let clinic_location = ref(null)
    let dateInput = ref(null)
    let timeInput = ref(null)
    let timeSched = ref(null)
    let timeSlots = ref([])
    let countryValue = ref(null)
    let branchValue = ref(null)
    let hasBranch = true

    let branch = ""
    let textSuccess = "text-success"
    let selectIsActive = true

    const clinics = ['Ermita, Manila', 'Bonifacio Global City'] 
    const clinic_code = new Map([
                                ['', null],
                                ['Ermita, Manila', 'MNL'],
                                ['Bonifacio Global City', 'BGC']
                                ])

    onMounted(async () => {
        await TRIPLETS_MNL_Holidates.fetchHolidaysByCountryAndBranch('CA', 'MNL')
        await TRIPLETS_BGC_Holidates.fetchHolidaysByCountryAndBranch('CA', 'BGC')
        handleSlots();
        handleDateTime();
        selectIsActive = false
    })

    watch(() => clinic_location.value, (newValue) => {
        newValue = clinic_code.get(newValue)
        
        if (newValue == 'MNL') {
            branch = newValue
            hasBranch = false
            dateInput.value = ""
            timeSched.value = ""
            timeInput.value = ""
        } else if (newValue == 'BGC') { 
            branch = newValue
            hasBranch = false
            dateInput.value = ""
            timeSched.value = ""
            timeInput.value = ""
        } else {
            branch = ""
            hasBranch = true
        }
        
    }) // { immediate: true }

    const holiday_mnl = TRIPLETS_MNL_Holidates.holidays
    const holiday_bgc = TRIPLETS_BGC_Holidates.holidays

    const full_dates_mnl = TRIPLETS_MNL_Holidates.full_dates
    const full_dates_bgc = TRIPLETS_BGC_Holidates.full_dates

    const mnl_lockedDates = [];  
    const bgc_lockedDates = [];

    // Fetch Holidays on MNL branch
    for (let a = 0; a <= holiday_mnl.length - 1; a++) {
        mnl_lockedDates.push(new Date(holiday_mnl[a].preferred_date))
    }
    for (let a = 0; a <= full_dates_mnl.length - 1; a++) {
        mnl_lockedDates.push(new Date(full_dates_mnl[a].PreferredMedicalExamDate))
    }
    // ======= Emd =============== //

    // Fetch Holidays on BGC branch
    for (let a = 0; a <= holiday_bgc.length - 1; a++) {
        bgc_lockedDates.push(new Date(holiday_bgc[a].preferred_date))
    }
    for (let a = 0; a <= full_dates_bgc.length - 1; a++) {
        bgc_lockedDates.push(new Date(full_dates_bgc[a].PreferredMedicalExamDate))
    }
    // ======= Emd =============== //

    // =========== Inline Date ==================== //
    // MNL
    const disableState_MNL = {
        // months start's to 0(January) - 11(December) 
        disabledDates: {
            to: new Date(currentDate), // Disable all dates up to specific date
            from: new Date(formatted_d),
            days: [0,6],
            dates: mnl_lockedDates,
            preventDisableDateSelection: true
        }
    }
    // BGC
    const disableState_BGC = {
        // months start's to 0(January) - 11(December) 
        disabledDates: {
            to: new Date(currentDate), // Disable all dates up to specific date
            from: new Date(formatted_d),
            days: [0,6],
            dates: bgc_lockedDates,
            preventDisableDateSelection: true
        }
    }
    // ========== End of Inline Date =============== //

    const handleSlots = async () => {
        const prefDate = moment(dateInput.value).format('YYYY-MM-DD')
        countryValue = 'CA'
        branchValue = clinic_code.get(clinic_location.value)

        const JSONdata = {
            date: prefDate,
            country: countryValue,
            branch: branchValue
        }

        let res = await axios.post('check_slots/', JSONdata)

        timeSlots = res.data.slot
        timeSched.value = timeSlots
    }

    const handleDateTime = async () => {
        const date = moment(dateInput.value).format('YYYY-MM-DD')

        const jsonDATA = {
            branch: clinic_code.get(clinic_location.value),
            country: "CA",
            date: date,
            time: timeInput.value,
            timer: moment(new Date().getTime()).add(30, "minutes"),
        }

        let save_slot = await axios.post("save_slot/", jsonDATA);
        let res = JSON.stringify(jsonDATA)

        CAIndividualSched.setCAIndividualSched(res)

        if (save_slot.data.status_code === 200) {
            router.push('/individual/ca/applicant-details')
        } else if(save_slot.data.status_code === 400) {
            Swal.fire("Changes are not saved", save_slot.data.message, "error");
        } else {
            Swal.fire(save_slot.data.message, save_slot.data.error, "error");
        }
        
    }

    const handleBack = () => {

        Swal.fire({
            title: 'Are you sure you want to go back?',
            text: 'The details you filled up will be gone.',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            icon: "question",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                router.push('/individual/ca')

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    const schema = yup.object().shape({
        clinic_location: yup.string().required('Please select preferred clinic'),
        timeInput: yup.string().required('Please select preferred time')
    })

</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <Form @submit="handleDateTime" :validation-schema="schema" class="wrapper_container row bg-white border">
       
        <div class="col-lg-12 col-md-12 col-12">
            <h1 class="text-secondary text-center fs-1 fw-bold" >Canada Online Registration</h1>
        </div>
        
            <div class="col-lg-3 col-md-12 col-sm-12">
                <SideNav 
                    :className="textSuccess ? textSuccess : 'text-secondary'"
                     className1="text-secondary"
                     className2="text-secondary"
                />
            </div>
       
          <div class="col-lg-9 col-md-12 col-sm-12 mb-3 max-width-75">
                <FormHeader
                    headerText="Medical Examination Schedule"
                />
                <div class="card-body">
                    <div class="mb-4">
                        <div class="row">
                            <div :hidden="selectIsActive" class="col-lg-10 col-md-12 col-sm-12 mb-5">
                                <RequiredSelectField 
                                    label="Please select your preferred St. Luke's Extension Clinic location"
                                    FieldName="clinic_location"
                                    ErrorName="clinic_location"
                                    className="w-75"
                                    v-model:input="clinic_location"
                                    :items="clinics"
                                />
                                <!-- :onChange="handleBranch" -->
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12" :hidden="hasBranch">
                                <InlineDatePicker 
                                    label="Preferred Date"
                                    :disabledDate="branch === 'MNL' ? disableState_MNL.disabledDates : disableState_BGC.disabledDates"
                                    v-model:input="dateInput"
                                    :onChange="handleSlots"
                                />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12" :hidden="hasBranch">
                                <div class="row">
                                    <div class="col-12 mt-3">
                                        <label class="text-capitalize text-dark">
                                            Preferred Time
                                        </label>
                                        <br/><hr/> 
                                    </div>
                                    <div v-for="(row, index) in timeSched" :key="index" class="col-12">
                                           <RadioBtnSched
                                                :RadioLabel="`${row.time_slot}`"
                                                :RadioLabelClass="`${row.slot_limit - row.slot_acquired}` <= 0 ? 'text-body-tertiary' : ''"
                                                :StatusLabel="`${row.slot_limit - row.slot_acquired}` > 0 ? 'Available | ' : 'Not Available'"
                                                :Slots="`${row.slot_limit - row.slot_acquired}` <= 1 ?`${row.slot_limit - row.slot_acquired} slot` : `${row.slot_limit - row.slot_acquired} slots`" 
                                                :spanClassName="`${row.slot_limit - row.slot_acquired}` > 0 ? 'text-success' : 'text-danger'"
                                                :inputId="`${row.slot_limit - row.slot_acquired}` < 0 ? 'flexRadioDefault1' : 'flexRadioDisabled'"
                                                :radioBtnStatus="`${row.slot_limit - row.slot_acquired}` > 0 ? false : true"
                                                RadioBtnName="timeInput"
                                                v-model:input="timeInput"
                                                :RadioValue="`${row.time_slot}`"
                                            />
                                    </div>
                                    
                                    <div class="col-12 pt-3">
                                        <ErrorMessage name="timeInput" class="text-danger ml-5 pl-3 pt-3"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12"></div>

            <div class="col-lg-9 col-md-12 col-sm-12 d-flex justify-content-center">
                <SubmitFormButton 
                    btnType="button"
                    className="btn btn-secondary w-25 mr-5"
                    btnText="Back"
                    @click="handleBack"
                />
                <SubmitFormButton 
                    btnType="submit"
                    className="btn btn-primary w-25"
                    btnText="Next"
                />
            </div>
        </Form>
    <!-- ============================================================== -->
                            <!-- End of Main Container -->
    <!-- ============================================================== -->
</template>

<style lang="scss">
.wrapper_container {
    margin: 0;
    margin-top: 1rem;
    width: 100%;
    padding: 0;
}

.inputDate {
    width: 100%;
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
