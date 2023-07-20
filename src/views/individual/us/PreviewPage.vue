<script setup>
import TopNavBar from "@/components/includes/TopNavBar.vue";
import SideNavigation from "@/components/includes/SideNavigation.vue";
import FooterSection from "@/components/includes/FooterSection.vue";
import PreviewSection from "@/components/pages/individual/us/PreviewSection.vue";
import TimerAlertBox from "@/components/global/TimerAlertBox.vue";
</script>
<template>
  <div class="wrapper">
    <TopNavBar />
    <SideNavigation />
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <div class="row timerAlertBoxDiv">
        <div class="col-12">
          <TimerAlertBox divClassName="timerAlertBox" />
        </div>
      </div>
      <div class="container-lg">
        <div class="row mb-2 pt-5 pb-5 class_for_padding">
          <div class="col-sm-6">
            <h1 class="m-0">Individual U.S.A.</h1>
          </div>
          <!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/individual" class="text-secondary"
                  >Individual</router-link
                >
              </li>
              <li class="breadcrumb-item">
                <router-link to="" class="text-secondary">USA</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="" class="text-secondary">Preview</router-link>
              </li>
            </ol>
          </div>
          <!-- /.col -->
          <PreviewSection />
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
.timerAlertBox {
  width: 100%;
  min-height: 50px;
  float: right;
}
.timerAlertBoxDiv {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
}

@media only screen and (min-width: 768px) {
  .timerAlertBox {
    width: 50%;
  }
}

@media only screen and (min-width: 1000px) {
  .class_for_padding {
    padding: 0 3rem 0 3rem;
  }
  .timerAlertBox {
    width: 40%;
  }
}
</style>
