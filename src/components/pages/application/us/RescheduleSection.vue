<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from "vue-router";
// import { useUSIndividualSched } from "@/store/us-individual-sched";
import { useUSHolidates } from "@/store/us-holidates";
import { Form } from 'vee-validate'
import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
import FormHeader from '@/components/global/FormHeader.vue'
import InlineDatePicker from "@/components/global/InlineDatepicker.vue";
import RadioBtnSched from "@/components/global/RadioBtnSched.vue";
import Swal from '@/sweetalert2'
import { ErrorMessage } from 'vee-validate'
import moment from 'moment'
import * as yup from 'yup';

const router = useRouter();
const route = useRoute();
const regId = route.params.id;
// const USIndividualSched = useUSIndividualSched();
const USHolidates = useUSHolidates();

let currentDate = ref(null);

// Get the current year
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate() + 1;
const currentMonthIfDayIsThirtyTwo = new Date().getMonth() + 2;

if (currentDay === 32) {
  currentDate = currentYear + ", " + currentMonthIfDayIsThirtyTwo + ", " + 1;
} else {
  currentDate = currentYear + ", " + currentMonth + ", " + currentDay;
}

// GET THE DATE 3 MONTHS FROM NOW
let d = new Date(new Date().setMonth(new Date().getMonth() + 3));
let formatted_d = moment(d).format("YYYY, MM, DD");

let dateInput = ref(null);
let timeInput = ref(null);
let timeSched = ref(null);
let timeSlots = ref([]);
let ad_last_name = ref(null);
let ad_first_name = ref(null);
let ad_middle_name = ref(null);
let pay_code = ref(null);
let name = ref(null);
let preferred_date = ref(null);
let time_slot = ref(null)
let current_schedule = ref(null);
let arrived = ref(null);

/**
 * For Fetching user data
 */
onMounted(async () => {
  handleSlots();
  showInformation();
  await USHolidates.fetchHolidaysByCountryAndBranch("US", "MNL");
})

// Fetch Info //
const showInformation = async () => {
  let res = await axios.get("us-show/" + regId);

  let showApplication = res.data.result;

  for (var i = 0; i < showApplication.length; i++) {
    ad_last_name.value = showApplication[i].LastName || "";
    ad_first_name.value = showApplication[i].FirstName || "";
    ad_middle_name.value = showApplication[i].MiddleName || "";
    time_slot.value = showApplication[i].priorityTime;
    preferred_date.value = showApplication[i].PreferredMedicalExamDate;
    arrived.value = showApplication[i].Seen;

    pay_code.value = showApplication[i].PayCode || "";
    name.value = ad_last_name.value+", "+ad_first_name.value+" "+ad_middle_name.value
    current_schedule.value = moment(preferred_date.value).format("LL")+" | "+time_slot.value
   
  }

  
};
// ========= //

const holidays = USHolidates.holidays;
const full_dates = USHolidates.full_dates;
const lockedDates = [];

for (let a = 0; a <= holidays.length - 1; a++) {
  lockedDates.push(new Date(holidays[a].preferred_date));
}

for (let a = 0; a <= full_dates.length - 1; a++) {
  lockedDates.push(new Date(full_dates[a].PreferredMedicalExamDate));
}

const handleSlots = async () => {
  const prefDate = moment(dateInput.value).format("YYYY-MM-DD");
  timeInput.value = ""

  const JSONdata = {
    date: prefDate,
    country: "US",
  };

  let res = await axios.post("check_slots/", JSONdata);

  timeSlots = res.data.slot;
  timeSched.value = timeSlots;
};

// =========== Inline Date ==================== //
const disableState = {
  // months start's to 0(January) - 11(December)
  disabledDates: {
    to: new Date(currentDate), // Disable all dates up to specific date
    from: new Date(formatted_d),
    days: [0, 6],
    dates: lockedDates,
    preventDisableDateSelection: true,
  },
};
// ============ End of Inline Date =============== //

const handleDateTime = async () => {
  const date = moment(dateInput.value).format("YYYY-MM-DD");

  const confirmedSchedule = async () => {
      const requestPAYLOAD = {
          branch: "MNL",
          country: "US",
          date: date,
          current_date: preferred_date.value,
          time: timeInput.value,
          current_time: time_slot.value,
          paycode: pay_code.value,
          id: regId
        }; 
        let save_slot = await axios.post("update_slot/", requestPAYLOAD);
        let status_code = save_slot.data.status_code;
        let error_msg = save_slot.data.error_msg;
        let message = save_slot.data.message;

        if (status_code == 200) {
          Swal.fire(error_msg, message, "success");
          router.push("/application/show/US/"+regId+"/"+pay_code.value);
        } else if (status_code === 400) {
          Swal.fire(error_msg, message, "error");
        } else {
          Swal.fire(error_msg, message, "error");
        }
    }

  Swal.fire({
    title: "Are you sure you want to change the schedule?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    icon: "question",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      
      confirmedSchedule();
      
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });

  
};

const handleBack = () => {
  Swal.fire({
    title: "Are you sure you want to go back?",
    text: "The details you filled up will be gone.",
    showCancelButton: true,
    confirmButtonText: "Yes",
    icon: "question",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      router.push("/application");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

const schema = yup.object().shape({
  timeInput: yup.string().required("Please select preferred time"),
});

</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-2">
            <h1 class="text-secondary text-center fs-1 fw-bold" >Choose New Schedule</h1>
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->
        <Form
          @submit="handleDateTime"
          :validation-schema="schema"
          class="w-100"
        >
          <div class="col-12 mb-3">
            <FormHeader headerText="Medical Examination Schedule" />
            <div class="card-body">
              <div class="mb-4">
                <div class="row">
                  <div class="col-12 border-bottom">
                    <h5>Subscriber No: <a class="text-primary">{{ pay_code }}</a></h5>
                    <h5>Name: <a class="text-primary">{{ name }}</a></h5>
                    <h5>Current Schedule: <a class="text-primary">{{ current_schedule }}</a></h5>
                  </div>
                  <div :hidden="arrived == 1 ? true : false" class="col-lg-6 col-md-6 col-sm-12">
                    <InlineDatePicker
                      label="Preferred Date"
                      :disabledDate="disableState.disabledDates"
                      v-model:input="dateInput"
                      :onChange="handleSlots"
                    />
                  </div>
                  <div :hidden="arrived == 1 ? true : false" class="col-lg-6 col-md-6 col-sm-12">
                    <div class="row">
                      <div class="col-12 mt-3">
                        <label class="text-capitalize text-dark">
                          Preferred Time <b class="text-danger p-1">*</b>
                        </label>
                        <br />
                        <hr />
                      </div>
                      <div v-for="(row, index) in timeSched" :key="index" class="col-12">
                        <RadioBtnSched
                          :RadioLabel="`${row.time_slot}`"
                          :RadioLabelClass="
                            `${row.slot_limit - row.slot_acquired}` <= 0
                              ? 'text-body-tertiary'
                              : ''
                          "
                          :StatusLabel="
                            `${row.slot_limit - row.slot_acquired}` > 0
                              ? 'Available | '
                              : 'Not Available'
                          "
                          :Slots="
                            `${row.slot_limit - row.slot_acquired}` <= 1
                              ? `${row.slot_limit - row.slot_acquired} slot`
                              : `${row.slot_limit - row.slot_acquired} slots`
                          "
                          :spanClassName="
                            `${row.slot_limit - row.slot_acquired}` > 0
                              ? 'text-success'
                              : 'text-danger'
                          "
                          :inputId="
                            `${row.slot_limit - row.slot_acquired}` < 0
                              ? 'flexRadioDefault1'
                              : 'flexRadioDisabled'
                          "
                          :radioBtnStatus="
                            `${row.slot_limit - row.slot_acquired}` > 0 ? false : true
                          "

                          RadioBtnName="timeInput"
                          v-model:input="timeInput"
                          :RadioValue="`${row.time_slot}`"
                        />
                        <!-- `${row.slot_acquired}` -->
                      </div>
      
                      <div class="col-12 pt-3">
                        <ErrorMessage name="timeInput" class="text-danger ml-5 pl-3 pt-3" />
                      </div>
                    </div>
                  </div>
                  <div class="col-12 p-5" :hidden="arrived == 1 ? false : true">
                    <h2 class="text-danger text-center">This application was already arrived. Rescheduling is not available!</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-sm-12"></div>
      
          <div  class="col-12 d-flex justify-content-center">
            <SubmitFormButton
              :hidden="arrived == 1 ? true : false"
              btnType="button"
              className="btn btn-secondary w-25 mr-5"
              btnText="Back"
              @click="handleBack"
            />
            <SubmitFormButton
              :hidden="arrived == 1 ? true : false"
              btnType="submit"
              className="btn btn-primary w-25"
              btnText="Save"
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
