<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    input: String,
    placeholder: String,
    inputType: String,
    minLength: Number,
    maxLength: Number,
    inputClassName: String,
    error: String,
    smallLabel: String
})

const { labelClassName, label, input, placeholder, inputType, inputClassName, error, smallLabel } = toRefs(props)

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
            <input :type="inputType" class="form-control w-100" :placeholder="placeholder" :class="inputClassName" :minlength="minLength" :maxlength="maxLength" v-model="inputComputed"/>
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
.section_header {
    background-color: #069;
}

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>