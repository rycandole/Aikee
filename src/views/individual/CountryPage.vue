<script setup>
    import TopNavBar from '@/components/includes/TopNavBar.vue'
    import SideNavigation from '@/components/includes/SideNavigation.vue'
    import FooterSection from '@/components/includes/FooterSection.vue'
    import CountryListSection from '@/components/pages/individual/CountryListSection.vue'
    

</script>
<template>
    <div class="wrapper">
        <TopNavBar />
        <SideNavigation />

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
                <div class="container-md">
                    <div class="row mb-2 pt-5 pb-5 class_for_padding">
                        <div class="col-sm-6">
                            <h1 class="m-0">Individual Applicant</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item "><router-link to="/" class="text-secondary"> home </router-link></li>
                                <li class="breadcrumb-item "><router-link to="/" class="text-secondary"> Individual </router-link></li>
                            </ol>
                        </div><!-- /.col -->
                            <CountryListSection />
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->

            <!-- /.content -->
        </div>
        <FooterSection />
    </div>
</template>