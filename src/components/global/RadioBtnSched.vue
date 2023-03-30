<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    input: String,
    RadioBtnName: String,
    RadioLabel: String,
    StatusLabel: String,
    spanClassName: String,
    Slots: String,
    inputId: String
})

const { RadioLabel, input, RadioBtnName, StatusLabel, spanClassName, Slots, inputId } = toRefs(props)

const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit('update:input', val)
})

</script>
<template>
    <div class="row mt-3 ml-3">
        <div class="col-6 input-group">
            <div class="form-check">
                <input class="form-check-input" :id="inputId" type="radio" :name="RadioBtnName" v-model="inputComputed" >
                <label class="form-check-label text-uppercase" for="flexRadioDefault1">
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
