<script setup>
    import Vue from 'vue'
    import BlockUI from 'vue-blockui'
    import loadingImage from '../../../public/img/icons/spinner.gif'
    
    Vue.use(BlockUI)

    export default {
        name: 'app',
        data () {
            return {
            msg: 'Welcome to Your Vue.js App',
            url : loadingImage   //It is important to import the loading image then use here
            }
        }
    }

</script>

<template>
    <BlockUI :message="msg" :url="loadingImage"></BlockUI>
</template>

<style lang="scss">
.loading-container {
  .loading-backdrop {
    //the backdrop falls in here, you can override the opacity etc.
  }
  .loading {
    .loading-icon {
      //the image or inserted html will be put here
    }
    .loading-label {
      //the label showing on loading screen
    }
  }
}
</style>