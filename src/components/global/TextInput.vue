<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    input: String,
    inputType: String,
    inputClassName: String,
    placeholder: String,
    iconClassName: String,
    optLabelClassName: String,
    optionalLabel: String,
    error: String,
    minLength: Number,
    maxLength: Number
})

const { labelClassName, label, input, inputType, inputClassName, placeholder, iconClassName, optLabelClassName, optionalLabel, error, minLength, maxLength } = toRefs(props)

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
            <input 
                :type="inputType" 
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
        <div v-if="error" class="col-12">
            <span class="text-danger">
                {{ error }}
            </span>
        </div>
    </div>
    
</template>

