<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import Datepicker from '@/datepicker.js'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    input: String,
    placeholder: String,
    FieldName: String,
    ErrorName: String,
    type: String,
    inputClassName: String,
    error: String,
    smallLabel: String,
    disabledDate: String,
    preventDisableDate: String
})

const { labelClassName, label, input, ErrorName, inputClassName, error, smallLabel, disabledDate, preventDisableDate } = toRefs(props)


const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})


</script>
<template>
    <div class="row mt-3">
        <div class="col-12">
            <label class="text-capitalize" :class="labelClassName">
                {{ label }} <b class="text-danger p-3"></b>
            </label>
        </div>
    </div>
    <div class="col-12 input-group">
        <Datepicker
            :class="inputClassName" 
            :inline="true"
            :disabled-dates="disabledDate" 
            :prevent-disable-date-selection="preventDisableDate"
            v-model="inputComputed"
        />
        <span class="text-secondary text-s fw-light display-block float-left ml-2">
                {{ smallLabel }}
        </span>
    </div>
    <div class="col-12">
        <span v-if="error" class="text-danger">
            {{ error }}
        </span>
        <ErrorMessage :name="ErrorName" class="text-danger"/>
    </div>
     
</template>