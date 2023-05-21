<script setup>
    import { onMounted, ref } from 'vue'
    // import { useRouter } from 'vue-router'
    import { useProfileStore } from '../../../store/profile-store'
    // import { ucwords } from './../../../assets/js/string_functions.js'
    import { Form } from 'vee-validate'
    import { ErrorMessage } from 'vee-validate'

    import TextInput from '../../global/TextInput.vue'
    import DisplayCropperButton from '@/components/global/DisplayCropperButton.vue'
    import CroppedImage from '../../global/CroppedImage.vue'
    import CropperModal from '../../global/CropperModal.vue'
    import * as yup from 'yup';

    const profileStore = useProfileStore()


    let showModal = ref(false)
    let image = ref(null)
    let firstName = ref(null)
    let lastName = ref(null)
    let middleName = ref(null)

    let errors = ref([])
    /**
     * For Fetching user data
     */

    onMounted(() => {
        firstName.value = profileStore.firstName || null
        middleName.value = profileStore.middleName || null
        lastName.value = profileStore.lastName || null
    })

    const setCroppedImageData = (data) => {
        // imageData = data
        image.value = data.imageUrl
    }
    const schema = yup.object().shape({
        firstName: yup.string().required('This field is required!'),
        middleName: yup.string().optional().nullable(),
        lastName: yup.string().required("This field is required!"),
    })

    const handleUpdate =  (values) => {
        errors.value = []

        const jsonDATA = {
                json_firstName: values.firstName,
                json_middleName: values.middleName,
                json_lastName: values.lastName,
        }


        console.log(jsonDATA)
    }

</script>

<template>
    <div class="row col-12">
        <div class="col-10 container-fluid p-0 mt-3">
            <h3>Profile Information</h3>
            <div class="bg-primary w-100 p-1 m-0"></div>
            <CropperModal
                v-if="showModal"
                :minAspectRatioProp="{width: 8, height: 8}"
                :maxAspectRatioProp="{width: 8, height: 8}"
                @croppedImageData="setCroppedImageData"
                @showModal="showModal = false"
            />
            <Form @submit="handleUpdate"  :validation-schema="schema" class="row">
                <div class="col-lg-6 col-md-12 col-sm-12 pt-3">
                    <TextInput
                        labelClassName="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        FieldName="firstName"
                        label="First Name"
                        inputType="text"
                        inputClassName="form-control"
                        iconClassName="fas fa-user"
                        placeholder="First Name"
                        v-model:input="firstName"
                    />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <ErrorMessage name="firstName" class="text-danger"/>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 pt-3">
                    <TextInput
                        labelClassName="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        FieldName="middleName"
                        label="Middle Name"
                        inputType="text"
                        inputClassName="form-control"
                        iconClassName="fas fa-user"
                        placeholder="Middle Name"
                        v-model:input="middleName"
                    />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <ErrorMessage name="middleName" class="text-danger"/>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 pt-3">
                    <TextInput
                        labelClassName="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        FieldName="lastName"
                        label="Last Name"
                        inputType="text"
                        inputClassName="form-control"
                        iconClassName="fas fa-user"
                        placeholder="Last Name"
                        v-model:input="lastName"
                    />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                    <ErrorMessage name="lastName" class="text-danger"/>
                </div>
                <div class="col-12 pt-3">
                    <DisplayCropperButton 
                        labelClass="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        label="Profile Image"
                        btnClass="btn btn-secondary"
                        btnText="Update Profile Image"
                        @showModal="showModal = true"
                    />
                </div>
                <div class="col-12 pt-3">
                    <div class="w-100">
                        <CroppedImage
                            label="Cropped Image"
                            imageClass="CroppedImage border border-primary"
                            :image="image"
                        />
                    </div>
                </div>

                <div class="col-lg-6 col-md-12 col-sm-12 pt-3">
                    <TextInput
                        labelClassName="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        label="Username"
                        inputType="text"
                        inputClassName="form-control"
                        iconClassName="fas fa-user"
                        placeholder="Username"
                    />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 pt-3">
                    <TextInput
                        labelClassName="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        label="Email"
                        inputType="email"
                        inputClassName="form-control"
                        iconClassName="fas fa-envelope"
                        placeholder="Email"
                    />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 pt-3">
                    <TextInput
                        labelClassName="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        label="Password"
                        inputType="password"
                        inputClassName="form-control"
                        iconClassName="fas fa-lock"
                        placeholder="Password"
                    />
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 pt-3">
                    <TextInput
                        labelClassName="
                            text-uppercase 
                            text-s 
                            mb-0 
                            text-dark
                            pb-1
                        "
                        label="Confirm Password"
                        inputType="password"
                        inputClassName="form-control"
                        iconClassName="fas fa-lock"
                        placeholder="Confirm Password"
                    />
                </div>
                <div class="col-12 pt-5">
                    <button class="btn btn-primary float-right" type="submit">Update Profile</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<style lang="scss">
.full_name {
    text-align: center;
}
.CroppedImage {
    min-width: 50%;
    max-width: 100%;
    width: auto;
    height: auto;
    border-radius: 5px;
}
@media only screen and (min-width: 768px) {
    .full_name {
        text-align: center;
    }
    .CroppedImage {
        min-width: 25%;
        max-width: 100%;
    }
}

@media only screen and (min-width: 1000px) {
    .full_name {
        text-align: left;
    }
    .CroppedImage {
        min-width: 25%;
        max-width: 30%;
    }
}

</style>