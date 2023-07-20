<script>
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const launchDate = new Date("2023-07-18");

    setInterval(() => {
      const currDate = new Date();
      const launchTime = launchDate - currDate;

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
  <div class="time_box">
    <p>{{ days }} day</p>
    <p>{{ hours % 24 }} hrs</p>
    <p>{{ minutes % 60 }} min</p>
    <p>{{ seconds % 60 }} sec</p>
  </div>
</template>
<style lang="scss">
.time_box p {
  padding: 10px;
  background: grey;
  color: #fff;
  margin: 10px;
  font-size: 20pt;
  float: left;
}
.time_box {
  margin-left: 35%;
  margin-top: 20%;
}
</style>
