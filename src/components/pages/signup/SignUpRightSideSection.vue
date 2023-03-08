<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import SubmitFormButton from "../../global/SubmitFormButton.vue";
import RouterWithIcon from "../../global/RouterLinkBtnWithIcon.vue";
import TextInput from "../../global/TextInput.vue";
import Swal from '../../../../src/sweetalert2'


const router = useRouter()

let errors = ref([])
let firstName = ref(null)
let middleName = ref(null)
let lastName = ref(null)
let birthDate = ref(null)
let username = ref(null)
let email = ref(null)
let password = ref(null)
let confirmPassword = ref(null)

const handleSignUp = async () => {

errors.value = []

const JSONData = {
        first_name: firstName.value,
        middle_name: middleName.value,
        last_name: lastName.value,
        username: username.value,
        birth_date: birthDate.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
    }

    try {

        let res = await axios.post('signup/', JSONData )

        if (res.data.status_code === 200 ) {
            
          Swal.fire(
                res.data.error,
                'You clicked the button!',
                'success'
              )

          // alert(res.data.error)

          // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
          // userStore.setUserDetails(res)

          router.push('signin')

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
        errors.value = err.response.data.errors
    }

}


</script>

<template>
  <div class="col-lg-8 col-md-12 col-sm-12 p-0 m-0 bg-white d-flex justify-content-center">
    <div class="login-boxs">
      <div class="card_divs justify-content-center">
        <div class="card-header text-start">
          <h2 class="text-dark card_title">Sign Up to have an account</h2>
          <p class="fw-light text-secondary">Enter your details below</p>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSignUp" class="row">
            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="First Name"
                    inputType="text"
                    inputClassName="form-control"
                    placeholder="First Name"
                    iconClassName="fas fa-user"
                    v-model:input="firstName"
                    :error="errors.first_name ? errors.first_name[0] : ''"
              />
            </div>
            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-0 
                        text-dark
                    "
                    label="Middle Name"
                    inputType="text"
                    inputClassName="form-control"
                    placeholder="Middle Name"
                    iconClassName="fas fa-user"
                    optLabelClassName="text-secondary text-lowercase"
                    optionalLabel="(optional)"
                    v-model:input="middleName"
              />
            </div>
            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Last Name"
                    inputType="text"
                    inputClassName="form-control"
                    placeholder="Last Name"
                    iconClassName="fas fa-user"
                    v-model:input="lastName"
                    :error="errors.last_name ? errors.last_name[0] : ''"
              />
            </div>
            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Birthdate"
                    inputType="date"
                    inputClassName="form-control"
                    iconClassName="fa fa-calendar"
                    v-model:input="birthDate"
                    :error="errors.birth_date ? errors.birth_date[0] : ''"
              />              

            </div>

            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Username"
                    inputType="text"
                    inputClassName="form-control"
                    placeholder="Username"
                    iconClassName="fas fa-user"
                    v-model:input="username"
                    :error="errors.username ? errors.username[0] : ''"
              />
            </div>
            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Email"
                    inputType="email"
                    inputClassName="form-control"
                    placeholder="Email"
                    iconClassName="fas fa-envelope"
                    v-model:input="email"
                    :error="errors.email ? errors.email[0] : ''"
              />
            </div>
            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                label="Password"
                inputType="password"
                inputClassName="form-control"
                placeholder="Password"
                iconClassName="fas fa-lock"
                v-model:input="password"
                :error="errors.password ? errors.password[0] : ''"
              />
            </div>

            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              <TextInput
                labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                label="Confirm password"
                inputType="password"
                inputClassName="form-control"
                placeholder="Confirm password"
                iconClassName="fas fa-lock"
                v-model:input="confirmPassword"
              />
            </div>
            <div class="col-12">
              <p class="fw-light text-secondary">
                For password format please apply the categories on listed items: (Sample: password123)
                <ul>
                  <li>Minimum of 8 characters</li>
                  <li>Has a numeric value (Ex: 0-1)</li>
                  <li>Has a character value (Ex: a-z | A-Z)</li>
                </ul>
              </p>
            </div>

            <div class="col-12">
                <SubmitFormButton
                  btnType="submit"
                  className="btn btn-primary btn-block"
                  btnText="Sign Up"
                />
            </div>
          </form>

          <div class="social-auth-links text-center mt-4 mb-3">
            <RouterWithIcon
              className="btn btn-block btn-danger"
              url=""
              routerText="Sign Up using Google+"
              iconClassName="fab fa-google-plus mr-2"
            />
          </div>

          <p class="mb-0 text-secondary">
            Already have an account?
            <router-link to="/signin" class="text-primary fw-bold">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.fw-bold {
  font-weight: bold;
}

.login-boxs {
  width: 100%;
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
    width: 100%;
  }

  .login-boxs {
        width: 50%;
    }
}

@media only screen and (min-width: 1000px) {
  .card_divs {
    width: 100%;
  }
  .login-boxs {
    width: 50%;
  }
}
</style>
