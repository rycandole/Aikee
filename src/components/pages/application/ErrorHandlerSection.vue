<script setup>

import { onMounted } from 'vue'





/**
 * For Fetching user data
 */
onMounted(async () => {

})



</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-2">
            <h1 class="text-secondary text-center fs-1 fw-bold" >Warning</h1>
        </div>
        
    </div>
    
    <!-- ============================================================== -->
                            <!-- End of Main Container -->
    <!-- ============================================================== -->
</template>

<style lang="scss">
.wrapper_container {
    margin: 0;
    margin-top: 1rem;
    padding: 1rem;
}

.covid_category  li { 
    list-style: none;
}

.inputDate {
    width: 100%;
}
.irc_div {
    background: #f1f1f1;
}
.cell.day.selected{
    background: green !important;
}
.examRadioLeft, .examRadioRight {
    padding-left: 20px !important;
}
.applicant_detail_list li {
    font-weight: bold;
    font-size: 17px;
}
.civil_stat_select {
    margin-top: -25px;
    padding-bottom: 10px;
}
.nationality_select {
    margin-top: -25px;
    padding-bottom: 10px;
}
.contact_num {
    margin-top: -25px;
    padding-bottom: 10px;
}
.agency_select {
    margin-top: -25px;
    padding-bottom: 10px;
}
.dateField {
    margin-top: -35px;
    padding-bottom: 10px;
}
@media only screen and (min-width: 768px) {
    .wrapper_container {
        margin: 0;
        margin-top: 1rem;
        padding: 1rem;
    }
    .inputDate {
        width: 100%;
    }
    .examRadioLeft {
        padding-left: 30px !important;
    }
}

@media only screen and (min-width: 1000px) {
    .wrapper_container {
        margin: 3rem;
        padding: 2rem;
    }
    .inputDate {
        width: 50%;
    }
    .examRadioLeft {
        padding-left: 30px !important;
    }
}
</style>
