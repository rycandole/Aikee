<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    btnText: String,
    className: String,
    id: String,
    btnType: String
})

const { btnText, className, id, btnType } = toRefs(props)



</script>

<template>
    <button 
        :id="id"
        :class="className" 
        :type="btnType"
        @click="$emit('submit', true)"
    >
        {{ btnText }}
    </button>
</template>