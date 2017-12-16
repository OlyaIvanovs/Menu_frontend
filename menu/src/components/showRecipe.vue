<template>
  <div>
    <h2 class="title is-4">{{ recipe.title }}
      <p class="tag is-info">{{ recipe.category }}</p>
    </h2>
    <div class="columns">
      <div class="column is-one-quarter">
        <b>Ingredients:</b>
        <ul>
            <li v-for="ingredient in recipe.ingredients">
                {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }} 
            </li>
        </ul>
      </div>
      <div class="column">
        <p><b>Method: </b>{{ recipe.method }}</p>
        <br>
        <router-link class="button is-info" :to="{name: 'shopping_list'}" exact>Add to shopping list</router-link>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      id: this.$route.params.id,
      recipe: {}
    }
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/recipes/' + this.id).then(function(data) {
        this.recipe = data.body;
    })
  }
}
</script>

<style>

</style>
