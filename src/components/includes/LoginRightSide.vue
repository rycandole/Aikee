<template>
    <div class="card_div">
        <div class="card-header text-start">
            <h2 class="text-dark card_title">Sign In to your account</h2>
        </div>
        <div class="card-body">

        <form action="../../index3.html" method="post">
            <div class="input-group mb-4">
                <input type="email" class="form-control" placeholder="Email or Username">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-4">
                <input type="password" class="form-control" placeholder="Password">
                <div class="input-group-append">
                    <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                    </div>
                </div>
            </div>
            <div class="row">
            
            <div class="col-12">
                <a href="forgot-password.html" class="forgot_pass mb-4"><i class="fa fa-lock m-r-5"></i> Forgot your password?</a>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
            </div>
            <!-- /.col -->
            </div>
        </form>

        <div class="social-auth-links text-center mt-4 mb-3">
            <a href="#" class="btn btn-block btn-danger">
                <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
            </a>
        </div>
        <!-- /.social-auth-links -->

        <p class="mb-0 text-secondary">
            Don't have an account? <a href="register.html" class="text-primary fw-bold">Sign Up</a>
        </p>
        </div>
        <!-- /.card-body -->
    </div>
</template>
<style lang="scss">
.fw-bold {
    font-weight: bold;
}
.card_div {
    box-shadow: none;
    margin-top: 50%;
    border: 0;
    width: 100%;
}
.card_div .card-header {
    border: 0;
}
.forgot_pass {
    float: right;
    color: #969494;
}
.forgot_pass:hover {
    cursor: pointer;
    color: #3b3a3a;
}
.fa-lock {
    margin-right: 5px;
    font-family: Rubik,sans-serif;
}


@media only screen and (min-width:768px){ 
    .card_div {
        width: 120%;
    }
}
@media only screen and (min-width:1000px){ 
    .card_div {
        width: 120%;
    }
}
</style>