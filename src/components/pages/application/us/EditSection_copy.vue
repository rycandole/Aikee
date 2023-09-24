<script setup>
import axios from "axios";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useProfileStore } from "@/store/profile-store";
import { Form } from "vee-validate";
import CalloutDanger from "@/components/global/CalloutDanger.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import FormHeader from "@/components/global/FormHeader.vue";
import SubFormHeader from "@/components/global/SubFormHeader.vue";
import DateField from "@/components/global/DateField.vue";
import RequiredInputField from "@/components/global/RequiredInputField.vue";
import RequiredSelectField from "@/components/global/RequiredSelectField.vue";
import SelectField from "@/components/global/SelectField.vue";
import InputField from "@/components/global/InputField.vue";
import RadioButton from "@/components/global/RadioButtton.vue";
import SubNavbar from "@/components/includes/SubNavbar.vue";
import Swal from "@/sweetalert2";
import { Field, ErrorMessage } from "vee-validate";
import moment from "moment";
// import * as yup from "yup";

// import { ucwords } from '../../../assets/js/string_functions'

// ================= Select Option Array ===================== //
import interviewSources from "@/assets/js/arrays/interviev_source_array";
import visaCategories from "@/assets/js/arrays/visa_categories_array";
import genderOption from "@/assets/js/arrays/gender_array";
import civilStatus from "@/assets/js/arrays/civil_status_array";
import countries from "@/assets/js/arrays/countries_array";
import philppineProvince from "@/assets/js/arrays/phil_province_array";
import months from "@/assets/js/arrays/month_array";
import years from "@/assets/js/arrays/year_list_array";
import relationship from "@/assets/js/arrays/relationship_array";
import states from "@/assets/js/arrays/states_array";
import vaccine from "@/assets/js/arrays/vaccine_list_array";
// import YearList from '@/assets/js/arrays/year_list_array'

const router = useRouter();
const route = useRoute();
const regId = route.params.id;
const country = route.params.country;
const paycode = route.params.paycode;
const profileStore = useProfileStore();

let email = profileStore.email;
let user_id = profileStore.id;

let registrationID = ref(null);
let date_of_birth = ref(null);
let validate_date_of_birth = ref(null)
let validate_first_dose = ref(null)
let validate_second_dose = ref(null)
let date_boolean = true;
let cv_category = ref(null);
let is_cv_received = true;
let cv_received = ref(null);
let cv_received_boolean = true;
let firstDose = ref(null);
let secondDose = ref(null);
let covidHidden = true;
let isVaccinated = true;
let noVaccine = true;
let vaccineHasOne = true;
// let vaccineHasTwo = true;
let hideBooster1 = true;
let hideBooster2 = true;
let cv_brand_name = ref(null);
let cv_brand_name_boolean = true;
let cv_brand_name_boolean_1 = true;
let cv_booster1 = ref(null);
let first_dose_booster = ref(null);
let cv_booster2 = ref(null);
let second_dose_booster = ref(null);
let callout_message = ref(null);
let showVisaDate = true;
let ci_nvc_number = ref(null);
let ci_nvc_confirm = ref(null);
let ci_visa_pref_category = ref(null);
let ci_interview_source = ref(null);
let ci_intervue_date = ref(null);
let ad_last_name = ref(null);
let ad_first_name = ref(null);
let ad_middle_name = ref(null);
let ad_gender = ref(null);
let ad_civil_status = ref(null);
let ad_nationality = ref(null);
let ad_birthplace = ref(null);
let ad_birth_country = ref(null);
let ad_mother_name = ref(null);
let ad_address = ref(null);
let ad_city = ref(null);
let ad_province = ref(null);
let ad_zip_code = ref(null);
let ad_overseas_country = ref(null);
let ad_overseas_street_address = ref(null);
let ad_overseas_city = ref(null);
let ad_overseas_province = ref(null);
let ad_overseas_zipcode = ref(null);
let ad_contact_numbers = ref(null);
let ad_present_residence = ref(null);
let ad_prior_residence = ref(null);
let ad_passport_number = ref(null);
let ad_passport_issued_by = ref(null);
let add_passport_date = ref(null);
let add_passport_expiration_date = ref(null);
let add_issuance_date = ref(null);
let add_expiration_date = ref(null);
let ad_has_been_issued_visa = ref(null);
let ad_prev_medical_exam_month = ref(null);
let ad_prev_medical_exam_year = ref(null);
let ad_prev_xray_month = ref(null);
let ad_prev_xray_year = ref(null);
let petitioner_fullname = ref(null);
let petitioner_is_alive = ref(null);
let petitioner_relationship = ref(null);
let petitioner_us_street_addr = ref(null);
let petitioner_us_city_addr = ref(null);
let petitioner_us_state_addr = ref(null);
let petitioner_us_postal_code = ref(null);
let petitioner_contact_no = ref(null);
let petitioner_email_addr = ref(null);
let intended_port_of_entry = ref(null);

let printHash = ref(null);
let PayCode = ref(null);
let receiveDate = ref(null);

let errors = ref([]);
let inputName = ref(null);
let inputError = ref(null);

// const caseNumberRegex = /^[\p{L}\p{N}\p{M}]+$/u;
// const nameRegex = /^[\p{L}\p{M}\s-]+$/u;
// const numOnlyRegex = /^[\p{N}]+$/u;
// const contactNumberRegex = /^[\p{N}\p{M}\s+/]+$/u;

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

const visaPrefCategoryCode = new Map([
  ["NONE", "NONE"],
  ["AM-VTNM (VIETNAMESE AMERASIAN)", "AM-VTNM"],
  ["CR1 (SPOUSE OF U.S. CITIZEN UNDER TWO YEARS OF MARRIAGE)", "CR1"],
  ["CR2 (CHILD OF U.S. CITIZEN UNDER TWO YEARS OF MARRIAGE)", "CR2"],
  ["DV (DIVERSITY VISA)", "DV"],
  ["E1 (ALIEN WITH EXTRAORDINARY ABILITY)", "E1"],
  ["E2 (PROFESSIONAL HOLDING ADVANCED DEGREE)", "E2"],
  ["E3 (SKILLED WORKER)", "E3"],
  ["E4 (SD1 MINISTER OF RELIGION)", "E4"],
  ["E5 (IMMIGRANT INVESTORS)", "E5"],
  ["EW (OTHER WORKER (UNSKILLED WORKERS))", "EW"],
  ["EX (SCHEDULE WORKERS)", "EX"],
  ["F1-F11 (UNMARRIED SON/DAUGHTER OF U.S. CITIZEN)", "F1-F11"],
  ["F1-F12 (CHILD OF F11)", "F1-F12"],
  ["F2A-F21 (SPOUSE OF LAWFUL PERMANENT RESIDENT)", "F2A-F21"],
  ["F2A-F22 (CHILD OF LAWFUL PERMANENT RESIDENT)", "F2A-F22"],
  ["F2A-F23 (DERIVATIVE CHILD OF F21 OR F22)", "F2A-F23"],
  ["F2B-F24 (UNMARRIED SON/DAUGHTER OF LAWFUL PER. ADDRESS)", "F2B-F24"],
  ["F2B-F25 (DERIVATIVE CHILD OF F24)", "F2B-F25"],
  ["F3-F31 (MARRIED SON/DAUGHTER OF U.S. CITIZEN)", "F3-F31"],
  ["F3-F32 (DERIVATIVE SPOUSE OF F31)", "F3-F32"],
  ["F3-F33 (DERIVATIVE CHILD OF F31)", "F3-F33"],
  ["F4-F41 (BROTHER/SISTER OF U.S. CITIZEN)", "F4-F41"],
  ["F4-F42 (DERIVATIVE SPOUSE OF F41)", "F4-F42"],
  ["F4-F43 (DERIVATIVE CHILD OF F41)", "F4-F43"],
  ["FX-F21 (SPOUSE OF LAWFUL PERMANENT RESIDENT)", "FX-F21"],
  ["FX-F22 (CHILD OF LAWFUL PERMANENT RESIDENT)", "FX-F22"],
  ["FX-F23 (DERIVATIVE CHILD OF F-21 OR F22)", "FX-F23"],
  ["FP1 (PAROLEE)", "FP1"],
  ["IB1 (SELF PETITIONING SPOUSE OF A U.S. CITIZEN)", "IB1"],
  ["IH3 (ADOPTION CASE)", "IH3"],
  ["IH4 (ADOPTION CASE APPROVE AFTER APR. 2008)", "IH4"],
  ["IH4 (ADOPTION CASE APPROVED AFTER APR. 2008)", "IH4"],
  ["IR1 (SPOUSE OF A U.S. CITIZEN)", "IR1"],
  ["IR2 (CHILDREN OF A U.S. CITIZEN PARENTS UNDER 21 YRS. OLD)", "IR2"],
  ["IR3 (ORPHAN ADOPTED ABROAD BY U.S. CITIZEN)", "IR3"],
  ["IR4 (ORPHAN TO BE ADOPTED ABROAD BY U.S. CITIZEN)", "IR4"],
  ["IR5 (PARENT OF U.S. CITIZEN (18 YEARS OLD ABOVE))", "IR5"],
  ["IW1 (SPOUSE OF A DECEASED U.S.CITIZEN)", "IW1"],
  ["IW2 (DERIVATIVE CHILD OF IW1)", "IW2"],
  ["K1 (FIANCEE)", "K1"],
  ["K2 (DERIVATIVE CHILD OF K1)", "K2"],
  ["K3 (K3 VISA)", "K3"],
  ["K4 (K4 VISA)", "K4"],
  ["SB1 (RETURNING RESIDENT)", "SB1"],
  ["SD (CERTAIN RELIGIOUS WORKER)", "SD"],
  ["SE (SPECIAL IMMIGRANT)", "SE"],
  ["SM1 (SPECIAL IMMIGRANT OR ARMED FORCES GROUP)", "SM1"],
  ["SR (CERTAIN RELIGIOUS WORKER)", "SR"],
  ["SQ (CERTAIN IRAQIS OR AFGHANS EMPLOYED BY THE U.S. GOVERNMENT)", "SQ"],
  ["VISA-93 (REFUGEE FOLLOW-TO-JOIN)", "VISA-93"],
  ["YY (ASYLEE)", "YY"],
]);

/**
 * For Fetching user data
 */
onMounted(async () => {
  showInformation();
});

// let showApplication = ref([]);
// let US_Information = ref(null);

const showInformation = async () => {
  let res = await axios.get("us-show/" + regId);

  let showApplication = res.data.result;

  for (var i = 0; i < showApplication.length; i++) {
    registrationID.value = showApplication[i].ID || "";
    date_of_birth.value = showApplication[i].DOB || "";
    validate_date_of_birth.value = showApplication[i].DOB || "";
    // date_boolean = showApplication[i].DOB || "";
    cv_category.value = showApplication[i].covid_vaccine_priority || "";
    cv_received.value = showApplication[i].received_vaccine == "y" ? "yes" : "no" || "";
    cv_brand_name.value = showApplication[i].vaccine_brand || "";
    firstDose.value = showApplication[i].first_dose || "";
    secondDose.value = showApplication[i].second_dose || "";
    cv_booster1.value = showApplication[i].booster1_brand || "";
    first_dose_booster.value = showApplication[i].booster1 || "";
    cv_booster2.value = showApplication[i].booster2_brand || "";
    second_dose_booster.value = showApplication[i].booster2 || "";
    ci_nvc_number.value = showApplication[i].CaseNo || "";
    ci_nvc_confirm.value = showApplication[i].CaseNo || "";
    ci_visa_pref_category.value = visaPrefCategory.get(showApplication[i].PrefCat) || "";
    ci_intervue_date.value = showApplication[i].InterviewDate || "";
    ci_interview_source.value = showApplication[i].InterviewSource || "";
    ad_last_name.value = showApplication[i].LastName || "";
    ad_first_name.value = showApplication[i].FirstName || "";
    ad_middle_name.value = showApplication[i].MiddleName || "";
    ad_gender.value = showApplication[i].Gender || "";
    ad_civil_status.value = showApplication[i].CivStatus || "";
    ad_nationality.value = showApplication[i].country_nationality || "";
    ad_birthplace.value = showApplication[i].BirthCity || "";
    ad_birth_country.value = showApplication[i].BirthCountry || "";
    ad_mother_name.value = showApplication[i].maiden_name || "";
    ad_address.value = showApplication[i].HomeAddStreet || "";
    ad_city.value = showApplication[i].HomeAddCity || "";
    ad_province.value = showApplication[i].HomeAddProvince || "";
    ad_zip_code.value = showApplication[i].HomeAddZip || "";
    ad_overseas_country.value = showApplication[i].ForeignAddCountry || "";
    ad_overseas_street_address.value = showApplication[i].ForeignAddStreet || "";
    ad_overseas_city.value = showApplication[i].ForeignAddCity || "";
    ad_overseas_province.value = showApplication[i].ForeignAddState || "";
    ad_overseas_zipcode.value = showApplication[i].ForeignAddZip || "";
    ad_contact_numbers.value = showApplication[i].HomeTelNo || "";
    ad_present_residence.value = showApplication[i].PresCountry || "";
    ad_prior_residence.value = showApplication[i].PriorCountry || "";
    ad_passport_number.value = showApplication[i].PassportNo || "";
    ad_passport_issued_by.value = showApplication[i].IssueCountry || "";
    add_passport_date.value = showApplication[i].IssueDate || "";
    add_passport_expiration_date.value = showApplication[i].ValidDate || "";
    ad_has_been_issued_visa.value = showApplication[i].US_NIV || "";
    add_issuance_date.value = showApplication[i].NIV_IssueDate || "";
    add_expiration_date.value = showApplication[i].NIV_ExpireDate || "";
    ad_prev_medical_exam_month.value = moment(new Date(showApplication[i].PrevMed_Date)).format('MMMM') || "";
    ad_prev_medical_exam_year.value = moment(new Date(showApplication[i].PrevMed_Date)).format('YYYY') || "";
    ad_prev_xray_month.value = moment(new Date(showApplication[i].Prev_CXRDate)).format('MMMM') || "";
    ad_prev_xray_year.value = moment(new Date(showApplication[i].Prev_CXRDate)).format('YYYY') || "";
    petitioner_fullname.value = showApplication[i].Peti_Name || "";
    petitioner_is_alive.value = showApplication[i].Peti_Stat == 'y' ? 'yes' : 'no' || "";
    petitioner_relationship.value = showApplication[i].Peti_Relation || "";
    petitioner_us_street_addr.value = showApplication[i].Peti_Street || "";
    petitioner_us_city_addr.value = showApplication[i].Peti_City || "";
    petitioner_us_state_addr.value = showApplication[i].Peti_State || "";
    petitioner_us_postal_code.value = showApplication[i].Peti_Zip || "";
    petitioner_contact_no.value = showApplication[i].Peti_Number || "";
    petitioner_email_addr.value = showApplication[i].Peti_Email || "";
    intended_port_of_entry.value = showApplication[i].PortEntry || "";
    printHash.value = showApplication[i].printhash;
    PayCode.value = showApplication[i].PayCode;
    receiveDate.value = showApplication[i].RcvDate;

    

    cv_category.value ? (covidHidden = false) : (covidHidden = true);
    cv_received.value === "yes" ? (is_cv_received = false) : (is_cv_received = true);
    cv_received.value === "yes" ? (isVaccinated = false) : (isVaccinated = true);
    cv_received.value === "yes"
      ? (callout_message =
          "Applicants who received COVID-19 vaccines, single-dose of Janssen / J&J or 2 doses of Pfizer-Biotech/ Moderna/ Astra Zeneca/ Sinopharm/ Sinovac) COVID -19 vaccines, should present proof of vaccination (i.e. vaccine record or certificate).")
      : (callout_message =
          "Please be advised that completed COVID-19 vaccination is a mandatory requirement for submission of medical examination report to the US Embassy.");
    firstDose.value !== "" ? (noVaccine = false) : (noVaccine = true);
    // secondDose.value !== "" ? (vaccineHasTwo = false) : (vaccineHasTwo = true);
    secondDose.value == "Invalid date" ? (vaccineHasOne = true) : (vaccineHasOne = false);
    cv_booster1.value !== "" ? (hideBooster1 = false) : (hideBooster1 = true);
    cv_booster2.value !== "" ? (hideBooster2 = false) : (hideBooster2 = true);
    ad_has_been_issued_visa.value == 'y' ? (showVisaDate = false) : (showVisaDate = true);
  }

  
};

const alertChange = () => {
  let birthDate = new Date(date_of_birth.value);
  validate_date_of_birth.value = new Date(date_of_birth.value);
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  var month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age <= 4) {
    covidHidden = true;
    cv_received.value = ""
    cv_received_boolean = true;
    is_cv_received = true
    cv_brand_name.value = ""
    cv_brand_name_boolean = true
    cv_brand_name_boolean_1 = true
    noVaccine = true
    vaccineHasOne = true
    firstDose.value = ""
    secondDose.value = ""
    validate_first_dose.value = ""
    validate_second_dose.value = ""
    hideBooster1 = true
    hideBooster2 = true
    cv_brand_name_boolean = true
    cv_brand_name_boolean_1 = true
  } else if (age > 4) {
    covidHidden = false;
    cv_received_boolean = false;
  } else {
    covidHidden = true;
  }
  date_boolean = covidHidden;

};

const handleVaccine = () => {
  isVaccinated = false;
  if (cv_received.value === "yes") {
    is_cv_received = false;
    callout_message =
      "Applicants who received COVID-19 vaccines, single-dose of Janssen / J&J or 2 doses of Pfizer-Biotech/ Moderna/ Astra Zeneca/ Sinopharm/ Sinovac) COVID -19 vaccines, should present proof of vaccination (i.e. vaccine record or certificate).";
  } else {
    is_cv_received = true;
    callout_message =
      "Please be advised that completed COVID-19 vaccination is a mandatory requirement for submission of medical examination report to the US Embassy.";
  }
};

const changeVaccine = () => {
  switch (cv_brand_name.value) {
    case "":
        noVaccine = true
        vaccineHasOne = true
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
        hideBooster1 = true
        hideBooster2 = true
        cv_brand_name_boolean = true
        cv_brand_name_boolean_1 = true
        cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "Janssen / J&J":
        noVaccine = false
        vaccineHasOne = true;
        hideBooster1 = true;
        hideBooster2 = true;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = true
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
        cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "Pfizer":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
        cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "Moderna":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
         cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "Astra Zeneca":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
         cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "Sinovac":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
        cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "Sinopharm":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
        cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "Gamaleya / Sputnik V":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
         cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "NOVAVAX":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
         cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;

    case "BHARAT BIOTECH":
        noVaccine = false
        vaccineHasOne = false;
        cv_brand_name_boolean = false
        cv_brand_name_boolean_1 = false
        firstDose.value = ""
        secondDose.value = ""
        validate_first_dose.value = ""
        validate_second_dose.value = ""
         cv_booster1.value = ""
        first_dose_booster.value = ""
        cv_booster2.value = ""
        second_dose_booster.value = ""

      break;
    
    default:
      noVaccine = false
      vaccineHasOne = false;
      cv_brand_name_boolean = true
      cv_brand_name_boolean_1 = true
      
  }
};

const changeBooster1 = () => {

switch (cv_booster1.value) {
  case "":
      first_dose_booster.value = ""
      cv_booster2.value = ""
      second_dose_booster.value = ""
      hideBooster2 = true

    break;

  case "Janssen / J&J":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;

  case "Pfizer":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;

  case "Moderna":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;

  case "Astra Zeneca":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;

  case "Sinovac":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;

  case "Sinopharm":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true
  
    break;

  case "Gamaleya / Sputnik V":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;

  case "NOVAVAX":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;

  case "BHARAT BIOTECH":
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true

    break;
  
  default:
    first_dose_booster.value = ""
    cv_booster2.value = ""
    second_dose_booster.value = ""
    hideBooster2 = true
    
}
}

const changeBooster2 = () => {
switch (cv_booster2.value) {
  case "":
      second_dose_booster.value = ""
    break;

  case "Janssen / J&J":
    second_dose_booster.value = ""

    break;

  case "Pfizer":
    second_dose_booster.value = ""

    break;

  case "Moderna":
    second_dose_booster.value = ""

    break;

  case "Astra Zeneca":
    second_dose_booster.value = ""

    break;

  case "Sinovac":
    second_dose_booster.value = ""

    break;

  case "Sinopharm":
    second_dose_booster.value = ""
  
    break;

  case "Gamaleya / Sputnik V":
    second_dose_booster.value = ""

    break;

  case "NOVAVAX":
    second_dose_booster.value = ""

    break;

  case "BHARAT BIOTECH":
    second_dose_booster.value = ""

    break;
  
  default:
    second_dose_booster.value = ""
    
}
}

const showBooster1 = () => {
  if (cv_brand_name.value == "Janssen / J&J" && firstDose.value == null) {
    hideBooster1 = true;
  } else if (cv_brand_name.value == "Janssen / J&J" && firstDose.value != null) {
    hideBooster1 = false;
  } else if (
    (cv_brand_name.value != "Janssen / J&J" && firstDose.value == null) ||
    secondDose.value == null
  ) {
    hideBooster1 = true;
  } else {
    hideBooster1 = false;
  }
};

const showBooster2 = () => {
  if (cv_booster1.value == null || first_dose_booster.value == null) {
    hideBooster2 = true;
  } else {
    hideBooster2 = false;
  }
};

const hasVisa = () => {
  if (ad_has_been_issued_visa.value == "y") {
    showVisaDate = false;
    ad_has_been_issued_visa.value = 1;
  } else {
    showVisaDate = true;
    ad_has_been_issued_visa.value = 0;
  }
};

// required('Please choose vaccine brand name')

// const schema = yup.object().shape({
//   validate_date_of_birth: yup.string().required("Date of birth is required!"),
//   date_boolean: yup.string(),
//   // cv_received: yup.string().when('date_boolean', {
//   //   is: 'false',
//   //   then: (schema) => schema.required("This field is required, please choose an option!"),
//   //   otherwise: (schema) => schema.nullable()
//   // }),
//   cvReceivedBoolean: yup.string(),
//   // cv_brand_name: yup.string().when('cvReceivedBoolean', {
//   //   is: 'false',
//   //   then: (schema) => schema.required("Please choose vaccine brand name"),
//   //   otherwise: (schema) => schema.nullable()
//   // }),
//   cv_brand_name_boolean: yup.string(),
//   // cv_date_01: yup.string().when('cv_brand_name_boolean', {
//   //   is: 'false',
//   //   then: (schema) => schema.required("Please choose date received"),
//   //   otherwise: (schema) => schema.nullable()
//   // }),
//   cv_brand_name_boolean_1: yup.string(),
//   // cv_date_02: yup.string().when('cv_brand_name_boolean_1', {
//   //   is: 'false',
//   //   then: (schema) => schema.required("Please choose date received"),
//   //   otherwise: (schema) => schema.nullable()
//   // }),
//   cv_booster1: yup.string().nullable(),
//   cv_booster2: yup.string().nullable(),
//   ci_nvc_number: yup
//     .string()
//     .required("NVC Case Number is required!")
//     .min(13, "NVC Case Number must be exactly 13 characters")
//     .max(13, "NVC Case Number must be exactly 13 characters")
//     .matches(
//       caseNumberRegex,
//       "Please avoid using spaces and special characters ex: !@#$%^"
//     ),
//   ci_nvc_confirm: yup
//     .string()
//     .required("NVC Case Number is required!")
//     .min(13, "NVC Case Number must be exactly 13 characters")
//     .max(13, "NVC Case Number must be exactly 13 characters")
//     .matches(
//       caseNumberRegex,
//       "Please avoid using spaces and special characters ex: !@#$%^"
//     )
//     .oneOf([yup.ref("ci_nvc_number")], "NVC Case Number do not match"),
//   // ci_interview_date: yup.string().nullable().min(new Date(1925, 0, 1), "Interview date must be atleast January 01, 1923"),
//   ci_visa_pref_category: yup.string().required("Interview date is required!"),
//   ci_interview_source: yup.string().nullable(),
//   ad_last_name: yup
//     .string()
//     .required("Last name is required!")
//     .min(2, "Last name must be atleast 2 characters")
//     .max(25, "Last name must be at most 25 characters")
//     .matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
//   ad_first_name: yup
//     .string()
//     .required("First name is required!")
//     .min(2, "First name must be atleast 2 characters")
//     .max(25, "First name must be at most 25 characters")
//     .matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
//   ad_middle_name: yup.string().nullable().optional(),
//   ad_gender: yup.string().required("Gender is required!"),
//   ad_civil_status: yup.string().required("Civil status is required!"),
//   ad_nationality: yup.string().required("Nationality is required!"),
//   ad_birthplace: yup
//     .string()
//     .required("Birthplace is required!")
//     .min(2, "Birthplace must be atleast 4 characters")
//     .max(25, "Birthplace must be at most 25 characters"),
//   ad_birth_country: yup
//     .string()
//     .required("Birth country is required!")
//     .min(4, "Birth country must be atleast 4 characters")
//     .max(25, "Birth country must be at most 25 characters")
//     .matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
//   ad_mother_name: yup
//     .string()
//     .required("Last name is required!")
//     .min(4, "Last name must be atleast 2 characters")
//     .max(50, "Last name must be at most 25 characters")
//     .matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
//   ad_address: yup
//     .string()
//     .nullable()
//     .optional()
//     .min(5, "Address must be atleast 5 characters"),
//   ad_city: yup.string().nullable().optional().min(5, "City must be atleast 5 characters"),
//   ad_province: yup.string().nullable().optional(),
//   ad_zip_code: yup
//     .string()
//     .nullable()
//     .optional()
//     .min(4, "Zip code must be exactly 4 numbers")
//     .max(4, "Zip code must be exactly 4 numbers")
//     .matches(numOnlyRegex, "Zip Code must be number only!"),
//   ad_overseas_country: yup.string().nullable().optional(),
//   ad_overseas_street_address: yup
//     .string()
//     .nullable()
//     .optional()
//     .min(5, "Street address must be atleast 5 characters"),
//   ad_overseas_city: yup
//     .string()
//     .nullable()
//     .optional()
//     .min(5, "City must be atleast 5 characters"),
//   ad_overseas_province: yup
//     .string()
//     .nullable()
//     .optional()
//     .min(5, "Province must be atleast 5 characters"),
//   ad_overseas_zipcode: yup
//     .string()
//     .nullable()
//     .optional()
//     .min(5, "Zip code must be exactly 5 characters")
//     .max(5, "Zip code must be exactly 5 numbers")
//     .matches(numOnlyRegex, "Zip Code must be number only!"),
//   ad_contact_numbers: yup
//     .string()
//     .required("Contact number is required!")
//     .min(7, "Contact number must be atleast 7 characters")
//     .max(39, "Contact number at most 39 characters")
//     .matches(
//       contactNumberRegex,
//       "Please avoid using letters and special characters ex: abc!@#$%^"
//     ),
//   ad_present_residence: yup.string().required("Present residence is required!"),
//   ad_prior_residence: yup.string().required("Prior residence is required!"),
//   ad_passport_number: yup
//     .string()
//     .required("Passport number is required!")
//     .min(9, "Passport number must be at least 9 characters")
//     .max(10, "Passport number must be at most 10 characters"),
//   ad_passport_issued_by: yup.string().required("Passport issued by is required!"),
//   validate_add_passport_date: yup.string().required("Passport issue date is required!"),
//   validate_passport_expiration_date: yup.string().required("Passport expiration date is required!"),
//   // ad_passport_date: yup.date().required('Passport date is required!').min(new Date(1925, 0, 1), "Passport must be atleast January 01, 1923").max(new Date(), "Invalid date"),
//   // ad_passport_expiration_date: yup.date().required('Passport expiration date is required!').min(yup.ref('ad_passport_date'), 'Expiration date must not be less than the issuance date').notOneOf([yup.ref('ad_passport_date')], 'Expiration date must not be equal to the issuance date'),
//   ad_has_been_issued_visa: yup
//     .string()
//     .required("This field is required, please choose an option"),
//   ad_has_been_issued_visa_boolean:yup.string(),
//   validate_issuance_date: yup.string().when('ad_has_been_issued_visa_boolean', {
//     is: 'false',
//     then: (schema) => schema.required("Issuance date required!"),
//     otherwise: (schema) => schema.nullable()
//   }),
//   validate_issuance_expiration_date: yup.string().when('ad_has_been_issued_visa_boolean', {
//     is: 'false',
//     then: (schema) => schema.required("Issuance expiration date required!"),
//     otherwise: (schema) => schema.nullable()
//   }),
//   // ad_issuance_date: yup.date().required("Issuance date is required").min(new Date(1925, 0, 1), "Passport must be atleast January 01, 1923").max(new Date(), "Invalid date"),
//   // ad_expiration_date: yup.date().required("Expiration date is required").min(yup.ref('ad_issuance_date'), 'Expiration date must not be less than the issuance date').notOneOf([yup.ref('ad_issuance_date')], 'Expiration date must not be equal to the issuance date'),
//   ad_prev_medical_exam_month: yup.string().nullable().optional(),
//   ad_prev_medical_exam_year: yup.string().nullable().optional(),
//   ad_prev_xray_month: yup.string().nullable().optional(),
//   ad_prev_xray_year: yup.string().nullable().optional(),
//   petitioner_fullname: yup
//     .string()
//     .required("Petitioner name is required")
//     .min(6, "Petitioner name must be atleast 6 characters")
//     .max(50, "Petitioner name must be at most 50 characters")
//     .matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
//   petitioner_is_alive: yup
//     .string()
//     .required("This field is required, please choose an option"),
//   petitioner_relationship: yup.string().required("Petitioner relationship is required!"),
//   petitioner_us_street_addr: yup
//     .string()
//     .required("Street address is required!")
//     .min(5, "Street Address must be atleast 5 characters")
//     .max(100, "Street Address must be most 100 characters"),
//   petitioner_us_city_addr: yup
//     .string()
//     .required("City is required!")
//     .min(5, "City must be atleast 5 characters")
//     .max(25, "City must be most 25 characters")
//     .matches(nameRegex, "Please avoid using numbers and special characters ex: !@#$%^"),
//   petitioner_us_state_addr: yup.string().required("State is required!"),
//   petitioner_us_postal_code: yup
//     .string()
//     .required("Postal code is required!")
//     .min(5, "Postal code must be exactly 5 numbers")
//     .max(5, "Postal code must be exactly 5 numbers")
//     .matches(numOnlyRegex, "Postal Code must be number only!"),
//   petitioner_contact_no: yup
//     .string()
//     .required("Petitioner contact no. is required!")
//     .min(11, "Contact number must be atleast 11 characters")
//     .max(11, "Contact number must be at most 11 characters")
//     .matches(
//       contactNumberRegex,
//       "Please avoid using letters and special characters ex: abc!@#$%^"
//     ),
//   petitioner_email_addr: yup
//     .string()
//     .required("Petitioner email address is required!")
//     .min(10, "Email must be atleast 10 characters")
//     .max(30, "Email must be at most 30 characters")
//     .email("Enter a valid email"),
//   intended_port_of_entry: yup.string().required("Port of entry is required!"),
// });

/**
 * Submit US individual form
 *
 */

const modifyDetails = async (regInformation) => {
  let res = await axios.post("us-update", regInformation)

  if (res.data.status_code == 200) {
    let motherName = res.data.message

    Swal.fire("Successfully updated ", "Please check your email "+ motherName, "success");

    router.push('/application/show/' + country + '/' + regId + '/' +  paycode );
  } else {
    Swal.fire("Update Failed", "Check your internet connection", "error");
  }
}

const updateDetails = async (values) => {
 
  errors.value = [];

  let birthDate = moment(new Date(date_of_birth.value)).format("YYYY-MM-DD");
  let first_dose = moment(new Date(firstDose.value)).format("YYYY-MM-DD");
  let second_dose = moment(new Date(secondDose.value)).format("YYYY-MM-DD");
  let first_doseBooster = moment(new Date(first_dose_booster.value)).format("YYYY-MM-DD");
  let second_doseBooster = moment(new Date(second_dose_booster.value)).format(
    "YYYY-MM-DD"
  );
  let ci_interview_date = moment(new Date(ci_intervue_date.value)).format("YYYY-MM-DD");
  let ad_passport_date = moment(new Date(add_passport_date.value)).format("YYYY-MM-DD");
  let ad_passport_expiration_date = moment(
    new Date(add_passport_expiration_date.value)
  ).format("YYYY-MM-DD");
  let ad_issuance_date = moment(new Date(add_issuance_date.value)).format("YYYY-MM-DD");
  let ad_expiration_date = moment(new Date(add_expiration_date.value)).format(
    "YYYY-MM-DD"
  );

  try {
    Swal.fire({
      title: "Are you sure you want to update?",
      text: "Confirm your action",
      showCancelButton: true,
      confirmButtonText: "Yes",
      icon: "question",
    }).then((result) => {
      
      if (result.isConfirmed) {
        const requestPAYLOAD = {
                json_registrationID: regId,
                json_user_id: user_id,
                json_email: email,
                json_date_of_birth: birthDate,
                json_validate_date_of_birth: birthDate,
                json_cv_category: values.cv_category,
                json_cv_received: values.cv_received,
                json_is_cv_received: is_cv_received,
                json_cv_brand_name: values.cv_brand_name,
                json_firstDose: first_dose,
                json_secondDose: second_dose,
                json_cv_booster1: values.cv_booster1,
                json_first_doseBooster: first_doseBooster,
                json_cv_booster2: values.cv_booster2,
                json_second_doseBooster: second_doseBooster,
                json_ci_nvc_number: values.ci_nvc_number,
                json_ci_nvc_confirm: values.ci_nvc_confirm,
                json_ci_visa_pref_category: visaPrefCategoryCode.get(values.ci_visa_pref_category),
                json_ci_interview_date: ci_interview_date,
                json_ci_interview_source: values.ci_interview_source,
                json_ad_last_name: values.ad_last_name,
                json_ad_first_name: values.ad_first_name,
                json_ad_middle_name: values.ad_middle_name,
                json_ad_gender: values.ad_gender,
                json_ad_civil_status: values.ad_civil_status,
                json_ad_nationality: values.ad_nationality,
                json_ad_birthplace: values.ad_birthplace,
                json_ad_birth_country: values.ad_birth_country,
                json_ad_mother_name: values.ad_mother_name,
                json_ad_address: values.ad_address,
                json_ad_city: values.ad_city,
                json_ad_province: values.ad_province,
                json_ad_zip_code: values.ad_zip_code,
                json_ad_overseas_country: values.ad_overseas_country,
                json_ad_overseas_street_address: values.ad_overseas_street_address,
                json_ad_overseas_city: values.ad_overseas_city,
                json_ad_overseas_province: values.ad_overseas_province,
                json_ad_overseas_zipcode: values.ad_overseas_zipcode,
                json_ad_contact_numbers: values.ad_contact_numbers,
                json_ad_email_add: email,
                json_ad_present_residence: values.ad_present_residence,
                json_ad_prior_residence: values.ad_prior_residence,
                json_ad_passport_number: values.ad_passport_number,
                json_ad_passport_issued_by: values.ad_passport_issued_by,
                json_ad_passport_date: ad_passport_date,
                json_ad_passport_expiration_date: ad_passport_expiration_date,
                json_ad_has_been_issued_visa: values.ad_has_been_issued_visa,
                json_ad_issuance_date: ad_issuance_date,
                json_ad_expiration_date: ad_expiration_date,
                json_ad_prev_medical_exam_month: values.ad_prev_medical_exam_month,
                json_ad_prev_medical_exam_year: values.ad_prev_medical_exam_year,
                json_ad_prev_xray_month: values.ad_prev_xray_month,
                json_ad_prev_xray_year: values.ad_prev_xray_year,
                json_petitioner_fullname: values.petitioner_fullname,
                json_petitioner_is_alive: values.petitioner_is_alive,
                json_petitioner_relationship: values.petitioner_relationship,
                json_petitioner_us_street_addr: values.petitioner_us_street_addr,
                json_petitioner_us_city_addr: values.petitioner_us_city_addr,
                json_petitioner_us_state_addr: values.petitioner_us_state_addr,
                json_petitioner_us_postal_code: values.petitioner_us_postal_code,
                json_petitioner_contact_no: values.petitioner_contact_no,
                json_petitioner_email_addr: values.petitioner_email_addr,
                json_intended_port_of_entry: values.intended_port_of_entry,
                json_printHash: printHash.value,
                json_PayCode: PayCode.value,
                json_receiveDate: receiveDate.value
        };
       
        modifyDetails(requestPAYLOAD);
      } else if (result.isDenied) {
        Swal.fire("Update failed", "Check your internet connection", "error");
      }
    });
   
  } catch (err) {
    errors.value = err.response.data.errors;
  }
};

// Get the current year
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

let currentDate = currentYear + ", " + currentMonth + ", " + currentDay;

// =========== Inline Date ==================== //
const disableBirthdayState = {
  // months start's to 0(January) - 11(December)
  disabledDates: {
    to: new Date(years[99], currentMonth, currentDay),
    from: new Date(currentDate),
  },
};

const disableFutureDateState = {
  // months start's to 0(January) - 11(December)
  disabledDates: {
    to: new Date(years[99], currentMonth, currentDay),
    from: new Date(currentYear, new Date().getMonth(), currentDay + 1),
  },
};
const disablePastDateState = {
  // months start's to 0(January) - 11(December)
  disabledDates: {
    to: new Date(currentYear, new Date().getMonth(), currentDay),
    from: new Date(currentYear + 99, new Date().getMonth(), currentDay + 1),
  },
};
// ============ Inline End =================== //


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
  <div v-if="date_of_birth" class="wrapper_container row bg-white border">
    <div class="col-12 mb-3">
      <h1 class="text-secondary text-center fs-1 fw-bold">United States of America</h1>
    </div>
    <!-- ============================================================== -->
    <!-- Main Container -->
    <!-- ============================================================== -->
    <!-- :validation-schema="schema" -->
    <Form
      :key="index"
      @submit="updateDetails"
      class="col-12 mb-3"
    >
      <div class="col-12 mb-3">
        <div class="card-body row">
          <div class="col-12">
            <span class="text-danger">Fields with asterisks(*) are required</span>
          </div>
          <div class="mb-3 col-12">
            <FormHeader headerText="Case Information" />
          </div>

          <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
            <RequiredInputField
              label="NVC Case Number"
              type="text"
              FieldName="ci_nvc_number"
              ErrorName="ci_nvc_number"
              smallLabel="3-character Consulate Code+10-digit case number (ex. MNL##########)"
              v-model:input="ci_nvc_number"
            />
          </div>
          <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
            <RequiredInputField
              label="Confirm NVC Case Number"
              type="text"
              FieldName="ci_nvc_confirm"
              ErrorName="ci_nvc_confirm"
              smallLabel="Please re-enter your NVC Case Number"
              v-model:input="ci_nvc_confirm"
            />
          </div>
          <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Visa Preference Category"
              FieldName="ci_visa_pref_category"
              ErrorName="ci_visa_pref_category"
              v-model:input="ci_visa_pref_category"
              :items="visaCategories"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <DateField
              label="Interview Date"
              requiredClass="d-none"
              placeholder="Interview Date"
              color="gray"
              v-model:input="ci_intervue_date"
              smallLabel="If none, leave blank'"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <SelectField
              label="Interview Source"
              FieldName="ci_interview_source"
              ErrorName="ci_interview_source"
              v-model:input="ci_interview_source"
              :items="interviewSources"
            />
          </div>
          <div class="mb-3 mt-3 col-12">
            <FormHeader headerText="Applicant Details" />
            <SubFormHeader headerText="Basic Information (as indicated in passport)" />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <RequiredInputField
              label="Last Name"
              placeholder="Last Name"
              type="text"
              FieldName="ad_last_name"
              ErrorName="ad_last_name"
              v-model:input="ad_last_name"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <RequiredInputField
              label="First Name"
              placeholder="First Name"
              type="text"
              FieldName="ad_first_name"
              ErrorName="ad_first_name"
              v-model:input="ad_first_name"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <InputField
              label="Middle Name"
              placeholder="Middle Name"
              type="text"
              FieldName="ad_middle_name"
              ErrorName="ad_middle_name"
              v-model:input="ad_middle_name"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <DateField
              idName="DOB"
              label="Date of Birth"
              placeholder="Date of birth"
              color="red"
              :disabledDate="disableBirthdayState.disabledDates"
              v-model:input="date_of_birth"
              :onChange="alertChange"
              :error="
                errors.json_date_of_birth
                  ? errors.json_date_of_birth[0]
                  : inputName == 'json_date_of_birth'
                  ? inputError
                  : ''
              "
            />
            <Field
              type="text"
              name="validate_date_of_birth"
              width="100px"
              v-model="validate_date_of_birth"
            />
            <ErrorMessage name="validate_date_of_birth" class="text-danger pt-3 pl-3" />
            <Field
              type="text"
              name="date_boolean"
              v-model="date_boolean"
              width="100px"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Gender"
              FieldName="ad_gender"
              ErrorName="ad_gender"
              v-model:input="ad_gender"
              :items="genderOption"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Civil Status"
              FieldName="ad_civil_status"
              ErrorName="ad_civil_status"
              v-model:input="ad_civil_status"
              :items="civilStatus"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Country or Nationality"
              FieldName="ad_nationality"
              ErrorName="ad_nationality"
              v-model:input="ad_nationality"
              :items="countries"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="Birthplace"
              placeholder="Birth City"
              smallLabel="Birth City"
              type="text"
              FieldName="ad_birthplace"
              ErrorName="ad_birthplace"
              v-model:input="ad_birthplace"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Country"
              smallLabel="Birth Country"
              FieldName="ad_birth_country"
              ErrorName="ad_birth_country"
              v-model:input="ad_birth_country"
              :items="countries"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="Mother's maiden name"
              placeholder="Last Name, First Name Middle Name"
              type="text"
              FieldName="ad_mother_name"
              ErrorName="ad_mother_name"
              smallLabel="Last Name, First Name Middle Name"
              v-model:input="ad_mother_name"
            />
          </div>
          <div class="mb-3 mt-5 col-12">
            <SubFormHeader headerText="Contact Information" />
          </div>
          <div class="mb-3 mt-3 col-12">
            <h5 class="text-uppercase">
              FOR APPLICANTS CURRENTLY LIVING IN THE PHILIPPINES:
            </h5>
          </div>
          <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
            <InputField
              label="PHILIPPINES ADDRESS"
              placeholder="Building Name and Street Address"
              type="text"
              FieldName="ad_address"
              ErrorName="ad_address"
              v-model:input="ad_address"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <InputField
              placeholder="City/Town"
              type="text"
              FieldName="ad_city"
              ErrorName="ad_city"
              v-model:input="ad_city"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <SelectField
              label="Province"
              FieldName="ad_province"
              ErrorName="ad_province"
              v-model:input="ad_province"
              :items="philppineProvince"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <InputField
              placeholder="Zip Code"
              type="text"
              FieldName="ad_zip_code"
              ErrorName="ad_zip_code"
              v-model:input="ad_zip_code"
            />
          </div>
          <div class="mb-3 mt-5 col-12">
            <h5 class="text-uppercase">
              FOR APPLICANTS CURRENTLY LIVING OUTSIDE THE PHILIPPINES:
            </h5>
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <SelectField
              label="Overseas Address"
              FieldName="ad_overseas_country"
              ErrorName="ad_overseas_country"
              v-model:input="ad_overseas_country"
              :items="countries"
            />
          </div>
          <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
            <InputField
              placeholder="Street Address"
              type="text"
              FieldName="ad_overseas_street_address"
              ErrorName="ad_overseas_street_address"
              v-model:input="ad_overseas_street_address"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <InputField
              placeholder="City/Town"
              type="text"
              FieldName="ad_overseas_city"
              ErrorName="ad_overseas_city"
              v-model:input="ad_overseas_city"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <InputField
              placeholder="Province/State"
              type="text"
              FieldName="ad_overseas_province"
              ErrorName="ad_overseas_province"
              v-model:input="ad_overseas_province"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <InputField
              placeholder="Zip Code"
              type="text"
              FieldName="ad_overseas_zipcode"
              ErrorName="ad_overseas_zipcode"
              v-model:input="ad_overseas_zipcode"
            />
          </div>
          <div class="col-12 mt-3 mb-1"><hr /></div>

          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="Contact Number(s), separate with a slash"
              placeholder="Contact Number"
              type="text"
              FieldName="ad_contact_numbers"
              ErrorName="ad_contact_numbers"
              smallLabel="(Area Code)<space>Tel.Number."
              v-model:input="ad_contact_numbers"
            />
          </div>
          <div class="mb-1 col-lg-4 col-md-12 col-sm-12">
            <div class="row mt-3">
              <div class="col-12">
                <label class="text-capitalize"> Email Address </label>
              </div>
              <div class="col-12 input-group">
                <span class="ml-3 fs-2 fw-normal text-secondary">
                  {{ email }}
                </span>
              </div>
            </div>
          </div>

          <div class="col-12 mt-3 mb-1"><hr /></div>

          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Present Country of Residence"
              FieldName="ad_present_residence"
              ErrorName="ad_present_residence"
              v-model:input="ad_present_residence"
              :items="countries"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Prior Country of Residence"
              FieldName="ad_prior_residence"
              ErrorName="ad_prior_residence"
              v-model:input="ad_prior_residence"
              :items="countries"
            />
          </div>
          <div class="mb-3 mt-5 col-12">
            <SubFormHeader headerText="Passport Information" />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="Passport Number"
              placeholder="Passport Number"
              type="text"
              FieldName="ad_passport_number"
              ErrorName="ad_passport_number"
              v-model:input="ad_passport_number"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Issued by (Country) "
              FieldName="ad_passport_issued_by"
              ErrorName="ad_passport_issued_by"
              v-model:input="ad_passport_issued_by"
              :items="countries"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <DateField
              label="Issue Date"
              placeholder="Issue Date"
              color="red"
              :disabledDate="disableFutureDateState.disabledDates"
              v-model:input="add_passport_date"
              :error="
                errors.json_ad_passport_date
                  ? errors.json_ad_passport_date[0]
                  : inputName == 'json_ad_passport_date'
                  ? inputError
                  : ''
              "
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <DateField
              label="Expiration Date"
              placeholder="Expiration Date"
              color="red"
              :disabledDate="disablePastDateState.disabledDates"
              v-model:input="add_passport_expiration_date"
              :error="
                errors.json_ad_passport_expiration_date
                  ? errors.json_ad_passport_expiration_date[0]
                  : inputName == 'json_ad_passport_expiration_date'
                  ? inputError
                  : ''
              "
            />
          </div>
          <div class="mb-3 mt-5 col-12">
            <SubFormHeader headerText="Additional Questions" />
          </div>
          <div class="mb-1 col-12">
            <div class="row">
              <div class="col-12">
                <label class="text-capitalize">
                  Have you been issued a U.S. Tourist Visa? <b class="text-danger">*</b>
                </label>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-12 pl-4">
                <RadioButton
                  RadioLabel="Yes"
                  RadioBtnName="ad_has_been_issued_visa"
                  RadioValue="y"
                  v-model:input="ad_has_been_issued_visa"
                  :onChange="hasVisa"
                />
              </div>
              <div class="col-lg-10 col-md-10 col-sm-12 pl-4">
                <RadioButton
                  RadioLabel="No"
                  RadioBtnName="ad_has_been_issued_visa"
                  RadioValue="n"
                  v-model:input="ad_has_been_issued_visa"
                  :onChange="hasVisa"
                />
              </div>
              <div class="col-lg-10 col-md-10 col-sm-12 pl-4">
                <ErrorMessage name="ad_has_been_issued_visa" class="text-danger" />
              </div>
            </div>
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12" :hidden="showVisaDate">
            <DateField
              label="Issuance Date"
              requiredClass="d-none"
              placeholder="Issuance Date"
              color="gray"
              :disabledDate="disableFutureDateState.disabledDates"
              v-model:input="add_issuance_date"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12" :hidden="showVisaDate">
            <DateField
              label="Expiration Date"
              requiredClass="d-none"
              placeholder="Expiration Date"
              color="gray"
              v-model:input="add_expiration_date"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <SelectField
              label="Previous Medical Examination at SLEC"
              smallLabel="Month"
              FieldName="ad_prev_medical_exam_month"
              ErrorName="ad_prev_medical_exam_month"
              v-model:input="ad_prev_medical_exam_month"
              :items="months"
              @change="handleVaccine"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <SelectField
              smallLabel="Year"
              FieldName="ad_prev_medical_exam_year"
              ErrorName="ad_prev_medical_exam_year"
              v-model:input="ad_prev_medical_exam_year"
              :items="years"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <SelectField
              label="Date of previous Chest X-Ray"
              smallLabel="Month"
              FieldName="ad_prev_xray_month"
              ErrorName="ad_prev_xray_month"
              v-model:input="ad_prev_xray_month"
              :items="months"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <SelectField
              smallLabel="Year"
              FieldName="ad_prev_xray_year"
              ErrorName="ad_prev_xray_year"
              v-model:input="ad_prev_xray_year"
              :items="years"
            />
          </div>
          <div class="mb-3 col-12" :hidden="covidHidden">
            <FormHeader headerText="COVID-19 VACCINE" />
          </div>
          <div class="mb-3 col-12" :hidden="covidHidden">
            <ol>
              <li>Have you received your COVID-19 vaccine?</li>
              <div class="row mt-4">
                <div class="col-lg-2 col-md-2 col-sm-12">
                  <RadioButton
                    RadioLabel="Yes"
                    RadioBtnName="cv_received"
                    RadioValue="yes"
                    v-model:input="cv_received"
                    :onChange="handleVaccine"
                  />
                  <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="cv_received" v-model.lazy="cv_received" value="yes" /><label for="">Yes</label> -->
                </div>
                <div class="col-lg-10 col-md-10 col-sm-12">
                  <RadioButton
                    RadioLabel="No"
                    RadioBtnName="cv_received"
                    RadioValue="no"
                    v-model:input="cv_received"
                    :onChange="handleVaccine"
                  />
                  <!-- <input class="form-check-input mt-2" @change="handleVaccine" type="radio" name="cv_received" v-model.lazy="cv_received" value="no" /><label for="">No</label> -->
                </div>
                <div class="col-lg-10 col-md-10 col-sm-12">
                  <Field
                    type="text"
                    name="cvReceivedBoolean"
                    v-model="cv_received_boolean"
                    width="100px"
                  />
                  <ErrorMessage name="cv_received" class="text-danger" />
                </div>

                <ol type="I" :hidden="is_cv_received">
                  <li class="col-lg-8 pr-5">
                    <RequiredSelectField
                      label="Vaccine Brand Name"
                      FieldName="cv_brand_name"
                      ErrorName="cv_brand_name"
                      v-model:input="cv_brand_name"
                      :items="vaccine"
                      @change="changeVaccine"
                    />
                    <Field
                      type="text"
                      name="cv_brand_name_boolean"
                      width="100px"
                      v-model="cv_brand_name_boolean"
                    />
                    <Field
                      type="text"
                      name="cv_brand_name_boolean_1"
                      width="100px"
                      v-model="cv_brand_name_boolean_1"
                    />
                  </li>
                  <li class="col-lg-8 pr-5" :hidden="noVaccine">
                    <DateField
                      label="Vaccine Dose 1 Date Received"
                      color="red"
                      placeholder="Date Received"
                      :disabledDate="disableBirthdayState.disabledDates"
                      v-model:input="firstDose"
                      :onChange="showBooster1"
                    />
                  </li>
                  <li class="col-lg-8 pr-5" :hidden="vaccineHasOne">
                    <DateField
                      label="Vaccine Dose 2 Date Received"
                      color="red"
                      placeholder="Date Received"
                      :disabledDate="disableBirthdayState.disabledDates"
                      v-model:input="secondDose"
                      :onChange="showBooster1"
                    />
                  </li>
                  <li class="col-lg-8 pr-5" :hidden="hideBooster1">
                    <hr />
                    <SelectField
                      label="Vaccine Booster 1 Brand Name"
                      FieldName="cv_booster1"
                      ErrorName="cv_booster1"
                      v-model:input="cv_booster1"
                      :items="vaccine"
                      :onChange="changeBooster1"
                    />
                  </li>
                  <li class="col-lg-8 pr-5" :hidden="hideBooster1">
                    <DateField
                      label="Vaccine Booster 1 Date Received"
                      requiredClass="d-none"
                      color="gray"
                      placeholder="Date Received"
                      :disabledDate="disableBirthdayState.disabledDates"
                      v-model:input="first_dose_booster"
                      :onChange="showBooster2"
                    />
                  </li>
                  <li class="col-lg-8 pr-5" :hidden="hideBooster2">
                    <hr />
                    <SelectField
                      label="Vaccine Booster 2 Brand Name"
                      FieldName="cv_booster2"
                      ErrorName="cv_booster2"
                      v-model:input="cv_booster2"
                      :items="vaccine"
                      :onChange="changeBooster2"
                    />
                  </li>
                  <li class="col-lg-8 pr-5" :hidden="hideBooster2">
                    <DateField
                      label="Vaccine Booster 2 Date Received"
                      requiredClass="d-none"
                      placeholder="Date Received"
                      color="gray"
                      :disabledDate="disableBirthdayState.disabledDates"
                      v-model:input="second_dose_booster"
                      :onChange="showBooster1"
                    />
                  </li>
                </ol>
                <div class="mb-3 mt-3 col-12" :hidden="isVaccinated">
                  <CalloutDanger headerTitle="Note" :description="callout_message" />
                </div>
              </div>
            </ol>
          </div>

          <div class="mt-3 mb-3 col-12">
            <FormHeader headerText="Petitioner's Information" />
          </div>
          <div class="mb-1 col-12">
            <RequiredInputField
              label="Name of Petitioner"
              placeholder="Enter Full Name"
              type="text"
              FieldName="petitioner_fullname"
              ErrorName="petitioner_fullname"
              v-model:input="petitioner_fullname"
            />
          </div>

          <div class="mb-1 col-12 pt-3 pb-2">
            <div class="row">
              <div class="col-12">
                <label class="text-capitalize">
                  Is the petitioner still alive? <b class="text-danger">*</b>
                </label>
              </div>
              <div class="col-lg-2 col-md-2 col-sm-12 pl-4">
                <RadioButton
                  RadioLabel="Yes"
                  RadioBtnName="petitioner_is_alive"
                  RadioValue="yes"
                  v-model:input="petitioner_is_alive"
                />
              </div>
              <div class="col-lg-10 col-md-10 col-sm-12 pl-4">
                <RadioButton
                  RadioLabel="No"
                  RadioBtnName="petitioner_is_alive"
                  RadioValue="no"
                  v-model:input="petitioner_is_alive"
                />
              </div>
              <div class="col-lg-10 col-md-10 col-sm-12 pl-4">
                <ErrorMessage name="petitioner_is_alive" class="text-danger" />
              </div>
            </div>
          </div>

          <div class="mb-1 col-lg-8 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Relationship"
              FieldName="petitioner_relationship"
              ErrorName="petitioner_relationship"
              v-model:input="petitioner_relationship"
              :items="relationship"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="U.S. Address"
              type="text"
              FieldName="petitioner_us_street_addr"
              ErrorName="petitioner_us_street_addr"
              smallLabel="Street Address"
              v-model:input="petitioner_us_street_addr"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="City"
              FieldName="petitioner_us_city_addr"
              ErrorName="petitioner_us_city_addr"
              type="text"
              smallLabel="City"
              v-model:input="petitioner_us_city_addr"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredSelectField
              label="State"
              FieldName="petitioner_us_state_addr"
              ErrorName="petitioner_us_state_addr"
              v-model:input="petitioner_us_state_addr"
              :items="states"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="Postal Code"
              placeholder="Enter postal code"
              type="text"
              FieldName="petitioner_us_postal_code"
              ErrorName="petitioner_us_postal_code"
              v-model:input="petitioner_us_postal_code"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="Contact Number"
              placeholder="Enter postal code"
              type="text"
              FieldName="petitioner_contact_no"
              ErrorName="petitioner_contact_no"
              v-model:input="petitioner_contact_no"
            />
          </div>
          <div class="mb-1 col-lg-6 col-md-12 col-sm-12">
            <RequiredInputField
              label="Email Address"
              placeholder="Enter postal code"
              type="text"
              FieldName="petitioner_email_addr"
              ErrorName="petitioner_email_addr"
              v-model:input="petitioner_email_addr"
            />
          </div>
          <div class="mb-1 col-lg-10 col-md-12 col-sm-12">
            <RequiredSelectField
              label="Intended Port of Entry"
              FieldName="intended_port_of_entry"
              ErrorName="intended_port_of_entry"
              v-model:input="intended_port_of_entry"
              :items="states"
            />
          </div>
        </div>
      </div>

      <!-- <div class="col-lg-3 col-md-12 col-sm-12"></div> -->
      <div class="col-12 d-flex justify-content-center">
        <SubmitFormButton
          btnType="submit"
          className="btn btn-primary btn-lg w-25"
          btnText="Update"
        />
      </div>
    </Form>
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

.covid_category li {
  list-style: none;
}

.inputDate {
  width: 100%;
}
.irc_div {
  background: #f1f1f1;
}
.cell.day.selected {
  background: green !important;
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
