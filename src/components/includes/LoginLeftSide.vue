<template>
    <div class="col-lg-4 col-md-0 col-sm-0 p-0 m-0 card-outline card-primary first_card_col">
        <div class="dark_overlay"></div>
        <div class="row">
            <div class="col-12">
                <img src="img/partials/slec-logo.jpg" class="company_logo" alt="Company Logo">
            </div>
            <div class="col-12 text-center sideH2Div">
                <h3>St. Luke's Medical Center Extension Clinic</h3>
                <p>The best medical center</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.first_card_col {
    padding: 0;
    margin: 0;
    background-image: url("../../../public/img/partials/_slec-building_.jpg");
    display: none;
}
.dark_overlay {
    padding: 0;
    margin: 0;
    background: #000;
    position: fixed;
    width: 100%;
    height: 100vh;
    opacity: 0.6;
}
.sideH2Div {
    padding-top: 20rem;
    color: #fff;
    
}

.sideH2Div p {
    padding-top: 2rem;
    font-size: 18px;
    font-style: italic;
    font-weight: lighter;
}
.company_logo {
    margin: 1rem 0 0 1rem;
    padding: .5rem;
    width: 12rem;
    height: auto;
    background: #fff;
}

@media only screen and (min-width:768px){ 
    .first_card_col {
        display: none;
    }
}
@media only screen and (min-width:1000px){ 
    .first_card_col {
        display: block;
    }
}


</style>