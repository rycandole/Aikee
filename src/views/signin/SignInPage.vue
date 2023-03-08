<script setup>
import SignInLeftSideSection from '../../components/includes/SignInLeftSideSection.vue'
import SignInRightSideSection from '../../components/pages/signin/SignInRightSideSection.vue'


</script>

<template>
    <div class="row p-0 m-0 login_row fade-in-image">
        <!-- Left Side -->
        <SignInLeftSideSection />

        <!-- RightSide -->
        <SignInRightSideSection />


    </div>
</template>

<style lang="scss">
.login_row {
    height: 100vh;
    width: auto;
}
</style>