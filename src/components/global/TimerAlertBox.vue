<script>
import { ref } from "@vue/reactivity";
import moment from 'moment'

export default {
  setup() {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    // const launchYear = new Date().getFullYear()
    // const launchMonth = new Date().getMonth() + 1
    // const launchDay = new Date().getDate() + 1
    // const launchDate = new Date(launchYear+"-"+launchMonth+"-"+launchDay);
    const launchMinute = moment(new Date().getTime()).add(30, 'minutes')

    setInterval(() => {
      const timeNow = moment(new Date().getTime())
    //   const currDate = new Date();
      const launchTime = launchMinute - timeNow;

      seconds.value = parseInt(launchTime / 1000);
      minutes.value = parseInt(seconds.value / 60);
      hours.value = parseInt(minutes.value / 60);
      days.value = parseInt(hours.value / 24);
    }, 1000);

    return { days, hours, minutes, seconds };
  },
};
</script>
<template>
    <div class="alert alert-dismissible w-75" :class="minutes % 60 >= 10 ? 'alert-info' : 'alert-warning' ">
        <h3><i class="icon fas" :class="minutes % 60 >= 10 ? 'fa-info' : 'fa-exclamation-triangle' "></i> <span class="ml-3">You only have {{ minutes % 60 }} {{ minutes % 60 > 1 ? "minutes" : "minute" }} and {{ seconds % 60 }} {{ seconds % 60 > 1 ? "seconds" : "second" }}</span></h3>
    </div>
</template>
<style lang="scss">

</style>
