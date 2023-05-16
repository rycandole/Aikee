<script setup>
    // import axios from 'axios'
    import { onMounted } from 'vue'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useCAIndividualSched } from '@/store/ca-individual-sched'
    // import {  useSlotStore  } from "@/store/slot-store"
    import {  useSlot_CA  } from "@/store/ca-slot-store"
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
    const CA_SlotStore = useSlot_CA()

    // Get the current year
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDay = new Date().getDate() + 1

    let currentDate = currentYear+", "+currentMonth+", "+currentDay;
    const clinics = ['Ermita, Manila', 'Bonifacio Global City'] 
    const clinic_code = new Map([
                                ['', null],
                                ['Ermita, Manila', 'MNL'],
                                ['Bonifacio Global City', 'BGC']
                                ])

    // GET THE DATE 3 MONTHS FROM NOW
    let d = new Date(new Date().setMonth(new Date().getMonth() + 2))
    let formatted_d = moment(d).format('YYYY, MM, DD')


    // =========== Inline Date ==================== //
    const disableState = {
        // months start's to 0(January) - 11(December) 
        disabledDates: {
            to: new Date(currentDate), // Disable all dates up to specific date
            from: new Date(formatted_d),
            days: [0,6],
            dates: [ // Disable an array of dates
                new Date(2023, 3, 6),
                new Date(2023, 3, 7),
                new Date(2023, 3, 22),
                new Date(2023, 3, 21),
            ],
            preventDisableDateSelection: true
        }
    }
    // ============ End of Inline Date =============== //
    
    let clinic_location = ref(null)
    let dateInput = ref(null)
    let timeInput = ref(null)
    let timeSched = ref(null)
    let timeSlots = ref([])
    let country = ref(null)
    let branch = ref(null)
    let hasBranch = true
    // let sevenAM = ref(null)

    // let textSuccess = "text-success"
    const schema = yup.object().shape({
        clinic_location: yup.string().required('Please select preferred clinic'),
        timeInput: yup.string().required('Please select preferred time')
    })

    const handleBranch = () => {
        // branch = clinic_code.get(clinic_location.value)

        if(clinic_code.get(clinic_location.value) === null) {
            hasBranch = true
        } else {
            hasBranch = false
        }
        
    }

    const handleSlots = async () => {
        const date = moment(dateInput.value).format('YYYY-MM-DD')
        country = 'CA'
        branch = clinic_code.get(clinic_location.value)

        await CA_SlotStore.fetchSlotByDate_CA(date, country, branch)

        onMounted(async () => {
            await CA_SlotStore.fetchSlotByDate_AU(date)
        })
       
        timeSlots = CA_SlotStore.slots

        timeSched = timeSlots
    }

    const handleDateTime = async () => {
        const date = moment(dateInput.value).format('YYYY-MM-DD')

        const jsonDATA = {
                clinic: clinic_location.value,
                date: date,
                time: timeInput.value
        }

        let res = JSON.stringify(jsonDATA)

        CAIndividualSched.setCAIndividualSched(res)

        router.push('/individual/ca/applicant-details')
        
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

                router.push('/individual/au')

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
                            <div class="col-12 mb-5">
                                <RequiredSelectField 
                                    label="Please select your preferred St. Luke's Extension Clinic location"
                                    FieldName="clinic_location"
                                    ErrorName="clinic_location"
                                    className="w-75"
                                    v-model:input="clinic_location"
                                    :items="clinics"
                                    :onChange="handleBranch"
                                />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12" :hidden="hasBranch">
                                <InlineDatePicker 
                                    label="Preferred Date"
                                    :disabledDate="disableState.disabledDates"
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
                                                :RadioLabelClass="`${row.slot_limit}` <= 0 ? 'text-body-tertiary' : ''"
                                                :StatusLabel="`${row.slot_limit}` > 0 ? 'Available | ' : 'Not Available'"
                                                :Slots="`${row.slot_limit}` > 0 ?`${row.slot_limit} slot` : ''" 
                                                :spanClassName="`${row.slot_limit}` > 0 ? 'text-success' : 'text-danger'"
                                                :inputId="`${row.slot_limit}` < 0 ? 'flexRadioDefault1' : 'flexRadioDisabled'"
                                                :radioBtnStatus="`${row.slot_limit}` > 0 ? false : true"
                                                RadioBtnName="timeInput"
                                                v-model:input="timeInput"
                                                :RadioValue="`${row.time_slot}`"
                                            />
                                    </div>
                                    
                                    <div class="col-12">
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
