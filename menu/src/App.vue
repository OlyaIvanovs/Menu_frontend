<template>
  <div id="app">
    <app-header></app-header>
    <app-recipeslist></app-recipeslist>
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
import header from './components/Header.vue'
import footer from './components/Footer.vue'
import recipesList from './components/recipesList.vue'

export default {
  name: 'app',
  components: {
    'app-header': header,
    'app-footer': footer,
    'app-recipeslist': recipesList
  },
  data() {
    return {
      title: "Create your menu book!"
    }
  }
}
</script>

<style>

</style>