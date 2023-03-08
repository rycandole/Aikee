<script setup>
    // import axios from 'axios'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUSIndividualSched } from '@/store/us-individual-sched'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import FormHeader from '@/components/global/FormHeader.vue'
    import ScheduleDate from '@/components/global/ScheduleDate.vue'
    // import ScheduleTime from '@/components/global/ScheduleTime.vue'
    import SideNav from '@/components/pages/individual/includes/SideNav.vue'
    import Swal from '@/sweetalert2'


    const router = useRouter()
    const USIndividualSched = useUSIndividualSched()

    const options = ref([
        { id: 0, name: 'shirt', value: 'shirt'},
        { id: 1, name: 'jacket', value: 'jacket'},
        { id: 2, name: 'shoes', value: 'shoes'}
    ])

    let dateInput = ref(null)
    let timeInput = ref(null)

    let textSuccess = "text-success"
    // let textSuccess1 = "text-success"
    // let textSuccess2 = "text-success"


    const handleBack = () => {

        Swal.fire({
            title: 'Are you sure you want to go back?',
            text: 'The details you filled up will be gone.',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                router.push('/individual/us')

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }


    const handleDateTime = async () => {

        const jsonDATA = {
                date: dateInput.value,
                time: timeInput.value
        }

        let res = JSON.stringify(jsonDATA)

        USIndividualSched.setUSIndividualSched(res)

        router.push('/individual/us/applicant-details')
        
    }
    
</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <form @submit.prevent="handleDateTime">
    <div class="wrapper_container row bg-white border">
        <div class="col-lg-12 col-md-12 col-12">
            <h1 class="text-secondary text-center fs-1 fw-bold" >U.S.A. Online Registration</h1>
        </div>
        
            <div class="col-lg-3 col-md-12 col-sm-12">
                <SideNav 
                    :className="textSuccess ? textSuccess : 'text-secondary'"
                    :className1="textSuccess1 ? textSuccess1 : 'text-secondary'"
                    :className2="textSuccess2 ? textSuccess2 : 'text-secondary'"
                />
            </div>
       
            <div class="col-lg-9 col-md-12 col-sm-12 mb-3 max-width-75">
                <FormHeader
                    headerText="Medical Examination Schedule"
                />
                <div class="card-body">
                    <div class="mb-4">
                      
                      <ScheduleDate 
                        dateLabel="Preferred Date of Medical examination"
                        v-model:input="dateInput"
                      />
                      <!-- <ScheduleTime 
                        timeLabel="Preferred Time of Medical examination"
                        v-model:input="timeInput"
                      /> -->
                       <!-- ====================== Time Input ======================== -->
                      <div class="row mt-3 p-3">
                            <div class="col-12 mt-3">
                                <label class="text-capitalize">Preferred Time of Medical examination</label>
                            </div>
                            <div class="col-12 input-group">
                                <select class="form-control form-select" v-model="timeInput" aria-label="Default select example">
                                    <!-- <option selected></option> -->
                                    <option v-for="option in options" :key="option" :value="option.value">
                                        {{ option.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <!-- =================== End of Time Input ==================== -->

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
        </div>
        </form>
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