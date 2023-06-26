<script setup>
import { defineProps, toRefs } from "vue";

const props = defineProps({
  btnText: String,
  className: String,
  iconClass: String,
  id: String,
  btnType: String,
});

const { btnText, className, iconClass, id, btnType } = toRefs(props);
</script>

<template>
  <button :id="id" :class="className" :type="btnType" @click="$emit('submit', true)">
    <i class="d-none" :class="iconClass"></i>{{ btnText }}
  </button>
</template>
