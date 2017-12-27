<template>
    <div>
        <h1 class="title is-5">All recipes</h1>
        <ol class="recipes_list">
            <li v-for="category in categories">
                {{ category.name }}
            </li>
        </ol>
        <input type="text" v-model="search" placeholder="Search recipe" class="input">
        <ol class="recipes_list">
            <li class="recipes_list_item" v-for="recipe in filteredRecipes">
                <router-link :to="{ name: 'single_recipe', params: { id: recipe.id }}">{{ recipe.title }}</router-link>
                <span class="tag is-info">{{ recipe.category }}</span>
            </li>
        </ol>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      copyright: "Copyright 2017",
      search: ''
    }
  },
  computed: {
      // map `this.categories` to `store.getters.categories`
    ...mapGetters(['categories', 'recipes']),
    filteredRecipes: function() {
        return this.recipes.filter((recipe) => {
            return recipe.title.match(this.search);
        })
    }
  },
  created() {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getRecipes')
  }
}
</script>

<style>
.recipes_list {
    margin: 40px 0;
}
</style>
