<script setup>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useProfileStore } from '../../../store/profile-store'
    import { ucwords } from './../../../assets/js/string_functions.js'
    import ProfileNavigation from './ProfileNavigation.vue'
    import RouterButton  from '../../global/RouterButton.vue'

    const router = useRouter()
    const profileStore = useProfileStore()

    /**
     * For Fetching user data
     */
     onMounted(async () => {
        await profileStore.fetchProfileById(router.params.id)
    })

    let full_name = ucwords(profileStore.firstName +" "+ profileStore.lastName)

</script>

<template>
    <div class="row col-12 mt-3">
        <div class="col-10 container-fluid">
            <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12 overflow-hidden">
                    <img src="https://via.placeholder.com/500" class="w-lg-100 w-md-50 w-sm-75 mh-lg-100 mh-md-75 mh-sm-75 h-auto img-thumbnail rounded mx-auto d-block" alt="Profile Photo">
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 pt-2">
                    <h1 class="text-primary full_name">
                        {{ full_name }}
                        <!-- {{ profileStore.firstName }} {{ profileStore.lastName }} -->
                    </h1>
                    <b class="text-secondary profile_username">
                        Username: ({{ profileStore.username }})
                    </b>
                </div>
                <div class="col-lg-2 col-md-12 col-sm-12 pt-2">
                    <RouterButton 
                        class="btn btn-primary w-100"
                        btnClassName="btn btn-primary"
                        btnUrl="/edit-profile"
                        btnText="Edit Profile"
                    />
                    <!-- <button class="btn btn-primary w-100">
                        Edit Profile
                    </button> -->
                </div>
            </div>
        </div>
    </div>
    <div class="row col-12">
        <div class="col-10 container-fluid p-0 mt-3">
            <h3>Account Information</h3>
            <div class="bg-primary w-100 p-1 m-0"></div>
        </div>
    </div>
    <ProfileNavigation />
</template>

<style lang="scss">
.full_name {
    text-align: center;
}
@media only screen and (min-width: 768px) {
    .full_name {
        text-align: center;
    }
}

@media only screen and (min-width: 1000px) {
    .full_name {
        text-align: left;
    }
}

</style>