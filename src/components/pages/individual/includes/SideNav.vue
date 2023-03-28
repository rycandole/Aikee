<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
    className: String,
    className1: String,
    className2: String
})

const { className, className1, className2 } = toRefs(props)



</script>

<template>
    <div class="row">
        <div class="col-12 bg-secondary border-primary pt-2">
            <h5>Individual Appointment</h5>
        </div>
        <div class="d-flex flex-lg-column w-100 mb-3 sidenavFlex">
            <div class="p-2"> <i id="IA_calendar_icon" v-bind:class="className" class="fas fa-calendar-alt float-left pt-1 mr-2"></i> <span class=" sidenavSpan" v-bind:class="className"> Medical Date and Time </span></div>
            <div class="p-2"> <i class="fas fa-user float-left pt-1 mr-2" v-bind:class="className1"></i> <span class="sidenavSpan" v-bind:class="className1"> Applicant's Detail </span></div>
            <div class="p-2"> <i class="fas fa-eye  float-left text-secondary pt-1 mr-2" v-bind:class="className2"></i> <span class="text-secondary sidenavSpan" v-bind:class="className2"> Preview </span></div>
        </div>
    </div>
</template>

<style lang="scss">
.sidenavFlex .p-2 {
    border: none;
}
.sidenavSpan {
    display: none;
}

@media only screen and (min-width: 768px) {
    .sidenavFlex .p-2 {
        border: none;
    }
    .sidenavSpan {
        display: none;
    }
}

@media only screen and (min-width: 1000px) {
    .sidenavFlex .p-2:first-child {
        border-left: 1px solid #afafaf;
        border-right: 1px solid #afafaf;
        border-bottom: 1px solid #afafaf;
    }
    .sidenavFlex .p-2:nth-child(2) {
        border-left: 1px solid #afafaf;
        border-right: 1px solid #afafaf;
        border-bottom: 1px solid #afafaf;
    }
    .sidenavFlex .p-2:last-child {
        border-left: 1px solid #afafaf;
        border-right: 1px solid #afafaf;
        border-bottom: 1px solid #afafaf;
    }
    .sidenavSpan {
        display: inline-block;
    }
    
}
</style>