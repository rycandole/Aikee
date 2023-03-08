<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    className: String,
    input: String,
    error: String,
    smallLabel: String
})

const { labelClassName, label, className, input, error, smallLabel } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})


</script>

<template>
    <div class="row mt-3">
        <!-- ====================== Date Input ======================== -->
        <div class="col-12">
            <label class="text-capitalize" :class="labelClassName">
                {{ label }} <b class="text-danger p-3"></b>
            </label>
        </div>
        <div class="col-12 input-group">
            <select class="form-control form-select w-100" :class="className" v-model="inputComputed" aria-label="Default select example">
                <option selected>Select</option>
                <option value="1">7:00 am</option>
                <option value="2">8:00 am</option>
                <option value="3">9:00 am</option>
            </select>
            <span class="text-secondary text-s fw-light display-block float-left ml-2">
                {{ smallLabel }}
            </span>
        </div>
        <div v-if="error" class="col-12">
            <span class="text-danger">
                {{ error }}
            </span>
        </div>

       
    </div>
    
</template>

<style lang="scss">

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>