<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import { Field, ErrorMessage } from 'vee-validate';

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    input: String,
    type: String,
    inputClassName: String,
    placeholder: String,
    iconClassName: String,
    optLabelClassName: String,
    optionalLabel: String,
    FieldName: String,
    ErrorName: String,
    error: String,
    minLength: Number,
    maxLength: Number
})

const { labelClassName, label, input, type, inputClassName, placeholder, iconClassName, optLabelClassName, optionalLabel, error, minLength, maxLength, FieldName, ErrorName  } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})


</script>

<template>
    <div class="row">
        <div class="col-12">
            <label 
                class="text-capitalize "
                :class="labelClassName">
                {{ label }}
                <label :class="optLabelClassName">
                    {{ optionalLabel }}
                </label>
            </label>
        </div>
        <div class="col-12 input-group">
            <Field
                :name="FieldName"
                :type="type" 
                :class="inputClassName" 
                :placeholder="placeholder" 
                :minlength="minLength"
                :maxlength="maxLength"
                v-model="inputComputed"
            />
            <div class="input-group-append">
                <div class="input-group-text">
                    <span :class="iconClassName"></span>
                </div>
            </div>
        </div>
        <div class="col-12">
            <span v-if="error" class="text-danger">
                {{ error }}
            </span>
            <ErrorMessage :name="ErrorName" class="text-danger"/>
        </div>
    </div>
    
</template>

