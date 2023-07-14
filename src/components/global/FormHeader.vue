<script setup>
import { defineProps, toRefs } from 'vue'


const props = defineProps({
    headerText: String,
    headerClass: String
})

const { headerText } = toRefs(props)




</script>

<template>
    <div class="d-flex flex-column">
        <div class="p-2 pl-4 pt-3 bg-dark-blue" :class="headerClass">
            <h4 class="text-center text-uppercase text-bold float-left">
                {{ headerText }}
            </h4>
        </div>
    </div>
</template>

<style lang="scss">
.bg-dark-blue {
    background-color: #0a52a5 !important;
    color: #fff !important;
}

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>