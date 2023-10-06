<script setup>
import axios from "axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import FormHeader from "@/components/global/FormHeader.vue";
import SubFormHeader from "@/components/global/SubFormHeader.vue";
import PreviewText from "@/components/global/PreviewText.vue";
import SubNavbar from "@/components/includes/SubNavbar.vue";
import moment from "moment";

const route = useRoute();
const regId = route.params.id;

let showApplication = ref([]);
let US_Information = ref(null);

const visaPrefCategory = new Map([
  ["NONE", "NONE"],
  ["AM-VTNM", "AM-VTNM (VIETNAMESE AMERASIAN)"],
  ["CR1", "CR1 (SPOUSE OF U.S. CITIZEN UNDER TWO YEARS OF MARRIAGE)"],
  ["CR2", "CR2 (CHILD OF U.S. CITIZEN UNDER TWO YEARS OF MARRIAGE)"],
  ["DV", "DV (DIVERSITY VISA)"],
  ["E1", "E1 (ALIEN WITH EXTRAORDINARY ABILITY)"],
  ["E2", "E2 (PROFESSIONAL HOLDING ADVANCED DEGREE)"],
  ["E3", "E3 (SKILLED WORKER)"],
  ["E4", "E4 (SD1 MINISTER OF RELIGION)"],
  ["E5", "E5 (IMMIGRANT INVESTORS)"],
  ["EW", "EW (OTHER WORKER (UNSKILLED WORKERS))"],
  ["EX", "EX (SCHEDULE WORKERS)"],
  ["F1-F11", "F1-F11 (UNMARRIED SON/DAUGHTER OF U.S. CITIZEN)"],
  ["F1-F12", "F1-F12 (CHILD OF F11)"],
  ["F2A-F21", "F2A-F21 (SPOUSE OF LAWFUL PERMANENT RESIDENT)"],
  ["F2A-F22", "F2A-F22 (CHILD OF LAWFUL PERMANENT RESIDENT)"],
  ["F2A-F23", "F2A-F23 (DERIVATIVE CHILD OF F21 OR F22)"],
  ["F2B-F24", "F2B-F24 (UNMARRIED SON/DAUGHTER OF LAWFUL PER. ADDRESS)"],
  ["F2B-F25", "F2B-F25 (DERIVATIVE CHILD OF F24)"],
  ["F3-F31", "F3-F31 (MARRIED SON/DAUGHTER OF U.S. CITIZEN)"],
  ["F3-F32", "F3-F32 (DERIVATIVE SPOUSE OF F31)"],
  ["F3-F33", "F3-F33 (DERIVATIVE CHILD OF F31)"],
  ["F4-F41", "F4-F41 (BROTHER/SISTER OF U.S. CITIZEN)"],
  ["F4-F42", "F4-F42 (DERIVATIVE SPOUSE OF F41)"],
  ["F4-F43", "F4-F43 (DERIVATIVE CHILD OF F41)"],
  ["FX-F21", "FX-F21 (SPOUSE OF LAWFUL PERMANENT RESIDENT)"],
  ["FX-F22", "FX-F22 (CHILD OF LAWFUL PERMANENT RESIDENT)"],
  ["FX-F23", "FX-F23 (DERIVATIVE CHILD OF F-21 OR F22)"],
  ["FP1", "FP1 (PAROLEE)"],
  ["IB1", "IB1 (SELF PETITIONING SPOUSE OF A U.S. CITIZEN)"],
  ["IH3", "IH3 (ADOPTION CASE)"],
  ["IH4", "IH4 (ADOPTION CASE APPROVE AFTER APR. 2008)"],
  ["IH4", "IH4 (ADOPTION CASE APPROVED AFTER APR. 2008)"],
  ["IR1", "IR1 (SPOUSE OF A U.S. CITIZEN)"],
  ["IR2", "IR2 (CHILDREN OF A U.S. CITIZEN PARENTS UNDER 21 YRS. OLD)"],
  ["IR3", "IR3 (ORPHAN ADOPTED ABROAD BY U.S. CITIZEN)"],
  ["IR4", "IR4 (ORPHAN TO BE ADOPTED ABROAD BY U.S. CITIZEN)"],
  ["IR5", "IR5 (PARENT OF U.S. CITIZEN (18 YEARS OLD ABOVE))"],
  ["IW1", "IW1 (SPOUSE OF A DECEASED U.S.CITIZEN)"],
  ["IW2", "IW2 (DERIVATIVE CHILD OF IW1)"],
  ["K1", "K1 (FIANCEE)"],
  ["K2", "K2 (DERIVATIVE CHILD OF K1)"],
  ["K3", "K3 (K3 VISA)"],
  ["K4", "K4 (K4 VISA)"],
  ["SB1", "SB1 (RETURNING RESIDENT)"],
  ["SD", "SD (CERTAIN RELIGIOUS WORKER)"],
  ["SE", "SE (SPECIAL IMMIGRANT)"],
  ["SM1", "SM1 (SPECIAL IMMIGRANT OR ARMED FORCES GROUP)"],
  ["SR", "SR (CERTAIN RELIGIOUS WORKER)"],
  ["SQ", "SQ (CERTAIN IRAQIS OR AFGHANS EMPLOYED BY THE U.S. GOVERNMENT)"],
  ["VISA-93", "VISA-93 (REFUGEE FOLLOW-TO-JOIN)"],
  ["YY", "YY (ASYLEE)"],
]);
onMounted(async () => {
  showInformation();
});

const showInformation = async () => {
  let res = await axios.get("us-show/" + regId);

  showApplication = res.data.result;
  // let count = res.data.result.length
  US_Information.value = showApplication;
  // console.log(res.data.result.length)

  // for (let i = 0; i <= count; i++) {
  //   alert(res.data.result[i].Seen)
  // }
};
</script>

<template>
  <!-- ============================================================== -->
  <!-- Main Container -->
  <!-- ============================================================== -->
  <div class="row">
    <div class="col-12">
      <SubNavbar />
    </div>
  </div>
  <div v-if="US_Information" class="wrapper_container row bg-white border">
    <div class="col-12">
      <h1 class="text-secondary text-center fs-1 fw-bold">United States of America</h1>
    </div>
    <!-- ============================================================== -->
    <!-- Main Container -->
    <!-- ============================================================== -->

    <form v-for="(row, index) in US_Information" :key="index" class="col-12 mb-3">
      <div class="col-12 mb-3">
        <div class="card-body row">
          <div class="col-12 pb-3" :hidden="`${row.Seen}` == 1 ? false : true">
            <h2 class="text-success text-center">
              This application was arrived.
            </h2>
          </div>
          <div class="col-12">
            <FormHeader headerText="Medical Examination Schedule" />
          </div>

          <div class="col-lg-8 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Preferred Date of Medical examination"
              v-bind:previewText="moment(`${row.PreferredMedicalExamDate}`).format('LL')"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="col-lg-8 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Preferred Time of Medical examination"
              v-bind:previewText="`${row.priorityTime}`"
            />
          </div>
          <div class="mb-3 col-12">
            <FormHeader headerText="Case Information" />
          </div>

          <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="NVC Case Number"
              v-bind:previewText="`${row.CaseNo}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-12">
            <PreviewText
              previewLabel="Visa Preferemce Category"
              v-bind:previewText="visaPrefCategory.get(`${row.PrefCat}`)"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Interview Date"
              v-bind:previewText="`${row.InterviewDate}` == 'null' ? 'None' : moment(`${row.InterviewDate}`).format('LL')"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Interview Source"
              v-bind:previewText="`${row.InterviewSource}`"
            />
          </div>
          <div class="mb-3 mt-3 col-12">
            <FormHeader headerText="Applicant Details" />
            <SubFormHeader headerText="Basic Information (as indicated in passport)" />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Last Name"
              v-bind:previewText="`${row.LastName}`"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="First Name"
              v-bind:previewText="`${row.FirstName}`"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Middle Name"
              v-bind:previewText="`${row.MiddleName}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-3 col-mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Date of Birth"
              v-bind:previewText="moment(`${row.DOB}`).format('LL')"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText previewLabel="Gender" v-bind:previewText="`${row.Gender}`" />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Civil Status"
              v-bind:previewText="`${row.CivStatus}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Country"
              v-bind:previewText="`${row.country_nationality}`"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Birthplace"
              v-bind:previewText="`${row.BirthCity}`"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Birth Country"
              v-bind:previewText="`${row.BirthCountry}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="col-12">
            <div class="row mt-1 p-3">
              <div class="col-12">
                <label class="text-capitalize"> Mother's maiden name </label>
              </div>
              <div class="col-12">
                <PreviewText previewLabel="" v-bind:previewText="`${row.maiden_name}`" />
              </div>
            </div>
          </div>
          <div class="mb-3 mt-5 col-12">
            <SubFormHeader headerText="Contact Information" />
          </div>
          <div class="mb-3 mt-3 col-12">
            <h5 class="text-uppercase">
              FOR APPLICANTS CURRENTLY LIVING IN THE PHILIPPINES:
            </h5>
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="PHILIPPINE ADDRESS"
              v-bind:previewText="`${row.HomeAddStreet}`"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="City/Town"
              v-bind:previewText="`${row.HomeAddCity}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Province"
              v-bind:previewText="`${row.HomeAddProvince}`"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Zip Code"
              v-bind:previewText="`${row.HomeAddZip}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-3 mt-5 col-12">
            <h5 class="text-uppercase">
              FOR APPLICANTS CURRENTLY LIVING OUTSIDE THE PHILIPPINES:
            </h5>
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Overseas Address"
              v-bind:previewText="`${row.ForeignAddCountry}`"
            />
          </div>
          <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Street Address"
              v-bind:previewText="`${row.ForeignAddStreet}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="City/Town"
              v-bind:previewText="`${row.ForeignAddCity}`"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Province/State"
              v-bind:previewText="`${row.ForeignAddState}`"
            />
          </div>
          <div class="mb-1 col-12">
            <PreviewText
              previewLabel="Zip Code"
              v-bind:previewText="`${row.ForeignAddZip}`"
            />
          </div>
          <div class="col-12 mt-3 mb-1"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Contact Number"
              v-bind:previewText="`${row.HomeTelNo}`"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Email Address"
              v-bind:previewText="`${row.EmailAdd}`"
            />
          </div>

          <div class="col-12 mt-3 mb-1"><hr /></div>

          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Present Country of Residence"
              v-bind:previewText="`${row.PresCountry}`"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Prior Country of Residence"
              v-bind:previewText="`${row.PriorCountry}`"
            />
          </div>
          <div class="mb-3 mt-5 col-12">
            <SubFormHeader headerText="Passport Information" />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Passport Number"
              v-bind:previewText="`${row.PassportNo}`"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Issued by (Country) "
              v-bind:previewText="`${row.IssueCountry}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Issue Date"
              v-bind:previewText="moment(`${row.IssueDate}`).format('LL')"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Expiration Date"
              v-bind:previewText="moment(`${row.ValidDate}`).format('LL')"
            />
          </div>
          <div class="mb-3 mt-5 col-12">
            <SubFormHeader headerText="Additional Questions" />
          </div>
          <div class="mb-1 col-12">
            <div class="row mt-3">
              <!-- ====================== Date Input ======================== -->
              <div class="col-12">
                <PreviewText
                  previewLabel="Have you been issued a U.S. Tourist Visa?"
                  v-bind:previewText="`${row.US_NIV}` === 'y' ? 'Yes' : 'No'"
                />
              </div>
            </div>
          </div>
          <div class="col-12"><hr /></div>
          <div :hidden="`${row.US_NIV}` === 'y' ? false : true" class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Issuance Date"
              v-bind:previewText="`${row.NIV_IssueDate}` == 'null' ? 'None' : moment(`${row.NIV_IssueDate}`).format('LL')"
            />
          </div>
          <div :hidden="`${row.US_NIV}` === 'y' ? false : true" class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Expiration Date"
              v-bind:previewText="`${row.NIV_ExpireDate}` == 'null' ? 'None' : moment(`${row.NIV_ExpireDate}`).format('LL')"
            />
          </div>
          <div :hidden="`${row.US_NIV}` === 'y' ? false : true" class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Previous Medical Examination at SLEC"
              smallLabel="Month/Year"
              v-bind:previewText="moment(`${row.PrevMed_Date}`).format('LL')"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Date of previous Chest X-Ray"
              smallLabel="Month"
              v-bind:previewText="moment(`${row.Prev_CXRDate}`).format('LL')"
            />
          </div>
          <div class="mb-3 col-12">
            <FormHeader headerText="COVID-19 VACCINE" />
          </div>
          <div class="mb-3 col-12">
            <PreviewText
              previewLabel="Have you received your COVID-19 vaccine?"
              v-bind:previewText="`${row.received_vaccine === 'y' ? 'Yes' : 'No'}`"
            />
          
            <ol type="I" :hidden="`${row.received_vaccine }` == 'y' ? false : true">
              <li :hidden="`${row.vaccine_brand}` == 'null' ? true : false">
                <PreviewText
                  previewLabel="Vaccine Brand Name"
                  v-bind:previewText="`${row.vaccine_brand}` == 'null' ? 'None' : `${row.vaccine_brand}`"
                />
                
              </li>
              <li :hidden="`${row.first_dose}` == 'null' ? true : false">
                <PreviewText
                  previewLabel="Vaccine Dose 1 Date Received "
                  v-bind:previewText="`${row.first_dose}` == 'null' ? 'None' : moment(`${row.first_dose}`).format('LL')"
                />
              </li>
              <li :hidden="`${row.second_dose}` == 'null' ? true : false">
                <PreviewText
                  previewLabel="Vaccine Dose 2 Date Received "
                  v-bind:previewText="`${row.second_dose}` == 'null' ? 'None' : moment(`${row.second_dose}`).format('LL')"
                />
              </li>
              <li :hidden="`${row.booster1_brand}` == 'null' ? true : false">
                <hr />
                <PreviewText
                  previewLabel="Vaccine Booster 1 Brand Name"
                  v-bind:previewText="`${row.booster1_brand}` == 'null' ? 'None' : `${row.booster1_brand}`"
                />
              </li>
              <li :hidden="`${row.booster1}` == 'null' ? true : false">
                <PreviewText
                  previewLabel="Vaccine Booster 1 Date Received"
                  v-bind:previewText="`${row.booster1}` == 'null' ? 'None' : moment(`${row.booster1}`).format('LL')"
                />
              </li>
              <li :hidden="`${row.booster2_brand}` == 'null' ? true : false">
                <hr />
                <PreviewText
                  previewLabel="Vaccine Booster 2 Brand Name"
                  v-bind:previewText="`${row.booster2_brand}` == 'null' ? 'None' : `${row.booster2_brand}`"
                />
              </li>
              <li :hidden="`${row.booster2}` == 'null' ? true : false">
                <PreviewText
                  previewLabel="Vaccine Booster 2 Date Received"
                  v-bind:previewText="`${row.booster2}` == 'null' ? 'None' : moment(`${row.booster2}`).format('LL')"
                />
              </li>
            </ol>
          </div>
          <div class="mb-3 col-12">
            <FormHeader headerText="Petitioner's Information" />
          </div>
          <div class="mb-1 col-12">
            <PreviewText
              previewLabel="Name of Petitioner"
              v-bind:previewText="`${row.Peti_Name}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-12">
            <PreviewText
              previewLabel="Is the petitioner still alive?"
              v-bind:previewText="`${row.Peti_Stat}` === 'y' ? 'Yes' : 'No'"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-12">
            <PreviewText
              previewLabel="Relationship"
              v-bind:previewText="`${row.Peti_Relation}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="U.S. Address"
              v-bind:previewText="`${row.Peti_Street}`"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText previewLabel="City" v-bind:previewText="`${row.Peti_City}`" />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText previewLabel="State" v-bind:previewText="`${row.Peti_State}`" />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Postal Code"
              v-bind:previewText="`${row.Peti_Zip}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Contact Number"
              v-bind:previewText="`${row.Peti_Number}`"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Email Address"
              v-bind:previewText="`${row.Peti_Email}`"
            />
          </div>
          <div class="col-12"><hr /></div>
          <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
            <PreviewText
              previewLabel="Intended Port of Entry"
              v-bind:previewText="`${row.PortEntry}`"
            />
          </div>
        </div>
      </div>
    </form>
    <!-- ============================================================== -->
    <!-- End of Main Container -->
    <!-- ============================================================== -->
  </div>
  <div v-else class="row">
    <div class="col-12 m-5 p-5">
      <h2 class="text-secondary text-center fs-1 fw-bold">Please wait...</h2>
    </div>
  </div>

  <!-- ============================================================== -->
  <!-- End of Main Container -->
  <!-- ============================================================== -->
</template>

<style lang="scss">
.wrapper_container {
  margin: 0;
  margin-top: 1rem;
  padding: 1rem;
}

.section_header {
  background-color: #069;
}

.inputDate {
  width: 100%;
}
.irc_div {
  background: #f1f1f1;
}

@media only screen and (min-width: 768px) {
  .wrapper_container {
    margin: 0;
    margin-top: 1rem;
    padding: 1rem;
  }
  .inputDate {
    width: 100%;
  }
}

@media only screen and (min-width: 1000px) {
  .wrapper_container {
    margin: 3rem;
    padding: 2rem;
  }
  .inputDate {
    width: 50%;
  }
}
</style>
