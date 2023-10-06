<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/store/user-store'
    import { useProfileStore } from '@/store/profile-store'
    import SubmitFormButton from '@/components/global/SubmitFormButton.vue'
    import { Form } from "vee-validate";
    // import RouterWithIcon from '@/components/global/RouterLinkBtnWithIcon.vue'
    import TextInput from '@/components/global/TextInput.vue'
    import Swal from '@/sweetalert2'
    import * as yup from "yup";


    const router = useRouter()
    const userStore = useUserStore()
    const profileStore = useProfileStore()

    let errors = ref([])
    let email = ref(null)
    let password = ref(null)

    const schema = yup.object().shape({
      email: yup.string().required("Email or Username is required!"),
      password: yup.string().required("Password is required!")
    })

    const handleSignIn = async () => {

      const JSONdata = {
            email : email.value,
            password : password.value
      }

        errors.value = []

        try {

            let res = await axios.post("signin/", JSONdata )
            
            if (res.data.status_code === 200 ) {
              Swal.fire({
                icon: 'success',
                title: res.data.error,
                showConfirmButton: false,
                timer: 2000
              })
              // alert(res.data.error)

              axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
              userStore.setUserDetails(res)
              await profileStore.fetchProfileById(userStore.id)

              // router.push('../' + userStore.id)
              router.push('../')
              
              return false
            } else {

              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.data.error
              })

              // alert(res.data.error)

              return false
            }

        } catch (err) {
            // errors.value = err.response.data.errors

            console.log(err)
        }

        return false;
    }


</script>

<template>
  <div
    class="col-lg-8 col-md-12 col-sm-12 p-0 m-0 bg-white d-flex justify-content-center"
  >
    <div class="login-box">
      <div class="card_divs">
        <div class="card-header text-start">
          <h2 class="text-dark card_title">Sign In to your account</h2>
          <p class="fw-light text-secondary">Enter your details below</p>
        </div>
        <div class="card-body">
          
          <Form  @submit="handleSignIn" :validation-schema="schema" >
            <div class="mb-4">
              <TextInput
                    labelClassName="
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Email"
                    type="text"
                    v-model:input="email"
                    inputClassName="form-control"
                    placeholder="Email or Username"
                    iconClassName="fas fa-envelope"
                    FieldName="email"
                    ErrorName="email"
                    :error="errors.email ? errors.email[0] : ''"
              />
            </div>
            <div class="mb-4">
              <TextInput
                labelClassName="
                        text-s 
                        mb-2 
                        text-dark
                    "
                label="Password"
                type="password"
                v-model:input="password"
                inputClassName="form-control"
                placeholder="Password"
                iconClassName="fas fa-lock"
                FieldName="password"
                ErrorName="password"
                :error="errors.password ? errors.password[0] : ''"
              />
            </div>
            <div class="row">
              <div class="col-12">
                <router-link to="/signin/forgot-password" class="forgot_pass mb-4"
                  ><i class="fas fa-unlock mr-2"></i> Forgot your
                  password?</router-link
                >
              </div>
              <div class="col-12">
                <SubmitFormButton
                  btnType="submit"
                  className="btn btn-primary btn-block"
                  btnText="Sign In"
                />
              </div>
              
            </div>
          </Form>

          <!-- <div class="social-auth-links text-center mt-4 mb-3">
            <RouterWithIcon
              className="btn btn-block btn-danger"
              url=""
              routerText="Sign in using Google+"
              iconClassName="fab fa-google-plus mr-2"
            />
          </div> -->

          <p class="mb-0 text-secondary">
            Don't have an account?
            <router-link to="/signup" class="text-primary fw-bold"
              >Sign Up</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fw-bold {
  font-weight: bold;
}

.card_divs {
  box-shadow: none;
  margin-top: 20%;
  border: 0;
  width: 100%;
}

.card_divs .card-header {
  border: 0;
}

.forgot_pass {
  float: right;
  color: #969494;
}

.forgot_pass:hover {
  cursor: pointer;
  color: #3b3a3a;
}

.fa-lock {
  margin-right: 5px;
  font-family: Rubik, sans-serif;
}

@media only screen and (min-width: 768px) {
  .card_divs {
    width: 120%;
  }
}

@media only screen and (min-width: 1000px) {
  .card_divs {
    width: 120%;
  }
}
</style>
