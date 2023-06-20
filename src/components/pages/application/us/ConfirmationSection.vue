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
        <div class="col-12 mt-5">
            <h4 class="text-secondary fs-1 fw-bold" style="font-family:Arial;" >SLEC Online Registration Confirmation - US230618U74DF7</h4>
        </div>
    </div>
    
    <div id="printable-content" class="wrapper_container row bg-white border">
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
                <td style="font-size: 13px;" class="pt-3" align="center">
                   <p> 1177 JORGE BOCOBO ST., ERMITA, MANILA 1000    |   (02) 8521-0020    |   <a href="https://slec.ph/"  target="_blank">https://slec.ph</a>   |   slec@slec.ph</p>
                    <hr>
                </td>
            </tr>
            <tr>
                <td align="center" class="pt-3">
                    <h3>Monday, June 26, 2023</h3>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h5><u>Time: 11:00 AM</u></h5>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <h1 style="font-family: C39T36L; font-size: 50pt;">*US230618U74DF7*</h1>
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
            <tr>
                <td>
                    <p style="font-size: 13px">
                        For more information, please visit: <a href="https://slec.ph/registration/us/visa-applicant.php" target="_blank">Medical Examination Guide for U.S. Immigrant Visa Applicants</a>
                    </p>
                    <p style="font-size: 13px">
                        Should you have any inquiries, you may send us an email at slec@slec.ph.
                    </p>
                </td>
            </tr>
            <tr><td><hr></td></tr>
            <tr>
                <td class="pt-5 pb-2">
                    <h5>ERMITA, MANILA</h5>
                    <h6 class="mt-5 ml-3">CONTACT DETAILS</h6>
                </td>
            </tr>
            <tr>
                <td class="pl-3">
                    <p style="font-size: 13px">
                    <strong>Clinic Address:</strong><br>
                    1177 Jorge Bocobo St., Ermita, Manila</p>
                </td>
            </tr>
            <tr>
                <td class="pl-3">
                    <p style="font-size: 13px">
                    <strong>Contact Numbers:</strong><br>
                    1177 Jorge Bocobo St., Ermita, Manila</p>
                </td>
            </tr>
            <tr>
                <td class="pl-3">
                    <p style="font-size: 13px">
                    <strong>Clinic Hours:</strong><br>
                    Mondays to Fridays from 7:00AM to 4:30PM (We are closed on declared Philippine holidays) 
                </p>
                </td>
            </tr>
            <tr>
                <td>
                    <hr>
                </td>
            </tr>
            <tr>
                <td>
                    <h6>Mode of Payment:</h6>
                </td>
            </tr>
            <tr>
                <td>
                    <ol style="font-size: 14px;">
                        <li>Cash payment at the Clinic Cashier on the day of your medical exam.</li>
                        <li>Security Bank.</li>
                        <ul>
                            <li>Over the counter at any Security Bank Branch</li>
                            <li>Security Bank online payment (with existing SBC online bank account)</li>
                            <li>Security Bank mobile app (with existing SBC online bank account)</li>
                            <li>see attached payment guide for Security Bank Bills Payment.</li>
                        </ul>
                        <li>Credit Card (Visa and Master card only)</li>
                        <ul>
                            <li>Credit card must only be used and signed by the owner of the card.</li>
                            <li>Authorization to use credit card is not accepted.</li>
                            <li>Debit card is not accepted.</li>
                            <li> Credit card downtime may happen due to system update/maintenance by the provider.</li>
                        </ul>

                    </ol>
                </td>
            </tr>
        </table> 
       
        <div class="col-12">
            <table border="2" width="100%" height="auto">
                <tr>
                    <td class="p-2" align="center">
                        <h5>PLEASE PRINT AND PRESENT THIS FORM WHEN PAYING AT THE BANK</h5>
                    </td>
                </tr>
                <tr>
                    <td class="p-2" align="center">
                        <h6>PAYMENT INSTRUCTIONS</h6>
                    </td>
                </tr>
                <tr>
                    <td class="p-3">
                        <ol style="font-size: 14px; line-height: 25px;">
                            <li>Only the initial medical examination may be paid via bank transaction. Additional tests must be paid at the clinic cashier.</li>
                            <li>Should there be an adjustment in medical fees prior to medical examination, the new medical fee will prevail. The applicant must pay the difference between the old and new fees at the clinic cashier on the day of medical exam.</li>
                            <li>For Over-the-Counter Payments, the Universal transaction slip shall serve as your proof of payment.</li>
                            <li>You must present the Original Universal Transaction Slip or the printed Transaction Notification slip on the day of your Visa Medical Exam.</li>
                            <li>If your payment thru SBC encounters an error and could not produce a machine validated transaction slip, please email us before you proceed to your medical examination, this is for us to validate your payment status with the bank.</li>
                            <li>For instructions on how to pay, please see attached Bills Payment Guide (PDF).</li>
                        </ol>
                    </td>
                </tr>
                <tr>
                    <td class="p-2" align="center">
                        <h6>PAYMENT DETAILS (for Initial Medical)</h6>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table width="100%" height="auto" class="m-2">
                            <tr>
                                <td class="pb-5">
                                    <strong>
                                        SECURITY BANK
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;">
                                    BILLER NAME:
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;">
                                    <strong>
                                        ST. LUKE'S EXTENSION CLINIC
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;" class="pt-3">
                                    SUBSCRIBER NUMBER:
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1>US230620TZI0DG</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;" class="pt-3">
                                    APPLICANT NAME:
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;">
                                    <strong>
                                        ARGEL, CHRISTIAN KARL ALCODIA
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;" class="pt-3">
                                    APPLICANT AGE:
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;">
                                    <strong>
                                        22 years old
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;" class="pt-3">
                                    AMOUNT TO BE PAID:
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;">
                                    <strong>
                                        PHP 18540.00 - US Adult Medical Fee (15 years and older)
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size: 14px;" class="p-5" align="center">
                                    <strong>
                                        (PLEASE PAY THE EXACT AMOUNT)
                                    </strong>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div class="col-12">
            <a>ONCE PAYMENT HAS BEEN MADE, PLEASE ATTACH THE <strong>PROOF OF PAYMENT WITH YOUR ONLINE REGISTRATION CONFIRMATION</strong> AND PRESENT AT THE CLINIC ON THE DAY OF YOUR MEDICAL EXAMINATION.</a>
        </div>
        <div class="col-12 pt-3">
            <p style="font-size:13px; font-style: italic;">Confidentiality Notice: The contents of this email and any attachments are confidential and/or legally privileged and are intended solely for the addressee. If you received this email message in error, please immediately notify the sender by reply email and delete this message and its attachments. Any use, reproduction, or dissemination of this transmission by persons or entities other than the intended recipient is strictly prohibited.</p>
            <br>
            <p style="font-size:13px;">Confidentiality Notice:</p>
            <p style="font-size:13px;">
                The contents of this email and any attachments are confidential and/or legally privileged and are intended solely for the addressee. If you received this email message in error, please immediately notify the sender by reply email and delete this message and its attachments. Any use, reproduction, or dissemination of this transmission by persons or entities other than the intended recipient is strictly prohibited.
            </p>
        </div>
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
@font-face {
    font-family: C39T36L;
    src: url('../../../../assets/fonts/C39T36L.woff');
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