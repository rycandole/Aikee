<script setup>
import { defineProps, toRefs, defineEmits, computed } from "vue";
import { Field } from "vee-validate";

const emit = defineEmits(["update:input"]);

const props = defineProps({
  input: String,
  idName: String,
  RadioBtnName: String,
  RadioLabel: String,
  RadioLabelClass: String,
  RadioValue: String,
  onChange: String,
  onDisabled: Boolean
});

const {
  input,
  idName,
  RadioLabel,
  RadioLabelClass,
  RadioBtnName,
  RadioValue,
  onChange,
  onDisabled,
} = toRefs(props);

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val),
});
</script>
<template>
  <Field
    class="form-check-input mt-2"
    @input="onChange"
    :id="idName"
    type="radio"
    :name="RadioBtnName"
    v-model="inputComputed"
    :value="RadioValue"
    :disabled="onDisabled"
  /><label for="" :class="RadioLabelClass">{{ RadioLabel }}</label>
</template>
