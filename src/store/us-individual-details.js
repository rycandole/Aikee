// import axios from 'axios'
import { defineStore } from 'pinia'

export const useUSIndividualDetails = defineStore('us-individual-details', {
  state: () => ({
    user_id: null,
    email: null,
    date_of_birth: null,
    cv_category: null,
    cv_received: null,
    is_cv_received: null,
    cv_brand_name: null,
    firstDose: null,
    secondDose: null,
    cv_booster1: null,
    first_doseBooster: null,
    cv_booster2: null,
    second_doseBooster: null,
    ci_nvc_number: null,
    ci_confirm_nvc: null,
    ci_visa_pref_category: null,
    ci_interview_date: null,
    ci_interview_source: null,
    ad_last_name: null,
    ad_first_name: null,
    ad_middle_name: null,
    ad_gender: null,
    ad_civil_status: null,
    ad_nationality: null,
    ad_birthplace: null,
    ad_birth_country: null,
    ad_mother_last_name: null,
    ad_mother_first_name: null,
    ad_mother_middle_name: null,
    ad_address: null,
    ad_city: null,
    ad_province: null,
    ad_zip_code: null,
    ad_overseas_country: null,
    ad_overseas_street_address: null,
    ad_overseas_city: null,
    ad_overseas_province: null,
    ad_overseas_zipcode: null,
    ad_contact_numbers: null,
    ad_present_residence: null,
    ad_prior_residence: null,
    ad_passport_number: null,
    ad_passport_issued_by: null,
    ad_passport_date: null,
    ad_passport_expiration_date: null,
    ad_has_been_issued_visa: null,
    ad_issuance_date: null,
    ad_expiration_date: null,
    ad_prev_medical_exam_month: null,
    ad_prev_medical_exam_year: null,
    ad_prev_xray_month: null,
    ad_prev_xray_year: null,
    petitioner_fullname: null,
    petitioner_is_alive: null,
    petitioner_relationship: null,
    petitioner_us_street_addr: null,
    petitioner_us_city_addr: null,
    petitioner_us_state_addr: null,
    petitioner_us_postal_code: null,
    petitioner_contact_no: null,
    petitioner_email_addr: null,
    intended_port_of_entry: null
  }),
  actions: {
    setUSIndividualDetails(res) {
        let jsonPARSE = JSON.parse(res)
        
        this.$state.user_id = jsonPARSE.json_user_id
        this.$state.email = jsonPARSE.json_email
        this.$state.date_of_birth = jsonPARSE.json_date_of_birth
        this.$state.cv_category = jsonPARSE.json_cv_category
        this.$state.cv_received = jsonPARSE.json_cv_received
        this.$state.is_cv_received = jsonPARSE.json_is_cv_received
        this.$state.vaccine_receive = jsonPARSE.json_vaccine_receive
        this.$state.cv_brand_name = jsonPARSE.json_cv_brand_name
        this.$state.firstDose = jsonPARSE.json_firstDose
        this.$state.secondDose = jsonPARSE.json_secondDose
        this.$state.cv_booster1 = jsonPARSE.json_cv_booster1
        this.$state.first_doseBooster = jsonPARSE.json_first_doseBooster
        this.$state.cv_booster2 = jsonPARSE.json_cv_booster2
        this.$state.second_doseBooster = jsonPARSE.json_second_doseBooster
        this.$state.ci_nvc_number = jsonPARSE.json_ci_nvc_number
        this.$state.ci_confirm_nvc = jsonPARSE.json_ci_confirm_nvc
        this.$state.ci_visa_pref_category = jsonPARSE.json_ci_visa_pref_category
        this.$state.ci_interview_date = jsonPARSE.json_ci_interview_date
        this.$state.ci_interview_source = jsonPARSE.json_ci_interview_source
        this.$state.ad_last_name = jsonPARSE.json_ad_last_name
        this.$state.ad_first_name = jsonPARSE.json_ad_first_name
        this.$state.ad_middle_name = jsonPARSE.json_ad_middle_name
        this.$state.ad_gender = jsonPARSE.json_ad_gender
        this.$state.ad_civil_status = jsonPARSE.json_ad_civil_status
        this.$state.ad_nationality = jsonPARSE.json_ad_nationality
        this.$state.ad_birthplace = jsonPARSE.json_ad_birthplace
        this.$state.ad_birth_country = jsonPARSE.json_ad_birth_country
        this.$state.ad_mother_last_name = jsonPARSE.json_ad_mother_last_name
        this.$state.ad_mother_first_name = jsonPARSE.json_ad_mother_first_name
        this.$state.ad_mother_middle_name = jsonPARSE.json_ad_mother_middle_name
        this.$state.ad_address = jsonPARSE.json_ad_address
        this.$state.ad_city = jsonPARSE.json_ad_city
        this.$state.ad_province = jsonPARSE.json_ad_province
        this.$state.ad_zip_code = jsonPARSE.json_ad_zip_code
        this.$state.ad_overseas_country = jsonPARSE.json_ad_overseas_country
        this.$state.ad_overseas_street_address = jsonPARSE.json_ad_overseas_street_address
        this.$state.ad_overseas_city = jsonPARSE.json_ad_overseas_city
        this.$state.ad_overseas_province = jsonPARSE.json_ad_overseas_province
        this.$state.ad_overseas_zipcode = jsonPARSE.json_ad_overseas_zipcode
        this.$state.ad_contact_numbers = jsonPARSE.json_ad_contact_numbers
        this.$state.ad_present_residence = jsonPARSE.json_ad_present_residence
        this.$state.ad_prior_residence = jsonPARSE.json_ad_prior_residence
        this.$state.ad_passport_number = jsonPARSE.json_ad_passport_number
        this.$state.ad_passport_issued_by = jsonPARSE.json_ad_passport_issued_by
        this.$state.ad_passport_date = jsonPARSE.json_ad_passport_date
        this.$state.ad_passport_expiration_date = jsonPARSE.json_ad_passport_expiration_date
        this.$state.ad_has_been_issued_visa = jsonPARSE.json_ad_has_been_issued_visa
        this.$state.ad_issuance_date = jsonPARSE.json_ad_issuance_date
        this.$state.ad_expiration_date = jsonPARSE.json_ad_expiration_date
        this.$state.ad_prev_medical_exam_month = jsonPARSE.json_ad_prev_medical_exam_month
        this.$state.ad_prev_medical_exam_year = jsonPARSE.json_ad_prev_medical_exam_year
        this.$state.ad_prev_xray_month = jsonPARSE.json_ad_prev_xray_month
        this.$state.ad_prev_xray_year = jsonPARSE.json_ad_prev_xray_year
        this.$state.petitioner_fullname = jsonPARSE.json_petitioner_fullname
        this.$state.petitioner_is_alive = jsonPARSE.json_petitioner_is_alive
        this.$state.petitioner_relationship = jsonPARSE.json_petitioner_relationship
        this.$state.petitioner_us_street_addr = jsonPARSE.json_petitioner_us_street_addr
        this.$state.petitioner_us_city_addr = jsonPARSE.json_petitioner_us_city_addr
        this.$state.petitioner_us_state_addr = jsonPARSE.json_petitioner_us_state_addr
        this.$state.petitioner_us_postal_code = jsonPARSE.json_petitioner_us_postal_code
        this.$state.petitioner_contact_no = jsonPARSE.json_petitioner_contact_no
        this.$state.petitioner_email_addr = jsonPARSE.json_petitioner_email_addr
        this.$state.intended_port_of_entry = jsonPARSE.json_intended_port_of_entry
    },
    clearUSIndividualDetails() {
        this.$state.user_id = null,
        this.$state.email = null,
        this.$state.date_of_birth = null,
        this.$state.cv_category = null,
        this.$state.cv_received = null,
        this.$state.is_cv_received = null,
        this.$state.cv_brand_name = null,
        this.$state.firstDose = null,
        this.$state.secondDose = null,
        this.$state.cv_booster1 = null,
        this.$state.first_doseBooster = null,
        this.$state.cv_booster2 = null,
        this.$state.second_doseBooster = null,
        this.$state.ci_nvc_number = null,
        this.$state.ci_confirm_nvc = null,
        this.$state.ci_visa_pref_category = null,
        this.$state.ci_interview_date = null,
        this.$state.ci_interview_source = null,
        this.$state.ad_last_name = null,
        this.$state.ad_first_name = null,
        this.$state.ad_middle_name = null,
        this.$state.ad_gender = null,
        this.$state.ad_civil_status = null,
        this.$state.ad_nationality = null,
        this.$state.ad_birthplace = null,
        this.$state.ad_birth_country = null,
        this.$state.ad_mother_last_name = null,
        this.$state.ad_mother_first_name = null,
        this.$state.ad_mother_middle_name = null,
        this.$state.ad_address = null,
        this.$state.ad_city = null,
        this.$state.ad_province = null,
        this.$state.ad_zip_code = null,
        this.$state.ad_overseas_country = null,
        this.$state.ad_overseas_street_address = null,
        this.$state.ad_overseas_city = null,
        this.$state.ad_overseas_province = null,
        this.$state.ad_overseas_zipcode = null,
        this.$state.ad_overseas_country = null,
        this.$state.ad_overseas_street_address = null,
        this.$state.ad_overseas_city = null,
        this.$state.ad_overseas_province = null,
        this.$state.ad_overseas_zipcode = null,
        this.$state.ad_contact_numbers = null,
        this.$state.ad_present_residence = null,
        this.$state.ad_prior_residence = null,
        this.$state.ad_passport_number = null,
        this.$state.ad_passport_issued_by = null,
        this.$state.ad_passport_date = null,
        this.$state.ad_passport_expiration_date = null,
        this.$state.ad_has_been_issued_visa = null,
        this.$state.ad_issuance_date = null,
        this.$state.ad_expiration_date = null,
        this.$state.ad_prev_medical_exam_month = null,
        this.$state.ad_prev_medical_exam_year = null,
        this.$state.ad_prev_xray_month = null,
        this.$state.ad_prev_xray_year = null,
        this.$state.petitioner_fullname = null,
        this.$state.petitioner_is_alive = null,
        this.$state.petitioner_relationship = null,
        this.$state.petitioner_us_street_addr = null,
        this.$state.petitioner_us_city_addr = null,
        this.$state.petitioner_us_state_addr = null,
        this.$state.petitioner_us_postal_code = null,
        this.$state.petitioner_contact_no = null,
        this.$state.petitioner_email_addr = null,
        this.$state.intended_port_of_entry = null
    }
  },
  persist: true
})