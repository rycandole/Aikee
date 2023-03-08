<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    routerText: String,
    url: { type: String, default: '' },
    routerClassName: String,
    iconClassName: String
})

const { routerText, className, url, iconClassName } = toRefs(props)



</script>

<template>
    <router-link :to="url" :class="className">
        <i :class="iconClassName"></i> {{ routerText }}
    </router-link>
</template>