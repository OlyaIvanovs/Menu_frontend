<template>
    <div>
        <h1 class="title is-5">All recipes</h1>
        <input type="text" v-model="search" placeholder="Search recipe" class="input">
        <ol class="recipes_list">
            <li class="recipes_list_item" v-for="recipe in filteredRecipes">
                <span>{{ recipe.title }}</span>
                <span class="tag is-info">{{ recipe.category }}</span>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
  data() {
    return {
      copyright: "Copyright 2017",
      // recipes: [
      //   { title: 'Title', method: 'Method', category: 'Category', 
      //   ingredients: [{name: 'I1', amount: '1', unit: 'unit'}, {name: 'I2', amount: '2', unit: 'unit'}]}
      // ],
      recipes: [],
      search: ''
    }
  },
  computed: {
    filteredRecipes: function() {
        return this.recipes.filter((recipe) => {
            return recipe.title.match(this.search);
        })
    }
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/recipeslist').then(function(data) {
        this.recipes = data.body;
    })
  }
}
</script>

<style>
.recipes_list {
    margin: 40px 0;
}
</style>
