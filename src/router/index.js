import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user-store'

// =============== Parent - View Import ==================== //
import HomeView from '@/views/HomeView.vue'
import ApplicationView from '@/views/ApplicationView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import IndividualView from '@/views/IndividualView.vue'
import FamilyView from '@/views/FamilyView.vue'

// =============== Child - Page Import ==================== //

// --- Sign In Child ---- //
import SignInPage from '@/views/signin/SignInPage.vue'
import ForgotPasswordPage from '@/views/signin/ForgotPasswordPage.vue'
// --- Profile Child ------ //
import ProfilePage from '@/views/profile/ProfilePage.vue'
import EditProfilePage from '@/views/profile/EditProfilePage.vue'
// ------- APPLICATION PAGE ------- //
import ApplicationPage from '@/views/application/ApplicationPage.vue'
import ApplicationShow from '@/views/application/ApplicationShow.vue'

// ================== INDIVIDUAL CHILD =========================== //
import IndividualCountryPage from '@/views/individual/CountryPage.vue'


// ------- US PAGE ------- //
import { useUSIndividualSched } from '@/store/us-individual-sched'
import { useUSIndividualDetails } from '@/store/us-individual-details'
import US_Ind_ApplicationFormPage from '@/views/individual/us/ApplicationFormPage.vue'
import US_Ind_SchedulePage from '@/views/individual/us/SchedulePage.vue'
import US_Ind_DetailsForm from '@/views/individual/us/DetailsFormPage.vue'
import US_Ind_Preview from '@/views/individual/us/PreviewPage.vue'
// ------ US END PAGE ---------- //

// ------- CA PAGE ------- //
import { useCAIndividualSched } from '@/store/ca-individual-sched'
import { useCAIndividualDetails } from '@/store/ca-individual-details'
import CA_Ind_ApplicationFormPage from '@/views/individual/ca/ApplicationFormPage.vue'
import CA_Ind_SchedulePage from '@/views/individual/ca/SchedulePage.vue'
import CA_Ind_DetailsForm from '@/views/individual/ca/DetailsFormPage.vue'
import CA_Ind_Preview from '@/views/individual/ca/PreviewPage.vue'
// ------ CA END PAGE ---------- //

// ------- AU PAGE ------- //
import { useAUIndividualSched } from '@/store/au-individual-sched'
import { useAUIndividualDetails } from '@/store/au-individual-details'
import AU_Ind_ApplicationFormPage from '@/views/individual/au/ApplicationFormPage.vue'
import AU_Ind_SchedulePage from '@/views/individual/au/SchedulePage.vue'
import AU_Ind_DetailsForm from '@/views/individual/au/DetailsFormPage.vue'
import AU_Ind_Preview from '@/views/individual/au/PreviewPage.vue'
// ------ AU END PAGE ---------- //

// ------- NZ PAGE ------- //
import { useNZIndividualSched } from '@/store/nz-individual-sched'
import { useNZIndividualDetails } from '@/store/nz-individual-details'
import NZ_Ind_ApplicationFormPage from '@/views/individual/nz/ApplicationFormPage.vue'
import NZ_Ind_SchedulePage from '@/views/individual/nz/SchedulePage.vue'
import NZ_Ind_DetailsForm from '@/views/individual/nz/DetailsFormPage.vue'
import NZ_Ind_Preview from '@/views/individual/nz/PreviewPage.vue'
// ------ NZ END PAGE ---------- //

// ------- OT PAGE ------- //
import { useOTIndividualSched } from '@/store/ot-individual-sched'
import { useOTIndividualDetails } from '@/store/ot-individual-details'
import OT_Ind_ApplicationFormPage from '@/views/individual/ot/ApplicationFormPage.vue'
import OT_Ind_SchedulePage from '@/views/individual/ot/SchedulePage.vue'
import OT_Ind_DetailsForm from '@/views/individual/ot/DetailsFormPage.vue'
import OT_Ind_Preview from '@/views/individual/ot/PreviewPage.vue'
// ------ OT END PAGE ---------- //

// ================ INDIVIDUAL END PAGE ========================= //


// --- Family Child ------- //
import FamilyCountryPage from '@/views/family/CountryPage.vue'


const routes = [
  {
    path: '/:pathmatch(.*)*',
    name: 'Not Found',
    component: NotFoundView
  },
  {
    path: '',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next('/signin')
    },
    name: 'home',
    component: HomeView,
  },
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next('/signin')
    },
    name: 'home',
    component: HomeView,
  },
  {
    path: '/application',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next('/signin')
    },
    component: ApplicationView,
    children: [
      {
        path: '',
        name: 'application',
        component: ApplicationPage,
      },
      {
        path: '/application/:country/:id',
        name: 'applicationShow',
        component: ApplicationShow,
      },
    ]
  },
  {
    path: '/profile',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next('/signin')
    },
    component: ProfileView,
    children: [
      {
        path: '',
        name: 'profile',
        component: ProfilePage,
      },
      {
        path: '/edit-profile',
        name: 'edit-profile',
        component: EditProfilePage,
      },
    ]
  },
  {
    path: '/individual',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next('signin')
    },
    component: IndividualView,
    children: [
      {
        path: '',
        name: 'individual',
        component: IndividualCountryPage,
      },
      {
        path: '/individual/us',
        name: 'us_form',
        component: US_Ind_ApplicationFormPage,
      },
      {
        path: '/individual/us/schedule',
        name: 'us_date',
        component: US_Ind_SchedulePage,
      },
      {
        path: '/individual/us/applicant-details',
        beforeEnter: (to, from, next) => {
          useUSIndividualSched().date && useUSIndividualSched().time ? next() : next('/individual/ca/schedule')
        },
        name: 'us_details',
        component: US_Ind_DetailsForm,
      },
      {
        path: '/individual/us/preview',
        beforeEnter: (to, from, next) => {
          useUSIndividualDetails().user_id && useUSIndividualDetails().email ? next() : next('/individual/ca/applicant-details')
        },
        name: 'us_preview',
        component: US_Ind_Preview,
      },
      {
        path: '/individual/ca',
        name: 'ca_form',
        component: CA_Ind_ApplicationFormPage,
      },
      {
        path: '/individual/ca/schedule',
        name: 'ca_date',
        component: CA_Ind_SchedulePage,
      },
      {
        path: '/individual/ca/applicant-details',
        beforeEnter: (to, from, next) => {
          useCAIndividualSched().date && useCAIndividualSched().time ? next() : next('/individual/ca/schedule')
        },
        name: 'ca_details',
        component: CA_Ind_DetailsForm,
      },
      {
        path: '/individual/ca/preview',
         beforeEnter: (to, from, next) => {
          useCAIndividualDetails().user_id && useCAIndividualDetails().email ? next() : next('/individual/ca/applicant-details')
        },
        name: 'ca_preview',
        component: CA_Ind_Preview,
      },
      {
        path: '/individual/au',
        name: 'au_form',
        component: AU_Ind_ApplicationFormPage,
      },
      {
        path: '/individual/au/schedule',
        name: 'au_date',
        component: AU_Ind_SchedulePage,
      },
      {
        path: '/individual/au/applicant-details',
        beforeEnter: (to, from, next) => {
          useAUIndividualSched().date && useAUIndividualSched().time ? next() : next('/individual/au/schedule')
        },
        name: 'au_details',
        component: AU_Ind_DetailsForm,
      },
      {
        path: '/individual/au/preview',
        beforeEnter: (to, from, next) => {
          useAUIndividualDetails().user_id && useAUIndividualDetails().subClassKind ? next() : next('/individual/au/applicant-details')
        },
        name: 'au_preview',
        component: AU_Ind_Preview,
      },

      {
        path: '/individual/nz',
        name: 'nz_form',
        component: NZ_Ind_ApplicationFormPage,
      },
      {
        path: '/individual/nz/schedule',
        name: 'nz_date',
        component: NZ_Ind_SchedulePage,
      },
      {
        path: '/individual/nz/applicant-details',
        beforeEnter: (to, from, next) => {
          useNZIndividualSched().date && useNZIndividualSched().time ? next() : next('/individual/nz/schedule')
        },
        name: 'nz_details',
        component: NZ_Ind_DetailsForm,
      },
      {
        path: '/individual/nz/preview',
        beforeEnter: (to, from, next) => {
          useNZIndividualDetails().user_id && useNZIndividualDetails().medCertType ? next() : next('/individual/nz/applicant-details')
        },
        name: 'nz_preview',
        component: NZ_Ind_Preview,
      },

      {
        path: '/individual/ot',
        name: 'ot_form',
        component: OT_Ind_ApplicationFormPage,
      },
      {
        path: '/individual/ot/schedule',
        name: 'ot_date',
        component: OT_Ind_SchedulePage,
      },
      {
        path: '/individual/ot/applicant-details',
        beforeEnter: (to, from, next) => {
          useOTIndividualSched().date && useOTIndividualSched().time ? next() : next('/individual/ot/schedule')
        },
        name: 'ot_details',
        component: OT_Ind_DetailsForm,
      },
      {
        path: '/individual/ot/preview',
        beforeEnter: (to, from, next) => {
          useOTIndividualDetails().user_id && useOTIndividualDetails().embassyOfVisa ? next() : next('/individual/ot/applicant-details')
        },
        name: 'ot_preview',
        component: OT_Ind_Preview,
      },
    ]
  },
  {
    path: '/family',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next() : next('/signin')
    },
    component: FamilyView,
    children: [
      {
        path: '',
        name: 'family',
        component: FamilyCountryPage,
      },
    ]
  },
  {
    path: '/signup',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next('/') : next()
    },
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/signin',
    beforeEnter: (to, from, next) => {
      useUserStore().id ? next('/') : next()
    },
    component: SignInView,
    children: [
      {
        path: '',
        name: 'signin',
        component: SignInPage,
      },
      {
        path: 'forgot-password',
        name: 'ForgotPasswordPage',
        component: ForgotPasswordPage,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {x: 0, y: 0}
  }
})

export default router
