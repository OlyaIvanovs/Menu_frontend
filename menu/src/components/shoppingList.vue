<template>
    <div>
        <h1 class="title is-4">Shopping list</h1>
        <div class="columns">
            <div class="column is-three-fifths">
                <form>
                    <div class="field">
                        <input v-model="selectedWeek" v-on:input="onChange" placeholder="Week's name or number" class="input" type="text" list="weekList">
                        <datalist id="weekList">
                            <option :data-week="week.id" v-for="week in weeks">{{ week.name }}</option>
                        </datalist>
                    </div>
                </form>
                <br><br>
                <template v-if="selectedWeek">
                    <h3 class="title is-4">Recipes of  {{ selectedWeek }} week</h3>
                    <ol class="recipes_list">
                        <li class="recipes_list_item" v-for="recipe in weekRecipes">
                            <router-link :to="{ name: 'single_recipe', params: { id: recipe.id }}">{{ recipe.title }}</router-link>
                            <span class="tag is-info">{{ recipe.category }}</span>
                        </li>
                    </ol>
                    <br><br>
                    <a v-if="addingRecipe" class="button is-info" v-on:click="addRecipe">
                        Add a recipe for {{ selectedWeek }} week
                    </a>
                    <form v-else="addingRecipe">
                        <div class="select" style="display: inline-block; width: 80%;">
                            <select v-on:change="selectRecipe">
                                <option v-for="recipe in recipes" v-bind:data-recipeid="recipe.id">
                                    {{ recipe.title }}
                                </option>
                            </select>
                        </div>
                        <button style="display: inline-block;" class="button is-info" title="Add" v-on:click.prevent="post">
                            <span class="icon is-large">
                                <i class="fa fa-check-square"></i>
                            </span>
                        </button>
                    </form>
                </template>
            </div>
            <div class="column">
                <h3 class="title is-4">Things to buy:</h3>
                <ul class="recipes_list">
                    <ul>
                        <li v-for="ingredient in ingredients">
                            {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }} 
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      weekName: '',
      weekRecipes: [],
      ingredients: [],
      weeks: [],
      selectedWeek: '',
      recipes: [],
      addingRecipe: true,
      a: '',
      selectedRecipeId: '',
      weekId: ''
    }
  },
  methods: {
      selectRecipe: function() {
          var obj = event.target;
          this.selectedRecipeId = obj.options[obj.selectedIndex].getAttribute('data-recipeid');
      },
      addRecipe: function() {
            this.$http.get('http://127.0.0.1:8000/api/recipes/').then(function(data) {
                this.recipes = data.body;
                this.addingRecipe = false;
            })
      },
      post: function() {
        this.$http.put('http://127.0.0.1:8000/api/recipes/' + this.selectedRecipeId  + '/' , 
        {"week": this.weekId}).then(function() {
            this.$http.get('http://127.0.0.1:8000/api/recipes/?week=' + this.weekId).then(function(data) {
                this.weekRecipes = data.body;
            })
        })
      },
      onChange: function() {
        var selected_week = this.selectedWeek.toLowerCase();
        var existed_week = false;
        var weeks_num = this.weeks.length;

        for (var i = 0; i < weeks_num; i++) {
            if (this.weeks[i].name.toLowerCase() == selected_week) {
                this.weekId = this.weeks[i].id;
                existed_week = true;
                this.$http.get('http://127.0.0.1:8000/api/recipes/?week=' + this.weekId).then(function(data) {
                    this.weekRecipes = data.body;
                    this.ingredients = [];
                    for (let i = 0; i < this.weekRecipes.length; i++) { 
                        let recipeIngredients = this.weekRecipes[i].ingredients;
                        for (let k = 0; k < recipeIngredients.length; k++) {
                            if (this.ingredients.some(ingredient => ingredient.name == recipeIngredients[k].name)) {
                                for (let n = 0; n < this.ingredients.length; n++) {
                                    if (this.ingredients[n].unit && (this.ingredients[n].unit == recipeIngredients[k].unit)) {
                                        this.ingredients[n].amount = this.ingredients[n].amount/1 + recipeIngredients[k].amount/1;
                                    }
                                }                 
                            } else {
                                recipeIngredients[k].amount = recipeIngredients[k].amount/1;
                                this.ingredients.push(recipeIngredients[k]); 
                            }
                        }        
                    }
                })
            }
        };
      }
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/weeks/').then(function(data) {
        this.weeks = data.body;
    })
  }
}
</script>

<style>
.recipes_list {
    
}
</style>






