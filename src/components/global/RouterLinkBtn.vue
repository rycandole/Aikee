<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    btnText: String,
    btnUrl: { type: String, default: '' },
    btnClassName: String
})

const { btnText, btnClassName, btnUrl } = toRefs(props)



</script>

<template>
    <router-link :to="btnUrl" :class="btnClassName">
         {{ btnText }}
    </router-link>
</template>