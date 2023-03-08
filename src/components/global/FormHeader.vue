<script setup>
import { defineProps, toRefs } from 'vue'


const props = defineProps({
    headerText: String
})

const { headerText } = toRefs(props)




</script>

<template>
    <div class="d-flex flex-column">
        <div class="p-2 pl-4 bg-light">
            <h4 class="text-center text-uppercase text-bold float-left">
                {{ headerText }}
            </h4>
        </div>
    </div>
</template>

<style lang="scss">


@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>