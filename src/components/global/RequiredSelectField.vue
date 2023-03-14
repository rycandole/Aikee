<script setup>
import { defineProps, toRefs, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:input'])

const props = defineProps({
    labelClassName: String,
    label: String,
    className: String,
    input: String,
    items: String,
    FieldName: String,
    error: String,
    smallLabel: String
})

const { labelClassName, label, className, input, items, error, smallLabel, FieldName } = toRefs(props)

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
                {{ label }} <b class="text-danger">*</b>
            </label>
        </div>
        <div class="col-12 input-group">
            <select :name="FieldName" class="form-control form-select w-100" :class="className" v-model="inputComputed" aria-label="Default select example" required>
                <option v-for="item in items" :key="item" :value="item">
                    {{ item }}
                </option>
            </select>
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