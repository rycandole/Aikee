<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import { Field } from 'vee-validate'

const emit = defineEmits(['update:input'])

const props = defineProps({
    input: String,
    CheckBoxName: String,
    CheckBoxValue: String,
    onChange: String
})

const { input, CheckBoxName, CheckBoxValue, onChange } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})

</script>
<template>
   <Field class="form-check-input" type="checkbox" id="flexCheckDefault" @input="onChange" :name="CheckBoxName" v-model="inputComputed" :value="CheckBoxValue" />
</template>
