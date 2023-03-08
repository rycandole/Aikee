<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    btnText: String,
    btnUrl: { type: String, default: '' }
})

const { btnText, btnUrl } = toRefs(props)



</script>

<template>
    <router-link :to="btnUrl" class="btn w-100 mt-3 mb-3 btn-lg pt-3 pb-3 btn-light border">
         {{ btnText }}
    </router-link>
</template>