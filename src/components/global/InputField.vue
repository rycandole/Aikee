<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

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
    divLabelClass: String,
    isDisabled: String
})

const { labelClassName, label, input, placeholder, type, FieldName, ErrorName, inputClassName, error, smallLabel, divLabelClass, isDisabled } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})


</script>

<template>
    <div class="row">
        <!-- ====================== Date Input ======================== -->
        <div class="col-12 mt-3" :class="divLabelClass">
            <label class="text-capitalize" :class="labelClassName">
                {{ label }} <b class="text-danger p-3"></b>
            </label>
        </div>
        <div class="col-12 input-group">
            <Field 
                :name="FieldName"  
                :type="type" 
                class="form-control w-100" 
                :placeholder="placeholder" 
                :class="inputClassName" 
                v-model="inputComputed"
                :disabled="isDisabled"
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