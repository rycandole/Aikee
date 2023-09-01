<script setup>
import axios from "axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useProfileStore } from "@/store/profile-store";
import Swal from "@/sweetalert2";
import moment from "moment";

const profileStore = useProfileStore();

let user_id = profileStore.id;

let showApplication = ref([]);
let showApplication1 = ref([]);
let USList = ref(null);
let TripletsList = ref(null);
// let status_code = ref(null);
let listCount = ref(null);

onMounted(async () => {
  showList();
});

const showList = async () => {
  let res = await axios.get("registration-list/" + user_id);
  showApplication = res.data.result;
  USList.value = showApplication;

  showApplication1 = res.data.result1;
  TripletsList.value = showApplication1;

  listCount.value = res.data.listCount;
};
// id
const re_sendEmail = async (id) => {
  Swal.fire({
    title: "Are you sure you want to Re-send email?",
    text: "Confirm your action",
    showCancelButton: true,
    confirmButtonText: "Yes",
    icon: "question",
  }).then((result) => {
    if (result.isConfirmed) {

      const JSONdata = {
        regId: id,
      };
      /* Read more about isConfirmed, isDenied below */
      let res = axios.post("re-send-email-us/", JSONdata);

      console.log(res.data.id)
      // alert(res.data.result)

      alert(res.data.message)

    } else if (result.isDenied) {
      Swal.fire("Email not Send", "Check your internet connection", "error");
    }
  });

}
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
                <b>Cancelled<i class="fas fa-times-circle fa-lg text-danger ml-2"></i></b>
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
                    <li>
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
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-window-close mr-2 text-danger"></i>
                        Cancel</router-link
                      >
                    </li>
                    <li>
                      <router-link  
                      :to="
                      'application/resched/' +
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
                      <button @click="re_sendEmail(`${row.ID}`)" class="dropdown-item">
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
                <b
                  >Cancelled <i class="fas fa-times-circle fa-lg text-danger ml-2"></i
                ></b>
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
                    <li>
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
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-window-close mr-2 text-danger"></i>
                        Cancel</router-link
                      >
                    </li>
                    <li>
                      <router-link 
                      :to="
                      'application/resched/' +
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
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-envelope mr-2 text-primary"></i> Re-send
                        email</router-link
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>Sample Example</td>
              <td>U.S.A.</td>
              <td>sample@example.com</td>
              <td>May 05, 2023</td>
              <td align="right">
                <b
                  >Cancelled <i class="fas fa-times-circle fa-lg text-danger ml-2"></i
                ></b>
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
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-eye mr-2 text-info"></i> View</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-edit mr-2 text-warning"></i> Edit</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-window-close mr-2 text-danger"></i>
                        Cancel</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-calendar mr-2 text-success"></i>
                        Re-schedule</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-envelope mr-2 text-primary"></i> Re-send
                        email</router-link
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>Sample Example</td>
              <td>U.S.A.</td>
              <td>sample@example.com</td>
              <td>May 05, 2023</td>
              <td align="right">
                <b>Paid <i class="fas fa-check-circle fa-lg text-success ml-2"></i></b>
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
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-eye mr-2 text-info"></i> View</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-edit mr-2 text-warning"></i> Edit</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-window-close mr-2 text-danger"></i>
                        Cancel</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-calendar mr-2 text-success"></i>
                        Re-schedule</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-envelope mr-2 text-primary"></i> Re-send
                        email</router-link
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>Sample Example</td>
              <td>U.S.A.</td>
              <td>sample@example.com</td>
              <td>May 05, 2023</td>
              <td align="right">
                <b
                  >Awaiting payment
                  <i class="fas fa-minus-circle fa-lg text-info ml-2"></i
                ></b>
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
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-eye mr-2 text-info"></i> View</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-edit mr-2 text-warning"></i> Edit</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-window-close mr-2 text-danger"></i>
                        Cancel</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-calendar mr-2 text-success"></i>
                        Re-schedule</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-envelope mr-2 text-primary"></i> Re-send
                        email</router-link
                      >
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>Sample Example</td>
              <td>U.S.A.</td>
              <td>sample@example.com</td>
              <td>May 05, 2023</td>
              <td align="right">
                <b
                  >Re-scheduled <i class="fas fa-check-circle fa-lg text-success ml-2"></i
                ></b>
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
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-eye mr-2 text-info"></i> View</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-edit mr-2 text-warning"></i> Edit</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-window-close mr-2 text-danger"></i>
                        Cancel</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-calendar mr-2 text-success"></i>
                        Re-schedule</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/" class="dropdown-item"
                        ><i class="fas fa-envelope mr-2 text-primary"></i> Re-send
                        email</router-link
                      >
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
