<script setup>
import { useRoute } from "vue-router";
import { useRouter } from 'vue-router'
import { onMounted } from "vue";
import { useUSHolidates } from "@/store/us-holidates";
import { use_TRIPLETS_MNL_Holidates } from '@/store/triplets-holidates-mnl'
import { use_TRIPLETS_BGC_Holidates } from '@/store/triplets-holidates-bgc'


const route = useRoute();
const router = useRouter();
const regId = route.params.id;
const country = route.params.country;
const paycode = route.params.paycode;
const USHolidates = useUSHolidates();
const TRIPLETS_MNL_Holidates = use_TRIPLETS_MNL_Holidates()
const TRIPLETS_BGC_Holidates = use_TRIPLETS_BGC_Holidates()


USHolidates.clearHolidays()
TRIPLETS_MNL_Holidates.clearHolidays()
TRIPLETS_BGC_Holidates.clearHolidays()

if (country == "US") {
    await USHolidates.fetchHolidaysByCountryAndBranch("US", "MNL");
    router.push("/application/resched/"+country+"/"+regId+"/"+paycode);
} else {
    await TRIPLETS_MNL_Holidates.fetchHolidaysByCountryAndBranch(country, 'MNL')
    await TRIPLETS_BGC_Holidates.fetchHolidaysByCountryAndBranch(country, 'BGC')
    router.push("/application/resched/"+country+"/"+regId+"/"+paycode);
}

onMounted(async () => {
    
});




</script>