<script setup>
import { defineProps, toRefs } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
    labelClassName: String,
    starClassName: String,
    label: String,
    radioLabel1: String,
    radioLabel2: String,
    value1: String,
    value2: String,
    FieldName1: String,
    FieldName2: String,
    ErrorName: String
})

const { labelClassName, label, radioLabel1, radioLabel2, starClassName, FieldName1, FieldName2, ErrorName, value1, value2 } = toRefs(props)


</script>

<template>
    <div class="row mt-3">
        <div class="col-12">
            <label class="text-capitalize" :class="labelClassName">
                {{ label }} <b class="text-danger" :class="starClassName">*</b>
            </label>
        </div>
        <div class="col-lg-2 col-md-2 col-sm-12 pl-4 input-group">
            <Field :name="FieldName1" class="form-check-input" type="radio" v-model="petitioner_is_alive" :value="value1" id="flexRadioDefault1"/>
            <label class="form-check-label" for="flexRadioDefault1">
            {{ radioLabel1 }}
            </label>
        </div>     
        <div class="col-lg-10 col-md-10 col-sm-12 pl-4">
            <Field :name="FieldName2" class="form-check-input" type="radio" v-model="petitioner_is_alive" :value="value2" id="flexRadioDefault2"/>
            <label class="form-check-label" for="flexRadioDefault2">
            {{ radioLabel2 }}
            </label>
        </div>   
        <div class="col-12">
            <ErrorMessage :name="ErrorName" class="text-danger"/>
        </div>
    </div>
    
</template>
