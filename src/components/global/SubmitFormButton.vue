<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    btnText: String,
    className: String,
    btnType: String
})

const { btnText, className, btnType } = toRefs(props)



</script>

<template>
    <button 
        :class="className" 
        :type="btnType"
        @click="$emit('submit', true)"
    >
        {{ btnText }}
    </button>
</template>