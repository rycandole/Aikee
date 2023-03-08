<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    starClassName: String,
    label: String,
    inputClassName: String,
    input: String,
    inputType: String,
    minLength: Number,
    maxLength: Number,
    placeholder: String,
    error: String,
    smallLabel: String
})

const { labelClassName, label, input, inputType, inputClassName, starClassName, minLength, maxLength, placeholder, error, smallLabel } = toRefs(props)

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
                {{ label }} <b class="text-danger" :class="starClassName">*</b>
            </label>
        </div>
        <div class="col-12 input-group">
            <input :type="inputType" class="form-control w-100" :class="inputClassName" :placeholder="placeholder" :minlength="minLength" :maxlength="maxLength" v-model="inputComputed" required/>
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