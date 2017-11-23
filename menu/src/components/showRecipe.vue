<template>
    <h2>{{ recipe.title }}</h2>
    <div><b>Ingredients:</b>
        <ul>
            <li v-for="ingredient in recipe.ingredients">
                {{ ingredient.name }} {{ ingredient.amount }} {{ ingredient.unit }}
            </li>
        </ul>
    </div>
    <div><b>Method:</b>{{ recipe.method }}</div>
    <div><b>Category:</b>{{ recipe.category }}</div>
</template>


<ul class="people_list">
            <li class="people_list_item" v-for="person in people" v-on:click="person.show=!person.show">
                <h2>{{ person.name }}</h2>
                <h3 v-show="person.show">{{ person.age }}</h3>
            </li>
        </ul>

<script>

export default {
  data() {
    return {
      copyright: "Copyright 2017",
      recipe: {}
    }
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/recipe/' + ).then(function(data) {
        this.recipe = data.body;
    })
  }
}
</script>

<style>

</style>
