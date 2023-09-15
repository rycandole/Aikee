<script setup>
import axios from "axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useProfileStore } from "@/store/profile-store";
// import { useUSHolidates } from "@/store/us-holidates";
// import { use_TRIPLETS_MNL_Holidates } from '@/store/triplets-holidates-mnl'
// import { use_TRIPLETS_BGC_Holidates } from '@/store/triplets-holidates-bgc'
import Swal from "@/sweetalert2";
import moment from "moment";

const profileStore = useProfileStore();
// const USHolidates = useUSHolidates();
// const TRIPLETS_MNL_Holidates = use_TRIPLETS_MNL_Holidates()
// const TRIPLETS_BGC_Holidates = use_TRIPLETS_BGC_Holidates()

let user_id = profileStore.id;

let showApplication = ref([]);
let showApplication1 = ref([]);
let USList = ref(null);
let TripletsList = ref(null);
// let status_code = ref(null);
let listCount = ref(null);
// let country_list = ["CA", "AU", "NZ", "KR", "FK", "LV", "MU"];

onMounted(async () => {
  showList();
  // await USHolidates.fetchHolidaysByCountryAndBranch("US", "MNL");

  // for (let i = 0; i <= 6; i++) {
  //   await TRIPLETS_MNL_Holidates.fetchHolidaysByCountryAndBranch(country_list[i], 'MNL')
  //   await TRIPLETS_BGC_Holidates.fetchHolidaysByCountryAndBranch(country_list[i], 'BGC')
  // }

});

// ============= For displaying list of applications ========= //
const showList = async () => {
  let res = await axios.get("registration-list/" + user_id);
  showApplication = res.data.result;
  USList.value = showApplication;

  showApplication1 = res.data.result1;
  TripletsList.value = showApplication1;

  listCount.value = res.data.listCount;
};

// ====================== End ============================== //

// =========== Resend Email ================ //
const sendMail = async (PAYLOAD, country) => {
   /* Read more about isConfirmed, isDenied below */
   let res = await axios.post("re-send-email-"+country+"/", PAYLOAD);

  let status_code = res.data.status_code
  let error_msg = res.data.error_msg
  let message = res.data.message

  if (status_code == 200) {
    Swal.fire(error_msg, message, "success");
  } else if (status_code == 422) {
    Swal.fire(error_msg, message, "error");
  } else {
    Swal.fire("Email not sent!", "Please inform administrator", "error");
  }
}
const re_sendEmail = async (id, country) => {
  Swal.fire({
    title: "Are you sure you want to Re-send email?",
    text: "Confirm your action",
    showCancelButton: true,
    confirmButtonText: "Yes",
    icon: "question",
  }).then((result) => {
    if (result.isConfirmed) {

      const requestPAYLOAD = {
        regId: id,
      };

      sendMail(requestPAYLOAD, country);

    } else if (result.isDenied) {
      Swal.fire("Email not Send", "Check your internet connection", "error");
    }
  });

}

// ============== End =================== //

// ======== For Cancel Button ================ //
const cancelApplication = async (PAYLOAD) => {
   /* Read more about isConfirmed, isDenied below */
   let res = await axios.post("cancel_application/", PAYLOAD);

  let status_code = res.data.status_code
  let message = res.data.message
  let error_msg = res.data.error_msg

  if (status_code == 200) {
    Swal.fire(error_msg, message, "success");
    showList();
  } else if (status_code == 400) {
    Swal.fire(error_msg, message, "error");
  } else if (status_code == 409) {
    Swal.fire(error_msg, message, "error");
  } else {
    Swal.fire(message+" Please contact administrator.", error_msg, "error");
  }

}

const cancelBtn = async (id, country) => {
  Swal.fire({
    title: "Are you sure you want to cancel this application?",
    text: "Confirm your action",
    showCancelButton: true,
    confirmButtonText: "Yes",
    icon: "question",
  }).then((result) => {
    if (result.isConfirmed) {

      const requestPAYLOAD = {
        regId: id,
        regCountry: country,
      };

      cancelApplication(requestPAYLOAD);

    } else if (result.isDenied) {
      Swal.fire("Email not Send", "Check your internet connection", "error");
    }
  });

}

// ================== End =================== //
</script>
<template>
  <div class="col-12">
    <div class="row tableDiv mt-3 justify-content-center">
      <div class="col-12 bg-white border">
        <table class="table table-striped">
          <thead align="center">
            <tr>
              <th class="border-top-0">Name</th>
              <th class="border-top-0">Country</th>
              <th class="border-top-0">Email</th>
              <th class="border-top-0">Date</th>
              <th class="border-top-0">Status</th>
              <th class="border-top-0">Action</th>
            </tr>
          </thead>
          <tbody align="center" v-if="listCount > 0">
            <tr v-for="(row, index) in USList" :key="index">
              <td>{{ `${row.FirstName}` + " " + `${row.LastName}` }}</td>
              <td>{{ `${row.Country}` }}</td>
              <td>{{ `${row.EmailAdd}` }}</td>
              <td>{{ moment(`${row.PreferredMedicalExamDate}`).format("LL") }}</td>
              <td align="right">
                <b v-if="`${row.Cancelled}` == 1">Cancelled<i class="fas fa-times-circle fa-lg text-danger ml-2"></i></b>
                <b v-else-if="`${row.Expired}` == 1">Expired<i class="fas fa-hourglass-end fa-lg text-secondary ml-2"></i></b>
                <b v-else-if="`${row.paid}` == 1">Paid <i class="fas fa-check-circle fa-lg text-success ml-2"></i></b>
                <b v-else-if="`${row.Seen}` == 1">Arrived <i class="fas fa-check-circle fa-lg text-success ml-2"></i></b>
                <b v-else>Awaiting payment <i class="fas fa-minus-circle fa-lg text-info ml-2"></i></b>
              </td>
              <td>
                <div class="dropdown">
                  <button
                    class="btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fas fa-cog fa-lg fa-rotate-90 mr-3"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <router-link
                        :to="
                          'application/show/' +
                          `${row.Country}` +
                          '/' +
                          `${row.ID}` +
                          '/' +
                          `${row.PayCode}`
                        "
                        class="dropdown-item"
                        ><i class="fas fa-eye mr-2 text-info"></i> View</router-link
                      >
                    </li>
                    <li :hidden="`${row.Seen}` == 1 ? true : false">
                      <router-link 
                         :to="
                         'application/edit/' +
                         `${row.Country}` +
                         '/' +
                         `${row.ID}` +
                         '/' +
                         `${row.PayCode}`
                         "
                         class="dropdown-item"
                        ><i class="fas fa-edit mr-2 text-warning"></i> Edit</router-link
                      >
                    </li>
                    <li>
                      <button @click="cancelBtn(`${row.ID}`, `${row.Country}`)" class="dropdown-item">
                        <i class="fas fa-window-close mr-2 text-danger"></i> Cancel
                      </button>
                    </li>
                    <li>
                      <router-link  
                      :to="
                      'application/redirect/' +
                      `${row.Country}` +
                      '/' +
                      `${row.ID}` +
                      '/' +
                      `${row.PayCode}`
                      " 
                      class="dropdown-item"
                        ><i class="fas fa-calendar mr-2 text-success"></i>
                        Re-schedule</router-link
                      >
                    </li>
                    <li>
                      <button @click="re_sendEmail(`${row.ID}`, `${row.Country}`)" class="dropdown-item">
                        <i class="fas fa-envelope mr-2 text-primary"></i> Re-send email
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr v-for="(row, index) in TripletsList" :key="index">
              <td>{{ `${row.FirstName}` + " " + `${row.LastName}` }}</td>
              <td>{{ `${row.Country}` }}</td>
              <td>{{ `${row.EmailAdd}` }}</td>
              <td>{{ moment(`${row.PreferredMedicalExamDate}`).format("LL") }}</td>
              <td align="right">
                <b v-if="`${row.Cancelled}` == 1">Cancelled<i class="fas fa-times-circle fa-lg text-danger ml-2"></i></b>
                <b v-else-if="`${row.Expired}` == 1">Expired<i class="fas fa-hourglass-end fa-lg text-secondary ml-2"></i></b>
                <b v-else-if="`${row.paid}` == 1">Paid <i class="fas fa-check-circle fa-lg text-success ml-2"></i></b>
                <b v-else-if="`${row.Seen}` == 1">Arrived <i class="fas fa-check-circle fa-lg text-success ml-2"></i></b>
                <b v-else>Awaiting payment <i class="fas fa-minus-circle fa-lg text-info ml-2"></i></b>
              </td>
              <td>
                <div class="dropdown">
                  <button
                    class="btn btn-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fas fa-cog fa-lg fa-rotate-90 mr-3"></i>
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <router-link
                        :to="
                          'application/show/' +
                          `${row.Country}` +
                          '/' +
                          `${row.Id}` +
                          '/' +
                          `${row.PayCode}`
                        "
                        class="dropdown-item"
                        ><i class="fas fa-eye mr-2 text-info"></i> View</router-link
                      >
                    </li>
                    <li :hidden="`${row.Seen}` == 1 ? true : false">
                      <router-link 
                        :to="
                        'application/edit/' +
                        `${row.Country}` +
                        '/' +
                        `${row.Id}` +
                        '/' +
                        `${row.PayCode}`
                        "
                        class="dropdown-item"
                      ><i class="fas fa-edit mr-2 text-warning"></i> Edit</router-link>
                    </li>
                    <li>
                      <button @click="cancelBtn(`${row.Id}`, `${row.Country}`)" class="dropdown-item">
                        <i class="fas fa-window-close mr-2 text-danger"></i> Cancel
                      </button>
                    </li>
                    <li>
                      <router-link 
                      :to="
                      'application/redirect/' +
                      `${row.Country}` +
                      '/' +
                      `${row.Id}` +
                      '/' +
                      `${row.PayCode}`
                      " 
                      class="dropdown-item"
                        ><i class="fas fa-calendar mr-2 text-success"></i>
                        Re-schedule</router-link
                      >
                    </li>
                    <li>
                      <button @click="re_sendEmail(`${row.Id}`, `${row.Country}`)" class="dropdown-item">
                        <i class="fas fa-envelope mr-2 text-primary"></i> Re-send email
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody align="center" v-else-if="listCount <= 0">
            <tr>
              <td colspan="6">
                <h3 class="text-secondary p-5">No Records</h3>
              </td>
            </tr>
          </tbody>
          <tbody align="center" v-else>
            <tr>
              <td colspan="6">
                <h3 class="text-secondary p-5">Please wait...</h3>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.tableDiv {
  height: auto;
  min-height: 40rem;
  max-height: 50rem;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
}
</style>
