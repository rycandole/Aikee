<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    timeLabelClassName: String,
    timeLabel: String,
    input: String,
    options: Array,
    error: String
})



const { timeLabelClassName, input, options, timeLabel, error } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})


</script>

<template>
    <div class="row mt-3 p-3">
        <!-- ====================== Time Input ======================== -->
        <div class="col-12 mt-3">
            <label class="text-capitalize" :class="timeLabelClassName">
                {{ timeLabel }}
            </label>
        </div>
        <div class="col-12 input-group">
            <select class="form-control form-select" v-model="inputComputed" aria-label="Default select example">
                <!-- <option selected></option> -->
                <option v-for="option in options" :key="option" :value="option.value">
                    {{ option.item }}
                </option>
            </select>
        </div>
        <div v-if="error" class="col-12">
            <span class="text-danger">
                {{ error }}
            </span>
        </div>
    </div>
    
</template>

<style lang="scss">
.section_header {
    background-color: #069;
}

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>