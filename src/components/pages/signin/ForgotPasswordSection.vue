<script setup>
import axios from 'axios'
import { ref } from 'vue'
// import { useUserStore } from '@/store/user-store'
// import { useProfileStore } from '@/store/profile-store'
import SubmitFormButton from "../../global/SubmitFormButton.vue";
import TextInput from "../../global/TextInput.vue";
import RouterButton from "../../global/RouterButton.vue";
import { Form } from 'vee-validate'
import Swal from '@/sweetalert2'
import * as yup from 'yup';

// const userStore = useUserStore()
// const profileStore = useProfileStore()

let email = ref(null)
let errors = ref([])

const schema = yup.object({
  email: yup.string().required('Email is required!').email('Email must be a valid email'),
})

const handleChangepassword = async () => {
  errors.value = []
  const requestPAYLOAD = { email: email.value}

  try {
    let responsePAYLOAD = await axios.post('forgot-password/', requestPAYLOAD);
    let status_code = responsePAYLOAD.data.status_code
    let error_title = responsePAYLOAD.data.error_title
    let error_msg = responsePAYLOAD.data.error_msg

    if (status_code === 200) {
      Swal.fire(error_title, error_msg, "success")
    } else if (status_code === 400) {
      Swal.fire(error_title, error_msg, "error")
    } else {
      Swal.fire("Undefined error", "Please contact administrator for this request", "error");
    }
  } catch (err) {
          errors.value = err.response.data.errors
  }
 
}

</script>

<template>
  <div
    class="col-lg-8 col-md-12 col-sm-12 p-0 m-0 bg-white d-flex justify-content-center"
  >
    <div class="login-box">
      <div class="card_divs">
        <div class="card-header text-start">
          <h2 class="text-dark card_title">Recover Password</h2>
          <p class="fw-light text-secondary">Enter your Email and instructions will be sent to you!</p>
        </div>
        <div class="card-body">
          <Form @submit="handleChangepassword" :validation-schema="schema">
            <div class="mb-4">
              <TextInput
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="email"
                    inputType="email"
                    v-model:input="email"      
                    inputClassName="form-control"
                    placeholder="Email"
                    iconClassName="fas fa-envelope"
                    FieldName="email"
                    ErrorName="email"
                    :error="errors.email ? errors.email[0] : ''"
              />
            </div>

            <div class="row">
              <div class="col-12">
                <SubmitFormButton
                  btnType="submit"
                  className="btn btn-warning btn-block"
                  btnText="Reset"
                />
              </div>
            </div>
          </Form>
          <div class="social-auth-links text-center mt-4 mb-3">
              <RouterButton
                btnClassName="btn btn-block btn-secondary"
                btnUrl="../signin"
                btnText="Back to Sign In"
              />
            </div>

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

<style lang="scss">
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
