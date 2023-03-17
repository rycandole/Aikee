<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    starClassName: String,
    label: String,
    inputClassName: String,
    input: String,
    type: String,
    placeholder: String,
    FieldName: String,
    ErrorName: String,
    error: String,
    smallLabel: String,
    id: String
})

const { labelClassName, label, input, type, inputClassName, starClassName, placeholder, error, smallLabel, FieldName, ErrorName, id } = toRefs(props)

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
            <Field 
                :name="FieldName" 
                :type="type" 
                class="form-control w-100" 
                :class="inputClassName" 
                :placeholder="placeholder" 
                v-model="inputComputed" 
                :id="id"
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