<script setup>
import { defineProps, toRefs } from 'vue'
import QrcodeVue from '@/qr_code.js'


const props = defineProps({
    stringValue: String,
    sizeImage: String
})

const { stringValue, sizeImage } = toRefs(props)


</script>
<template>

    <QrcodeVue
        :value="stringValue"
        :size="sizeImage"
    />
    
</template>