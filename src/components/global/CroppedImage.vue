<script setup>
    import { defineProps, toRefs } from 'vue'

    const props = defineProps({ 
        label: String, 
        image: String, 
        imageClass: String
    })
    const { label, image, imageClass } = toRefs(props)
</script>

<template>
    <div class="row">
        <div class="col-12">
            <label 
                class="
                    text-capitalize 
                    text-s 
                    mb-0 
                    text-dark
                    pb-1
                "
            >
                {{ label }}
            </label>
        </div>
        <div class="col-12">
            <img
                :class="imageClass"
                :src="image"
            >
        </div>
    </div>
                    
</template>