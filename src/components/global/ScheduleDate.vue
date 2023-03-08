<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    dateLabelClassName: String,
    dateLabel: String,
    input: String,
    inputType: String,
    inputClassName: String,
    error: String
})

const { dateLabelClassName, dateLabel, input, inputClassName, error } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})


</script>

<template>
    <div class="row mt-3 p-3">
        <!-- ====================== Date Input ======================== -->
        <div class="col-12">
            <label class="text-capitalize" :class="dateLabelClassName">
                {{ dateLabel }}
            </label>
        </div>
        <div class="col-12 input-group">
            <input type="date" class="form-control" :class="inputClassName" v-model="inputComputed"/>
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