<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    headerTitle: String,
    description: String
})

const { headerTitle, description } = toRefs(props)

</script>

<template>
    <div class="callout callout-danger w-100">
        <h5 class="text-danger"><i class="fas fa-exclamation-circle fa-lg mt-1 pr-1"></i> {{ headerTitle }}</h5>

        <p v-html="description"></p>
    </div>
</template>