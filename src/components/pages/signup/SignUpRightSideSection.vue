<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useRoute } from "vue-router";
import { Form } from 'vee-validate'
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import RouterWithIcon from "@/components/global/RouterLinkBtnWithIcon.vue";
import TextInput from "@/components/global/TextInput.vue";
import Swal from '@/sweetalert2'
import * as yup from 'yup';


const router = useRouter()
const route = useRoute()
const COUNTRY = route.params.category
const TOKEN = route.params.token

let errors = ref([])
let firstName = ref(null)
let middleName = ref(null)
let lastName = ref(null)
let birthDate = ref(null)
let username = ref(null)
let email = ref(null)
let password = ref(null)
let confirmPassword = ref(null)
// let email_verify = ref(null)
// let token = ref(null)
// let expired = ref(null)
// let expired_date = ref(null)

onMounted(async () => {
  checkVerificationTOKEN()
});

const checkVerificationTOKEN = async () => {

  let responsePAYLOAD = await axios.get("verify_token/"+ COUNTRY +"/"+ TOKEN);
  let status_code = responsePAYLOAD.data.status_code
  let error_tittle = responsePAYLOAD.data.error_title
  let error_msg = responsePAYLOAD.data.error_msg
  // alert(count)
  if (status_code == 200) {
    Swal.fire(error_tittle, error_msg, "info" )
  } else if (status_code == 406) {
    Swal.fire(error_tittle, error_msg, "warning" )
  } else {
    alert("Token not exist!")
  }

}

const handleSignUp = async () => {
  errors.value = []

  const requestPAYLOAD = {
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

          let res = await axios.post('signup/', requestPAYLOAD )

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

const nameRegex = /^[\p{L}\p{M}\s-]+$/u;

const schema = yup.object({
  first_name: yup.string().required('First name is required!').min(2, 'First name must be atleast 2 characters').max(25, 'First name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  middle_name: yup.string().nullable().matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  last_name: yup.string().required('Last name is required!').min(2, 'Last name must be atleast 2 characters').max(25, 'Last name must be at most 25 characters').matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
  birthdate: yup.string().required('Birthdate is required!').min(new Date(1925, 0, 1), "Birthdate must be atleast January 01, 1923"),
  username: yup.string().required('Username is required!').min(5, 'Username must be atleast 2 characters').max(25, 'Username must be at most 25 characters'),
  email: yup.string().required('Email is required!').email('Email must be a valid email'),
  password: yup.string().required('Password is required!').min(8, 'Password must be atleast 8 characters'),
  passwordConfirmation: yup.string().required('Confirm password is required!').oneOf([yup.ref('password')], 'Passwords do not match'),
})




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
          <Form @submit="handleSignUp" :validation-schema="schema" class="row">
            <div class="mb-4 col-lg-6 col-md-12 col-sm-12">
              
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="First Name"
                    type="text"
                    inputClassName="form-control"
                    placeholder="First Name"
                    iconClassName="fas fa-user"
                    FieldName="first_name"
                    ErrorName="first_name"
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
                    type="text"
                    inputClassName="form-control"
                    placeholder="Middle Name"
                    iconClassName="fas fa-user"
                    optLabelClassName="text-secondary text-lowercase"
                    optionalLabel="(optional)"
                    FieldName="middle_name"
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
                    type="text"
                    inputClassName="form-control"
                    placeholder="Last Name"
                    iconClassName="fas fa-user"
                    FieldName="last_name"
                    ErrorName="last_name"
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
                    type="date"
                    inputClassName="form-control"
                    iconClassName="fa fa-calendar"
                    FieldName="birthdate"
                    ErrorName="birthdate"
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
                    type="text"
                    inputClassName="form-control"
                    placeholder="Username"
                    iconClassName="fas fa-user"
                    FieldName="username"
                    ErrorName="username"
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
                    type="email"
                    inputClassName="form-control"
                    placeholder="Email"
                    iconClassName="fas fa-envelope"
                    FieldName="email"
                    ErrorName="email"
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
                type="password"
                inputClassName="form-control"
                placeholder="Password"
                iconClassName="fas fa-lock"
                FieldName="password"
                ErrorName="password"
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
                type="password"
                inputClassName="form-control"
                placeholder="Confirm password"
                iconClassName="fas fa-lock"
                FieldName="passwordConfirmation"
                ErrorName="passwordConfirmation"
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
                  :disabled="isDisabled"
                  btnType="submit"
                  className="btn btn-primary btn-block"
                  btnText="Sign Up"
                />
            </div>
          </Form>

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
