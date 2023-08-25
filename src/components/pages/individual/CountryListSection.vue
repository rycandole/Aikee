<script setup>
    import CountryLinkBtn from '@/components/global/CountryLinkBtn.vue'

</script>
<template>
    <div class="col-12">
        <div class="row mt-3 justify-content-center">
            <div class="col-12 p-2 pt-5 pb-5 bg-white border">
                <div class="row">
                    <div class="col-12 mb-3">
                        <h1 class="text-secondary text-center fs-1 fw-bold" >Choose Country</h1>
                    </div>
                </div>
                <CountryLinkBtn 
                    btnUrl="/individual/us"
                    btnText="U.S.A."
                />
                <CountryLinkBtn 
                    btnUrl="/individual/ca"
                    btnText="Canada"
                />
                <CountryLinkBtn 
                    btnUrl="/individual/au"
                    btnText="Australia"
                />
                <CountryLinkBtn 
                    btnUrl="/individual/nz"
                    btnText="New Zealand"
                />
                <CountryLinkBtn 
                    btnUrl="/individual/ot/kr"
                    btnText="South Korea / KOICA"
                />
                <CountryLinkBtn 
                    btnUrl="/individual/ot/fk"
                    btnText="Falkland Islands"
                />
                <CountryLinkBtn 
                    btnUrl="/individual/ot/lv"
                    btnText="Latvia"
                />
                <CountryLinkBtn 
                    btnUrl="/individual/ot/mu"
                    btnText="Mauritius"
                />
                <CountryLinkBtn 
                    btnUrl="/individual/nz"
                    btnText="Cook Islands"
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