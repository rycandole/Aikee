<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from "vue-router";
import SubmitFormButton from "../../global/SubmitFormButton.vue";
import RequiredInputField from '@/components/global/RequiredInputField'
import { Form } from 'vee-validate'
import Swal from '@/sweetalert2'
import * as yup from 'yup';

const router = useRouter();

let code = ref(null)
let email = ref(null)
let password = ref(null)
let errors = ref([])

const numOnlyRegex = /^[\p{N}]+$/u;

const schema = yup.object({
  code: yup.string().required("Code is required!").min(4, "Code must be exactly 4 digits!").max(4, "Code must be exactly 4 digits!").matches(numOnlyRegex, "Code must be number only!"),
  email: yup.string().required('Email is required!'),
  password: yup.string().required("Password is required!").min(8, 'Password must be atleast 8 characters').max(40, "Password is too long, Please minimize your password!"),
  confirm_password: yup.string().required("Confirm your password!").oneOf([yup.ref('password')], 'Passwords do not match')
})

const handleChangepassword = async () => {
  errors.value = []

  const requestPAYLOAD = { 
            code: code.value,
            email: email.value,
            password: password.value
        }

  try {
    let responsePAYLOAD = await axios.post('new-password/', requestPAYLOAD);
    let status_code = responsePAYLOAD.data.status_code
    let error_title = responsePAYLOAD.data.error_title
    let error_msg = responsePAYLOAD.data.error_msg

    if (status_code === 200) {
      Swal.fire(error_title, error_msg, "success")
      router.push("/signin");
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
          <h2 class="text-dark card_title">Create New Password</h2>
          <p class="fw-light text-secondary">Enter the details that send to your email</p>
        </div>
        <div class="card-body">
          <Form @submit="handleChangepassword" :validation-schema="schema">
            <div class="mb-4">
              <RequiredInputField
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Code"
                    type="text"
                    v-model:input="code"      
                    inputClassName="form-control"
                    placeholder="Code"
                    iconClassName="fas fa-envelope"
                    FieldName="code"
                    ErrorName="code"
                    :error="errors.code ? errors.code[0] : ''"
              />
              <RequiredInputField
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Username or Email"
                    type="text"
                    v-model:input="email"      
                    inputClassName="form-control"
                    placeholder="Username or Email"
                    iconClassName="fas fa-envelope"
                    FieldName="email"
                    ErrorName="email"
                    :error="errors.email ? errors.email[0] : ''"
              />
              <RequiredInputField
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="New Password"
                    type="password"
                    v-model:input="password"      
                    inputClassName="form-control"
                    placeholder="New Password"
                    iconClassName="fas fa-envelope"
                    FieldName="password"
                    ErrorName="password"
                    :error="errors.password ? errors.password[0] : ''"
              />
              <RequiredInputField
                    labelClassName="
                        text-uppercase 
                        text-s 
                        mb-2 
                        text-dark
                    "
                    label="Confirm Password"
                    type="password"  
                    inputClassName="form-control"
                    placeholder="Confirm Password"
                    iconClassName="fas fa-envelope"
                    FieldName="confirm_password"
                    ErrorName="confirm_password"
              />
            </div>

            <div class="row">
              <div class="col-12">
                <SubmitFormButton
                  btnType="submit"
                  className="btn btn-warning btn-block"
                  btnText="SUBMIT"
                />
              </div>
            </div>
          </Form>
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
