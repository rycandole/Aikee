<script setup>
import { defineProps, toRefs } from 'vue'


const props = defineProps({
    previewLabelClassName: String,
    previewLabel: String,
    previewClassName: String,
    previewText: String,
    smallLabel: String
})

const { previewLabelClassName, previewLabel, previewClassName, previewText, smallLabel } = toRefs(props)



</script>

<template>
    <div class="row mt-1 p-3">
        <!-- ====================== Date Input ======================== -->
        <div class="col-12">
            <label class="text-capitalize" :class="previewLabelClassName">
                {{ previewLabel }}
            </label>
        </div>
        <div class="col-12 input-group">
            <span :class="previewClassName" class="text-muted prev_text">{{ previewText }}</span>
        </div>
        <div class="col-12">
            <span class="text-secondary text-s fw-light display-block float-left ml-2">
                {{ smallLabel }}
            </span>
        </div>
    </div>
    
</template>

<style lang="scss">
.prev_text {
    font-size: 1.5rem;
}
@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>