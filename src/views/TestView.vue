<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

let phone_1 = ref(null);
let phone_2 = ref(null);
let phone_3 = ref(null);

const handleDetails = () => {
  alert(phone_1.value + " | " + phone_2.value + " | " + phone_3.value);
};

// const schema = yup.object().shape({
//   memberType: yup.string().required(),
//   phone1: yup.string().required(),
//   phone2: yup
//     .string()
//     .trim()
//     .when("memberType", {
//       is: "individual",
//       then: yup.string().required("Must enter phone number"),
//     }),
// });

const schema = yup.object().shape(
  {
    phone1: yup.string().when(["phone2", "phone3"], {
      is: (phone2, phone3) => !phone2 && !phone3,
      then: yup.string().required("Please enter one of the three fields"),
    }),
    phone2: yup.string().when(["phone1", "phone3"], {
      is: (phone1, phone3) => !phone1 && !phone3,
      then: yup.string().required("Please enter one of the three fields"),
    }),
    phone3: yup.string().when(["phone1", "phone2"], {
      is: (phone1, phone2) => !phone1 && !phone2,
      then: yup.string().required("Please enter one of the three fields"),
    }),
  },
  [
    ["phone1", "phone2"],
    ["phone1", "phone3"],
    ["phone2", "phone3"],
  ]
);

schema.validate({ phone1: "", phone2: "", phone3: "" }).catch(function (err) {
  console.log(err.errors[0]);
});
// const schema = yup.object.shape({
//   phone1: yup.string().required(),
// });
</script>
<template>
  <div>
    <br />
    <Form
      @submit="handleDetails"
      :validation-schema="schema"
      class="col-lg-9 col-md-12 col-sm-12 mb-3"
    >
      <Field
        type="text"
        placeholder="Phone 1"
        id="my_phone1"
        name="phone1"
        v-model="phone_1"
        width="100px"
      /><br />
      <ErrorMessage name="phone1" class="text-danger" /><br />

      <Field
        type="text"
        placeholder="Phone 2"
        id="my_phone2"
        name="phone2"
        v-model="phone_2"
        width="100px"
      /><br />
      <ErrorMessage name="phone2" class="text-danger" /><br />

      <Field
        type="text"
        placeholder="Phone 3"
        name="phone3"
        v-model="phone_3"
        width="100px"
      /><br />
      <ErrorMessage name="phone3" class="text-danger" /><br />

      <br />
      <button id="memberType" value="individual" type="submit">
        <strong>SUBMIT</strong>
      </button>
    </Form>
  </div>
</template>

<!-- 
Links
https://docs.google.com/document/d/1P0WVT5iGBRxnQNjDTDb8DVkXMW027JNn/edit?usp=sharing&ouid=112065918962317465179&rtpof=true&sd=true
https://docs.google.com/spreadsheets/d/1ZAJ-Ye0LzQyJNY2p-7ENByPvpJaj-id9euV39ZUP_Qs/edit?usp=sharing
https://docs.google.com/document/d/1GOUagcreWRd-F7FB4i6Okte7aVinhhWQ9QAq3-FwxXo/edit?usp=sharing
https://docs.google.com/document/d/1WDJBVIYwDvHLfpbua4IUTAOjuoNL9MKVAkZ1TebuPVs/edit?usp=sharing
https://docs.google.com/document/d/1KhVENFlWk-__RApvBL5D6fTbfw401-gL87U88gBZJ-A/edit
https://stackoverflow.com/questions/54919228/conditional-validation-with-yup-and-formik
 -->
