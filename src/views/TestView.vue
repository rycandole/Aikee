
<template>
    <select v-model="inputComputed" placeholder="Choose option" width="100px">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select><br>
    <h1>{{ selecvalue }}</h1>
</template>

<script setup>
// script setup
import { ref, watch } from 'vue'  

let selectOption = ref(null)
let selecvalue = ref()

watch(() => selectOption.value, (newValue) => {
    selecvalue = newValue
    
})

</script>