<script setup>
import { useRoute } from "vue-router";
import TopNavBar from "@/components/includes/TopNavBar.vue";
import SideNavigation from "@/components/includes/SideNavigation.vue";
import FooterSection from "@/components/includes/FooterSection.vue";

import ShowSection_US from "@/components/pages/application/us/ShowSection.vue";
import ShowSection_CA from "@/components/pages/application/ca/ShowSection.vue";
import ShowSection_AU from "@/components/pages/application/au/ShowSection.vue";
import ShowSection_NZ from "@/components/pages/application/nz/ShowSection.vue";
import ShowSection_OT from "@/components/pages/application/ot/ShowSection.vue";

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
            <h1 class="m-0">Personal Information</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-secondary"> Home </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/" class="text-secondary">
                  Personal Information
                </router-link>
              </li>
            </ol>
          </div>
          <!-- /.col -->
          <div v-if="country === 'US'" class="col-12 mb-5">
            <ShowSection_US />
          </div>
          <div v-else-if="country === 'CA'" class="col-12">
            <ShowSection_CA />
          </div>
          <div v-else-if="country === 'AU'" class="col-12">
            <ShowSection_AU />
          </div>
          <div v-else-if="country === 'NZ'" class="col-12">
            <ShowSection_NZ />
          </div>
          <div v-else class="col-12">
            <ShowSection_OT />
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
