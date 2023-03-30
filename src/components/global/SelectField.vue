<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    className: String,
    input: [String, Number],
    items: Array,
    FieldName: String,
    ErrorName: String,
    error: String,
    smallLabel: String
})

const { labelClassName, label, className, input, items, error, smallLabel, FieldName, ErrorName } = toRefs(props)

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
            <Field :name="FieldName" as="select" class="form-control form-select w-100" :class="className" v-model="inputComputed" aria-label="Default select example">
                
                <option v-for="item in items" :key="item" :value="item">
                    {{ item }}
                </option>
            </Field>
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

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>