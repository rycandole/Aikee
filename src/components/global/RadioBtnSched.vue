<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'
import { Field } from 'vee-validate'

const emit = defineEmits(['update:input'])

const props = defineProps({
    input: String,
    RadioBtnName: String,
    RadioLabel: String,
    RadioLabelClass: String,
    StatusLabel: String,
    spanClassName: String,
    Slots: String,
    inputId: String,
    radioBtnStatus: String,
    radioValue: String
})

const { RadioLabel, RadioLabelClass, input, RadioBtnName, StatusLabel, spanClassName, Slots, inputId, radioBtnStatus, radioValue } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})

</script>
<template>
    <div class="row mt-3 ml-3">
        <div class="col-6 input-group">
            <div class="form-check">
                <Field class="form-check-input flexRadioDisabled" :id="inputId" type="radio" :value="radioValue" :name="RadioBtnName" v-model="inputComputed" :disabled="radioBtnStatus" />
                <label class="form-check-label text-uppercase" :class="RadioLabelClass" for="flexRadioDefault1">
                    {{ RadioLabel }} 
                </label>
            </div>
        </div>
        <div class="col-6 input-group">
            <strong :class="spanClassName">
                {{ StatusLabel }} {{ Slots }}
            </strong>
        </div>
    </div>
</template>
