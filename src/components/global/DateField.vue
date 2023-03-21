<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import Datepicker from '@/datepicker.js'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    requiredClass: String,
    inputClass:String,
    input: String,
    placeholder: String,
    error: String,
    color: String,
    smallLabel: String,
    disabledDate: String,
    preventDisableDate: String
})

const { labelClassName, label, requiredClass, inputClass, input, placeholder, error, color, smallLabel, disabledDate, preventDisableDate } = toRefs(props)


const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})


</script>
<template>
    <div class="row mt-3">
        <div class="col-12">
            <label class="text-capitalize" :class="labelClassName">
                {{ label }} <b :class="requiredClass" class="text-danger p-1">*</b>
            </label>
        </div>
    </div>
    <div class="col-12 input-group">
        <Datepicker
            :input-class="inputClass"
            :placeholder="placeholder"
            :iconColor="color"
            iconHeight="18"
            iconWidth="18"
            :disabled-dates="disabledDate" 
            :prevent-disable-date-selection="preventDisableDate"
            v-model="inputComputed"
        />
        <span class="text-secondary text-s fw-light display-block float-left ml-2">
                {{ smallLabel }}
        </span>
    </div>
    <div v-if="error" class="col-12">
        <span class="text-danger">
            {{ error }}
        </span>
    </div>
     
</template>