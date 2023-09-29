<script setup>
import { useRoute } from "vue-router";
import TopNavBar from "@/components/includes/TopNavBar.vue";
import SideNavigation from "@/components/includes/SideNavigation.vue";
import FooterSection from "@/components/includes/FooterSection.vue";

import ErrorHandlerSection from "@/components/pages/application/ErrorHandlerSection.vue";

const route = useRoute();

const country = route.params.country;

alert(country)

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
            <h1 class="m-0">Warning</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-secondary"> Home </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/" class="text-secondary">
                  Error
                </router-link>
              </li>
            </ol>
          </div>
          <!-- /.col -->
          <div class="col-12 mb-2">
            <ErrorHandlerSection />
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