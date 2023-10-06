<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { onMounted } from 'vue'
import {useRoute} from "vue-router"
import FormHeader from '@/components/global/FormHeader.vue'
// import SubFormHeader from '@/components/global/SubFormHeader.vue'
import PreviewText from '@/components/global/PreviewText.vue'
import PreviewSmallText from '@/components/global/PreviewSmallText.vue'
import SubNavbar from "@/components/includes/SubNavbar.vue";
import moment from 'moment'

const route = useRoute();
const regId = route.params.id;

let showApplication = ref([])
let NZ_Information = ref(null)

// const clinic_code = new Map([
//             ["", null],
//             ["MNL", "Ermita, Manila"],
//             ["BGC", "Bonifacio Global City(BGC)"],
//         ]);
const medicalCertificate = new Map([
                                ['Full', 'Full Medical Examination'],
                                ['CXR', 'Chest X-ray only'],
                                ['Limited', 'Limited Medical Examination']
                            ])
                            

onMounted(async () => {
    showInformation()
})

const showInformation = async () => {
    let res = await axios.get('nz-show/' + regId)
    
    showApplication = res.data.result
    NZ_Information.value = showApplication


}

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
    <div v-if="NZ_Information" class="wrapper_container row bg-white border">
        <div class="col-12 mb-2">
            <h1 class="text-secondary text-center fs-1 fw-bold" >New Zealand</h1>
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->

        <form v-for="(row, index) in NZ_Information" :key="index" class="col-12 mb-3">
            <div class="col-12 mb-3">
                <div class="card-body row">
                    <div class="col-12 pb-3" :hidden="`${row.Seen}` == 1 ? false : true">
                        <h2 class="text-success text-center">
                            This application was arrived.
                        </h2>
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="Medical Examination Schedule"
                        />
                    </div>
                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Preferred Clinic Location"
                            v-bind:previewText="`${row.branch}` == 'BGC' ? 'BGC - Bonifacio Global City' : 'Ermita, Manila'"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div class="col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Preferred Date of Medical examination"
                            v-bind:previewText="moment(`${row.PreferredMedicalExamDate}`).format('LL')"
                        />
                        
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <PreviewText 
                            previewLabel="Preferred Time of Medical examination"
                            v-bind:previewText="`${row.priorityTime}`"
                        />
                    </div>
                    <div class="col-12"><hr /></div>

                    <div class="col-lg-8 col-md-12 col-sm-12 mb-3">
                        <PreviewText 
                            previewLabel="Medical Certificate Type"
                            v-bind:previewText="`${row.ExamType_NZ}` == 'null' ? 'None' : medicalCertificate.get(`${row.ExamType_NZ}`)"
                        />
                    </div>
                    <div class="col-12"><hr /></div>

                    <div class="col-12">
                        <PreviewText 
                            previewLabel="Is this your first medical examination for the Canadian Embassy? "
                            v-bind:previewText="`${row.Prev_AUMed}` == 'N' ? 'No' : 'Yes' "
                        />
                    </div>
                    <div :hidden="`${row.Prev_AUMed}` == 'Y' ? true : false" class="col-12 pl-5">
                        <div class="row">
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <PreviewText 
                                    previewLabel="Name of Clinic and Year of Visa Medical Examination"
                                    v-bind:previewText="`${row.PrevMedDetail1}` == 'null' ? 'None' : `${row.PrevMedDetail1}`"
                                />
                            </div>
                            <div class="col-lg-8 col-md-12 col-sm-12">
                                <PreviewText 
                                    previewLabel="Category applied for"
                                    v-bind:previewText="`${row.PrevMedDetail2}` == 'null' ? 'None' : `${row.PrevMedDetail2}`"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-12"><hr /></div>
                    <div :hidden="`${row.PassNo}` == '' ? true : false" class="col-lg-8 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Passport Number"
                            v-bind:previewText="`${row.PassNo}` == 'null' ? 'None' : `${row.PassNo}`"
                        />
                    </div>
                    <div class="col-12"><hr /></div>
                    <div :hidden="`${row.IssuedCountry}` == '' ? true : false" class="col-lg-6 col-md-12 col-sm-12">
                        <PreviewText 
                            previewLabel="Country of Issue"
                            v-bind:previewText="`${row.IssuedCountry}` == 'null' ? 'None' : `${row.IssuedCountry}`"
                        />
                    </div>
                    <div :hidden="`${row.IssuedDate}` == '' || `${row.IssuedDate}` == 'Invalid date' ? true : false " class="col-lg-6 col-md-12 col-sm-12 mb-3">
                        <PreviewText 
                            previewLabel="Date of Issue"
                            v-bind:previewText="`${row.IssuedDate}` == 'null' ? 'None' : moment(`${row.IssuedDate}`).format('LL')"
                        />
                    </div>
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="APPLICANT DETAILS"
                        />
                    </div>
                    <div class="col-12">
                        <ol>
                            <li>
                                <PreviewText 
                                    previewLabel="Applicant's Name"
                                />
                            </li>
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="`${row.LastName}`"
                                        smallLabel="Last Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="`${row.FirstName}`"
                                        smallLabel="First Name"
                                    />
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <PreviewSmallText 
                                        v-bind:previewText="`${row.MiddleName}` == 'null' ? 'None' : `${row.MiddleName}`"
                                        smallLabel="Middle Name"
                                    />
                                </div>
                            </div>
                            <hr />
                            <li>
                                <PreviewText 
                                    previewLabel="Mother's Maiden Name (Last Name, First Name, Middle Name)"
                                />
                                <div class="row">
                                    <div class="col-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="`${row.MaidenName}`"
                                            smallLabel="Last Name, First Name, Middle Name"
                                        />
                                    </div>
                                </div>
                                <hr />
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Applicant's Date of Birth"
                                    v-bind:previewText="moment(`${row.DOB}`).format('LL')"
                                />
                                <hr/>
                            </li>
                            <li>
                                <div class="row">
                                    <div class="col-6">
                                        <PreviewText 
                                            previewLabel="Gender"
                                            v-bind:previewText="`${row.Gender}` == 'M' ? 'Male' : 'Female'"
                                        />
                                    </div>
                                    <div class="col-6">
                                        <PreviewText
                                            previewLabel="Civil Status"
                                            v-bind:previewText="`${row.CivStatus}`"
                                        />
                                    </div>
                                </div>
                                <hr/>
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Country of Nationality"
                                    v-bind:previewText="`${row.country_nationality}`"
                                />
                                <hr/>
                            </li>
                            <li>
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewText 
                                            previewLabel="Contact Number"
                                            v-bind:previewText="`${row.ContactNo}`"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewText 
                                            previewLabel="Email Address"
                                            v-bind:previewText="`${row.EmailAdd}`"
                                        />
                                    </div>
                                </div>
                                <hr/>
                            </li>
                            <li>
                                <PreviewText 
                                    previewLabel="Residential Address"
                                />
                                <div class="row">
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="`${row.Add1}`"
                                            smallLabel="Street"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="`${row.AddBrgy}`"
                                            smallLabel="Barangay"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="`${row.Add2}`"
                                            smallLabel="City"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="`${row.Add3}`"
                                            smallLabel="Province"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <PreviewSmallText 
                                            v-bind:previewText="`${row.AddPost}`"
                                            smallLabel="Postal Code"
                                        />
                                    </div>
                                    
                                </div>
                                <hr/>
                            </li>
                        </ol>
                    </div>
                    
                    <div class="mb-3 col-12">
                        <FormHeader
                            headerText="ADDITIONAL QUESTIONS"
                        />
                    </div>
                    <div class="col-12">
                        <ol>
                            <li class="pb-3">What is your intended occupation or activity in New Zealand <b class="text-danger">*</b></li>
                            <div class="row">
                                <div class="col-12">
                                    <PreviewText 
                                        previewLabelClassName="d-none"
                                        v-bind:previewText="`${row.AddPost}`"
                                    />
                                </div>
                            </div>
                            <li class="pt-3">How long do you intend staying in New Zealand  <b class="text-danger">*</b></li>
                            <div class="row pb-3 pt-2"> 
                                <div class="col-12 pl">
                                    <PreviewText 
                                        previewLabelClassName="d-none"
                                        v-bind:previewText="`${row.Stay}` == 'T' ? 'Temporary' : 'Permanent' "
                                    />
                                </div>
                                <div :hidden="`${row.Stay}` == 'P' ? true : false" class="col-2">
                                    <PreviewText 
                                        previewLabel="Year"
                                        v-bind:previewText="`${row.StayYr}`"
                                    />
                                </div>
                                <div :hidden="`${row.Stay}` == 'P' ? true : false" class="col-2">
                                    <PreviewText 
                                        previewLabel="Months"
                                        v-bind:previewText="`${row.StayMt}`"
                                    />
                                </div>
                                <div class="8"></div>
                            </div>
                            <li>What is the visa category and visa type that you are applying for? <b class="text-danger">*</b></li>
                            <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <PreviewText 
                                        previewLabelClassName="d-none"
                                        v-bind:previewText="`${row.SubClass}`"
                                    />
                                </div>
                            </div>
                            <li>Agency <b class="text-danger">*</b></li>
                            <div class="row pb-3"> 
                                <div class="col-lg-8 col-md-12 col-sm-12">
                                    <PreviewText 
                                        previewLabelClassName="d-none"
                                        v-bind:previewText="`${row.agency}`"
                                    />
                                </div>
                            </div>
                        </ol>
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