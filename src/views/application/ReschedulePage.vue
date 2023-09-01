<script setup>
import { useRoute } from "vue-router";
import TopNavBar from "@/components/includes/TopNavBar.vue";
import SideNavigation from "@/components/includes/SideNavigation.vue";
import FooterSection from "@/components/includes/FooterSection.vue";

import RescheduleSection_US from "@/components/pages/application/us/RescheduleSection.vue";
import RescheduleSection_CA from "@/components/pages/application/ca/RescheduleSection.vue";
import RescheduleSection_AU from "@/components/pages/application/au/RescheduleSection.vue";
import RescheduleSection_NZ from "@/components/pages/application/nz/RescheduleSection.vue";
import RescheduleSection_OT from "@/components/pages/application/ot/RescheduleSection.vue";

const route = useRoute();

const country = route.params.country;
</script>
<template>
  <div class="wrapper">
    <TopNavBar />
    <SideNavigation />

    <!-- Content Wrapper. Contains page content -->
    
    <div class="content-wrapper p-1 pb-5">
      <div class="container-md">
        <div class="row mb-2 pt-5 pb-5 class_for_padding">
          <div class="col-sm-6">
            <h1 class="m-0">Re-schedule</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-secondary"> Home </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/" class="text-secondary">
                    Re-schedule
                </router-link>
              </li>
            </ol>
          </div>
          <!-- /.col -->
          <div v-if="country === 'US'" class="col-12 mb-2">
            <RescheduleSection_US />
          </div>
          <div v-else-if="country === 'CA'" class="col-12 mb-2">
            <RescheduleSection_CA />
          </div>
          <div v-else-if="country === 'AU'" class="col-12 mb-2">
            <RescheduleSection_AU />
          </div>
          <div v-else-if="country === 'NZ'" class="col-12 mb-2">
            <RescheduleSection_NZ />
          </div>
          <div v-else class="col-12 mb-2">
            <RescheduleSection_OT />
          </div>
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
      <!-- /.content -->
    </div>
    <FooterSection />
  </div>
</template>
<style lang="scss">

.class_for_padding {
    padding: 1rem 0 0 0;
}


@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {
    .class_for_padding {
        padding: 0 3rem 0 3rem;
      }

}
</style>