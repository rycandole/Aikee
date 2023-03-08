<script setup>
import SignInLeftSideSection from '../components/includes/SignInLeftSideSection.vue'
import NotFound from '../components/pages/404/NotFound.vue'

</script>

<template>
    <div class="row p-0 m-0 login_row fade-in-image">
        <!-- Left Side -->
        <SignInLeftSideSection />

        <!-- RightSide -->
        <NotFound />
    </div>

</template>

<style lang="scss">
.login_row {
    height: 100vh;
    width: auto;
}

</style>