<script setup>
// import SubmitFormButton from "../../global/SubmitFormButton.vue";
// import RouterWithIcon from "../../global/RouterLinkBtnWithIcon.vue";
// import TextInput from "../../global/TextInput.vue";
</script>

<template>
  <div
    class="col-lg-8 col-md-12 col-sm-12 p-0 m-0 bg-white d-flex justify-content-center"
  >

    <!-- Main content -->
    <section class="content row mt-5 pt-5">
    <div class="error-page mt-5 col-lg-10 col-md-10 col-sm-10">
        <h2 class="headline text-warning"> 404</h2>

        <div class="error-content">
            <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.</h3>

            <p class="p-2">
                We could not find the page you were looking for.
                Meanwhile, you may <router-link to="../">return to dashboard</router-link> or try using the search form.
            </p>
        </div>
        <!-- /.error-content -->
    </div>
    <!-- /.error-page -->
    </section>
    <!-- /.content -->


  </div>
</template>
