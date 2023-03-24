<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import Datepicker from '@/datepicker.js'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    input: String,
    placeholder: String,
    inputClassName: String,
    error: String,
    smallLabel: String,
    disabledDate: String,
    preventDisableDate: String
})

const { labelClassName, label, input, inputClassName, error, smallLabel, disabledDate, preventDisableDate } = toRefs(props)

// let date = new Date()

// const 



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
    <div class="col-12 input-group" id="inlineTemplate">
        <Datepicker
            :class="inputClassName" 
            :inline="true"
            :disabled-dates="disabledDate"
            :prevent-disable-date-selection="preventDisableDate"
            v-model="inputComputed"
        />
    </div>
    <div class="col-12">
        <span class="text-secondary text-s fw-light display-block float-left ml-2">
                {{ smallLabel }}
        </span>
    </div>
    <div class="col-12 pt-3">
        <span class="date_label date_available p-2 m-1">Available</span>
        <span class="date_label date_not_available p-2 m-1">Not Available</span>
    </div>
    <div v-if="error" class="col-12">
        <span class="text-danger">
            {{ error }}
        </span>
    </div>
     
</template>

<style>
#inlineTemplate .weekend {
    background: none !important;
}

#inlineTemplate .vuejs3-datepicker__calendar .cell:not(.blank):not(.disabled).day {
    background: #d0f3d0;
}
#inlineTemplate .vuejs3-datepicker__calendar .disabled {
    background: #fdb6b6;
    color: #f7efef;
}
.date_label {
    color: #fff;
    font-weight: bold;
    border-radius: 2px;
    cursor: default;
}
.date_available {
    background: #5ab85a;
    border: 1px solid #5ca75c;
}
.date_not_available {
    background: #eb5454;
    border: 1px solid #cc4646;
}


</style>