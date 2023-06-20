<script setup>
// import axios from 'axios'
// import { ref } from 'vue'
// import { onMounted } from 'vue'
// import {useRoute} from "vue-router"
// import FormHeader from '@/components/global/FormHeader.vue'

// import SubFormHeader from '@/components/global/SubFormHeader.vue'
// import PreviewText from '@/components/global/PreviewText.vue'
// import moment from 'moment'


const print = () => {
          const printableContent = document.getElementById('printable-content')
          const printWindow = window.open('', '', 'height=1000,width=1000')
          printWindow.document.write(printableContent.innerHTML)
          printWindow.print()
        }

</script>

<template>
    <!-- ============================================================== -->
                        <!-- Main Container -->
    <!-- ============================================================== -->
    <div class="row">
        <div class="col-12">
            <button @click="print()" class="btn btn-outline-secondary btn-lg">
                Print <i class="fas fa-print pl-2"></i>
            </button>
        </div>
    </div>
    <div id="printable-content" class="wrapper_container row bg-white border">
        <div class="col-12 mb-5">
            <h4 class="text-secondary text-center fs-1 fw-bold" style="font-family:Arial;" >SLEC Online Registration Confirmation - US230618U74DF7</h4>
        </div>
         <!-- ============================================================== -->
                            <!-- Main Container -->
        <!-- ============================================================== -->
        <table width="100%" height="auto" align="center">
            <tr>
                <td align="center">
                    <img src="@/../public/img/partials/slec-email-logo.png" width="300px" height="auto" alt="SLEC LOGO">
                </td>
            </tr>
            <tr>
                <td align="center">
                   <p style="font-sze: 15px;"> 1177 JORGE BOCOBO ST., ERMITA, MANILA 1000    |   (02) 8521-0020    |   <a href="https://slec.ph/"  target="_blank">https://slec.ph</a>   |   slec@slec.ph</p>
                    <hr>
                </td>
            </tr>
            <tr>
                <td align="center" class="pt-3">
                    <h4>Monday, June 26, 2023</h4>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h5><u>Time: 11:00 AM</u></h5>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h3>Bar Code</h3>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h2>US230618U74DF7</h2>
                    <a>US230618U74DF7</a>
                </td>
            </tr>
            <tr>
                <td>
                    <p style="font-size: 13px">Dear Ma'am/Sir:</p>

                    <p style="font-size: 13px">This confirms the medical examination appointment of U.S. visa applicant ACOSTA, MARITA HEDREYDA at St. Luke's Medical Center Extension Clinic (SLEC), on Monday, June 26, 2023 at 11:00 AM. Please be at the clinic at least 30 minutes before your scheduled appointment.</p>

                    <p style="font-size: 13px">SLEC strictly observes the schedule for the visa medical examination. Visa applicants who arrive on time shall be given priority over those who arrive late and miss their appointment.</p>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <strong style="font-size: 15px;">IMPORTANT REMINDERS</strong>
                </td>
            </tr>
            <tr>
                <td>
                    <ul style="font-size: 14px;">
                        <li>Prepare the following required documents inside a short brown envelope in this exact order:</li>
                        <ul>
                            <li>Four (4) pieces recent 2x2 visa pictures</li>
                            <li>Proof of payment (if payment has been made)</li>
                            <li>Printed copy of this email</li>
                            <li>Please print a copy of the attached Process Flow and bring it with you on the day of your medical examination.</li>
                            <li>Passport (must be valid for at least 6 months) – original and two (2) photocopies of the biographic data page (actual size).</li>
                        </ul>
                            <br>
                            <p>Minors (i.e., ages 17 years and below) who will not be accompanied by their parents during the medical examination must also present the following:</p>
                        <ul>
                            <li>Letter of Authorization or Special power of attorney stating that the companion is authorized to sign on behalf of the parent (companion must be knowledgeable of the minor's medical history)</li>
                            <li>Parent's government-issued ID – two (2) photocopies</li>
                            <li>Authorized companion's government-issued ID – original and two (2) photocopies</li>
                        </ul>
                        
                        <li>Bring the following documents:</li>
                        <ul>
                            <li>Vaccination records – original and two (2) photocopies, including the COVID-19 vaccine certificate, if vaccinated</li>
                            <li>Visa Interview Appointment Letter – one (1) photocopy</li>
                            <li>Letter with Case Number – one (1) photocopy</li>
                            <li>DS 260 Confirmation</li>
                            <li></li>
                        </ul>
                        <br>
                        <strong>Each person who will undergo a visa medical examination must have one envelope that contains his/her documents. Please do not staple the documents.</strong>
                        <li>
                            <strong>
                                In the event that the US Embassy or NVC gives you a visa interview date that is earlier than your scheduled medical examination appointment date, please send us an email at slec@slec.ph so we can reschedule your medical examination accordingly.
                            </strong>
                        </li>
                        <li>For health and safety reasons, only visa applicants will be allowed to enter clinic premises. Only one companion will be allowed in the case of senior citizens, PWDs, or minors (i.e., ages 17 years and below), provided that the minor is not accompanied by an adult visa applicant.</li>
                        <li>Always wear your face mask within clinic premises on the day of your visa medical examination</li>
                        <li>Applicants (regardless of age) with signs and symptoms of COVID-19, or who are close contact of a confirmed COVID-19 case will not be permitted to enter the building and will have to complete the DOH-IATF required isolation or quarantine period before proceeding with the visa medical examination.</li>
                        <li>Applicants who wear contact lenses should bring their container and soaking liquid in case they are asked to remove the lenses during the medical exam.</li>
                    </ul>
                </td>
            </tr>
        </table> 
        <!-- ============================================================== -->
                            <!-- End of Main Container -->
        <!-- ============================================================== -->
    </div>
    <div class="row">
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
    font-family: arial;
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