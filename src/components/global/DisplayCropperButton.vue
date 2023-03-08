<script setup>
    import { defineProps, toRefs } from 'vue'

    const props = defineProps({ 
        btnClass: String,
        btnText: String,
        label: String ,
        labelClass: String
    })
    const { btnText, btnClass, label, labelClass } = toRefs(props)

</script>

<template>
    <div class="row">
        <div class="col-12">
            <label
                class="text-capitalize"
                :class="labelClass"
            >
                {{ label }}
            </label>
        </div>
        <div class="col-12">
            <button
                :class="btnClass"
                @click="$emit('showModal', true)"
            >
                <i class="fas fa-upload pr-1"></i> {{ btnText }}
            </button>
        </div>
    </div>            
</template>