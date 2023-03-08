<script setup>
import SubmitFormButton from "../../global/SubmitFormButton.vue";
import TextInput from "../../global/TextInput.vue";
import RouterButton from "../../global/RouterButton.vue";
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
          <form action="../../index3.html" method="post">
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
                    inputClassName="form-control"
                    placeholder="Email or Username"
                    iconClassName="fas fa-envelope"
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
          </form>
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
