<script setup>
import axios from "axios";
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import {useRoute} from "vue-router"
import { defineProps, toRefs } from "vue";
import { useOTIndividualSched } from "@/store/ot-individual-sched";
import { useOTIndividualDetails } from "@/store/ot-individual-details";
import moment from "moment";
import Swal from "@/sweetalert2";

const router = useRouter();
const route = useRoute();
const OT_IndividualSched = useOTIndividualSched();
const OTIndividualDetails = useOTIndividualDetails();
const regCountry = route.params.country;

const props = defineProps({
  divClassName: String,
});

const { divClassName } = toRefs(props);
const schedule = JSON.parse(localStorage.getItem("ot-individual-sched"));

let sched_timer = schedule.timer;
const minutes = ref(0);
const seconds = ref(0);
const launchMinute = new Date(sched_timer);

onMounted(() => {
  registrationTimer();
});

const registrationTimer = () => {
  let timer = setInterval(() => {
    const timeNow = moment(new Date().getTime());
    const launchTime = launchMinute - timeNow;

    if (launchTime <= 0) {
      clearInterval(timer);

      Swal.fire({
        icon: "warning",
        title: "Your time is up!",
        text: "Do you still want to continue? Add 5 minutes.",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const requestPAYLOAD = {
            branch: useOTIndividualSched().branch,
            country: useOTIndividualSched().country,
            date: useOTIndividualSched().date,
            time: useOTIndividualSched().time,
            timer: moment(new Date().getTime()).add(30, "minutes"),
          };

          let res = JSON.stringify(requestPAYLOAD);
          
          OT_IndividualSched.setOTIndividualSched(res);

          location.reload();

          Swal.fire({
            icon: "success",
            title: "You have extra 5 minutes",
            text: "Please finish the registration form",
            showConfirmButton: false,
            timer: 2500,
          });
        } else if (result.isDenied) {
           Swal.fire({
            icon: "info",
            title: "Your registration is cancelled",
            text: "Please finish the registration form",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1000,
          });
          // Swal.fire(
          //   "Your registration is cancelled",
          //   "The slot and details you input is gone",
          //   "info"
          // );
          moveBackSlot();
        }
      });
    }

    seconds.value = parseInt(launchTime / 1000);
    minutes.value = parseInt(seconds.value / 60);
  }, 1000);

  return { minutes, seconds };
};

const moveBackSlot = async () => {
  const jsonDATA = {
    branch: useOTIndividualSched().branch,
    country: useOTIndividualSched().country,
    date: useOTIndividualSched().date,
    time: useOTIndividualSched().time,
    timer: useOTIndividualSched().timer,
  };

  let remove_slot = await axios.post("remove_slot/", jsonDATA);

  if (remove_slot.data.status_code === 200) {
    OT_IndividualSched.clearOTIndividualSched();
    OTIndividualDetails.clearOTIndividualDetails();
    router.push("/individual/ot/schedule/"+ regCountry);
  }
};
</script>
<template>
  <div
    class="alert alert-dismissible"
    :class="[divClassName, minutes % 60 >= 1 ? 'alert-info' : 'alert-danger']"
  >
    <span class="fs-1"
      >You only have <strong>{{ minutes % 60 }}</strong>
      {{ minutes % 60 > 1 ? "minutes" : "minute" }} and
      <strong>{{ seconds % 60 }}</strong>
      {{ seconds % 60 > 1 ? "seconds" : "second" }} to finish registration.
    </span>
    <!-- <input type="text" :value="minutes % 60" :name="MinuteName" />
    <input type="text" :value="seconds % 60" :name="SecondName" /> -->
  </div>
</template>
<style lang="scss">
.alert-dismissible {
  box-shadow: -3px 3px 10px 0 #b1b3b3;
}
</style>




