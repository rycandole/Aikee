<script setup>
import { defineProps, toRefs } from 'vue'


const props = defineProps({
    headerText: String
})

const { headerText } = toRefs(props)




</script>

<template>
    <div class="d-flex flex-column">
        <div class="p-2 sub_form_header">
            <span class="text-center text-capitalize text-dark font-weight-bold float-left ml-1">
                {{ headerText }}
            </span>
        </div>
    </div>
</template>

<style lang="scss">
.sub_form_header {
    background: #cdcdcd;
    font-size: 18px;
}

@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>