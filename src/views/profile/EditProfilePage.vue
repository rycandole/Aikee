<script setup>
    import TopNavBar from '../../components/includes/TopNavBar.vue'
    import SideNavigation from '../../components/includes/SideNavigation.vue'
    import FooterSection from '../../components/includes/FooterSection.vue'
    import EditProfileSection from '../../components/pages/pofile/EditProfileSection.vue'

</script>
<template>
    <div class="wrapper">
        <TopNavBar />
        <SideNavigation />
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Profile</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><router-link to="/"> Home </router-link></li>
                                <li class="breadcrumb-item active">Profile</li>
                            </ol>
                        </div><!-- /.col -->
                        <EditProfileSection />
                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->
            <!-- /.content -->
        </div>
        <FooterSection />
    </div>
</template>