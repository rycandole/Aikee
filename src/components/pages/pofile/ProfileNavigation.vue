<template>
    <div class="row col-12">
        <div class="col-10 container-fluid p-0 mt-3">
            <ul class="profile_nav_ul">
                <li><a href="#" class="w-100 h-100">Account</a></li>
                <li><a href="#" class="w-100 h-100">History</a></li>
            </ul>
        </div>
    </div>
</template>
<style lang="scss">
.profile_nav_ul {
    padding: 0;
    margin: 0;
    background: #fff;
}
.profile_nav_ul li {
    list-style: none;
    width: auto;
    height: auto;
    padding: 5px;
    text-align: center;
}
.profile_nav_ul li a {
    text-decoration: none;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    display: inline-block;
    border-bottom: 5px solid #a4d0fa;
    color: #707375;
}
.profile_nav_ul li a:hover {
    cursor: pointer;
    color: #343536;
    border-bottom: 5px solid #549ee4;
}
@media only screen and (min-width: 768px) {
    .profile_nav_ul li {

    }
}

@media only screen and (min-width: 1000px) {
    .profile_nav_ul {
        float: left;
        width: 100%;
    }
    .profile_nav_ul li {
        display: inline;
        float: left;
    }
    .profile_nav_ul li a {
        float: block;
    }
}
</style>