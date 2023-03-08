import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user-store'

// =============== Parent - View Import ==================== //
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import IndividualView from '@/views/IndividualView.vue'
import FamilyView from '@/views/FamilyView.vue'

// =============== Child - Page Import ==================== //
// --- Sign In Child
import SignInPage from '@/views/signin/SignInPage.vue'
import ForgotPasswordPage from '@/views/signin/ForgotPasswordPage.vue'
// --- Profile Child
import ProfilePage from '@/views/profile/ProfilePage.vue'
import EditProfilePage from '@/views/profile/EditProfilePage.vue'
// ================== INDIVIDUAL CHILD =========================== //
import IndividualCountryPage from '@/views/individual/CountryPage.vue'
// ------- US PAGE ------- //
import US_Ind_ApplicationFormPage from '@/views/individual/us/ApplicationFormPage.vue'
import US_Ind_SchedulePage from '@/views/individual/us/SchedulePage.vue'
import US_Ind_DetailsForm from '@/views/individual/us/DetailsFormPage.vue'
import US_Ind_Preview from '@/views/individual/us/PreviewPage.vue'
// ------ US END PAGE ---------- //
// ================ INDIVIDUAL END PAGE ========================= //

// --- Family Child
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
        name: 'us_details',
        component: US_Ind_DetailsForm,
      },
      {
        path: '/individual/us/preview',
        name: 'us_preview',
        component: US_Ind_Preview,
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
  routes
})

export default router
