<script setup>
    import TopNavBar from '@/components/includes/TopNavBar.vue'
    import SideNavigation from '@/components/includes/SideNavigation.vue'
    import FooterSection from '@/components/includes/FooterSection.vue'
    import ListSection from '@/components/pages/application/ListSection.vue'
    

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
                            <h1 class="m-0">Application</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item "><router-link to="/" class="text-secondary"> Home </router-link></li>
                                <li class="breadcrumb-item "><router-link to="/" class="text-secondary"> Application </router-link></li>
                            </ol>
                        </div><!-- /.col -->
                            <ListSection />
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->

            <!-- /.content -->
        </div>
        <FooterSection />
    </div>
</template>