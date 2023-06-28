<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const regID = route.params.id;
const country = route.params.country;

const print = () => {
  const printableContent = document.getElementById("printable-content");
  const printWindow = window.open("", "", "height=1000,width=1000");
  printWindow.document.write(printableContent.innerHTML);
  printWindow.print();
};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="navbar-brand">
      <button @click="print()" class="btn btn-outline-secondary btn-lg">
        Print <i class="fas fa-print pl-2"></i>
      </button>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            :to="'/application/confirmation/' + country + '/' + regID"
            class="nav-link"
          >
            <i class="fas fa-file-pdf pr-2"></i> Confirmation
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="'/application/show/' + country + '/' + regID"
            class="nav-link"
          >
            <i class="fas fa-user pr-2"></i> Personal Information
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="'/application/edit/' + country + '/' + regID"
            class="nav-link"
          >
            <i class="fas fa-user-edit pr-2"></i> Edit Information
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style lang="scss">
.navbar-nav ul li {
  font-size: 20px;
}
</style>
