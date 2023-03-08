<script setup>
    import CountryLinkBtn from '../../global/CountryLinkBtn.vue'

</script>
<template>
    <div class="col-12">
        <div class="row mt-3 justify-content-center">
            <div class="col-lg-10 col-md-12 col-sm-12 p-2 pt-5 pb-5 bg-white border">
                <div class="row">
                    <div class="col-12 mb-3">
                        <h1 class="text-secondary text-center fs-1 fw-bold" >Choose Country</h1>
                    </div>
                </div>
                <CountryLinkBtn 
                    btnUrl=""
                    btnText="U.S.A."
                />
                <CountryLinkBtn 
                    btnUrl=""
                    btnText="Australia"
                />
                <CountryLinkBtn 
                    btnUrl=""
                    btnText="Canada"
                />
                <CountryLinkBtn 
                    btnUrl=""
                    btnText="New Zealand"
                />
                <CountryLinkBtn 
                    btnUrl=""
                    btnText="South Korea"
                />
                <CountryLinkBtn 
                    btnUrl=""
                    btnText="Other Country"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss">


@media only screen and (min-width: 768px) {

}

@media only screen and (min-width: 1000px) {

}
</style>