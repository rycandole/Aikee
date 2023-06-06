// import axios from 'axios'
import { defineStore } from 'pinia'

export const useNZIndividualDetails = defineStore('nz-individual-details', {
  state: () => ({
    user_id: null,
    medCertType: null,
    wasFirstMedicalExam: null,
    prevClinic: null,
    prevCategory: null,
    passportNumber: null,
    issuedCountry: null,
    issuedDate: null,
    ad_lastName: null,
    ad_firstName: null,
    ad_middleName: null,
    gender: null,
    mother_lastName: null,
    mother_firstName: null,
    mother_middleName: null,
    dob: null,
    civil_status: null,
    nationality: null,
    contactNumber: null,
    email: null,
    street: null,
    barangay: null,
    city: null,
    provinceField: null,
    postalCode: null,
    intendedOccupation: null,
    intendedStay: null,
    stayYear: null,
    stayMonth: null,
    visaCategory: null,
    agencyField: null,
  }),
  actions: {
    setNZIndividualDetails(res) {
        let jsonPARSE = JSON.parse(res)
        
        this.$state.user_id = jsonPARSE.json_user_id
        this.$state.medCertType = jsonPARSE.json_medCertType
        this.$state.wasFirstMedicalExam = jsonPARSE.json_wasFirstMedicalExam
        this.$state.prevClinic = jsonPARSE.json_prevClinic
        this.$state.prevCategory = jsonPARSE.json_prevCategory
        this.$state.passportNumber = jsonPARSE.json_passportNumber
        this.$state.issuedCountry = jsonPARSE.json_issuedCountry
        this.$state.issuedDate = jsonPARSE.json_issuedDate
        this.$state.ad_lastName = jsonPARSE.json_ad_lastName
        this.$state.ad_firstName = jsonPARSE.json_ad_firstName
        this.$state.ad_middleName = jsonPARSE.json_ad_middleName
        this.$state.gender = jsonPARSE.json_gender
        this.$state.mother_lastName = jsonPARSE.json_mother_lastName
        this.$state.mother_firstName = jsonPARSE.json_mother_firstName
        this.$state.mother_middleName = jsonPARSE.json_mother_middleName
        this.$state.dob = jsonPARSE.json_dateOfBirth
        this.$state.civil_status = jsonPARSE.json_civil_status
        this.$state.nationality = jsonPARSE.json_nationality
        this.$state.contactNumber = jsonPARSE.json_contactNumber
        this.$state.email = jsonPARSE.json_email
        this.$state.street = jsonPARSE.json_street
        this.$state.barangay = jsonPARSE.json_barangay
        this.$state.city = jsonPARSE.json_city
        this.$state.provinceField = jsonPARSE.json_provinceField
        this.$state.postalCode = jsonPARSE.json_postalCode
        this.$state.intendedOccupation = jsonPARSE.json_intendedOccupation
        this.$state.intendedStay = jsonPARSE.json_intendedStay
        this.$state.stayYear = jsonPARSE.json_stayYear
        this.$state.stayMonth = jsonPARSE.json_stayMonth
        this.$state.visaCategory = jsonPARSE.json_visaCategory
        this.$state.agencyField = jsonPARSE.json_agencyField
    },
    clearNZIndividualDetails() {
        this.$state.user_id = null
        this.$state.medCertType = null
        this.$state.wasFirstMedicalExam = null
        this.$state.prevClinic = null
        this.$state.prevCategory = null
        this.$state.passportNumber = null
        this.$state.issuedCountry = null
        this.$state.issuedDate = null
        this.$state.ad_lastName = null
        this.$state.ad_firstName = null
        this.$state.ad_middleName = null
        this.$state.gender = null
        this.$state.alias_lastName = null
        this.$state.alias_firstName = null
        this.$state.alias_middleName = null
        this.$state.dob = null
        this.$state.gender = null
        this.$state.mother_lastName = null
        this.$state.mother_firstName = null
        this.$state.mother_middleName = null
        this.$state.dob = null
        this.$state.civil_status = null
        this.$state.nationality = null
        this.$state.contactNumber = null
        this.$state.email = null
        this.$state.street = null
        this.$state.barangay = null
        this.$state.city = null
        this.$state.provinceField = null
        this.$state.postalCode = null
        this.$state.intendedOccupation = null
        this.$state.intendedStay = null
        this.$state.stayYear = null
        this.$state.stayMonth = null
        this.$state.visaCategory = null
        this.$state.agencyField = null
    }
  },
  persist: true
})