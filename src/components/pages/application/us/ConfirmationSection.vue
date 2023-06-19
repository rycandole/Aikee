<script setup>
// import axios from 'axios'
// import { ref } from 'vue'
// import { onMounted } from 'vue'
// import {useRoute} from "vue-router"
import FormHeader from '@/components/global/FormHeader.vue'
// import SubFormHeader from '@/components/global/SubFormHeader.vue'
// import PreviewText from '@/components/global/PreviewText.vue'
// import moment from 'moment'


</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="row">
        <div class="col-12">
            <button class="btn btn-outline-secondary btn-lg">
                Print <i class="fas fa-print pl-2"></i>
            </button>
        </div>
    </div>
    <div class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h1 class="text-secondary text-center fs-1 fw-bold" >SLEC Online Registration Confirmation - US230618U74DF7</h1>
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->
      
        <form class="col-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="SLEC Online Registration Confirmation - US230618U74DF7"
                        />
                    </div>
        
                </div>        
            </div>
        </form>    
        <!-- ============================================================== -->
                            <!-- End of Main Container -->
        <!-- ============================================================== -->
    </div>
    <div class="row">
        <div class="col-12 m-5 p-5">
            <h2 class="text-secondary text-center fs-1 fw-bold">Please wait...</h2>
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

.section_header {
    background-color: #069;
}

.inputDate {
    width: 100%;
}
.irc_div {
    background: #f1f1f1;
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
}

@media only screen and (min-width: 1000px) {
    .wrapper_container {
        margin: 3rem;
        padding: 2rem;
    }
    .inputDate {
        width: 50%;
    }
}
</style>