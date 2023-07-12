<script setup>
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

onBeforeMount(() => {
  console.log("Before Mounted");
});

onMounted(() => {
  addCounter();
  console.log("On Mounted");
});

onBeforeUpdate(() => {
  console.log("Before Update");
});

onUpdated(() => {
  console.log("On Update");
});

onBeforeUnmount(() => {
  console.log("Before Unmounted");
});

onUnmounted(() => {
  console.log("On Unmounted");
});

let counter = 0;

const addCounter = () => {
  counter.value += 1;
};
</script>
<template>
  <div><button type="button" @click="addCounter">Update</button> {{ counter }}</div>
</template>
