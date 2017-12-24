<template>
    <div>
        <h1 class="title is-4">Shopping list</h1>
        <div v-if="addingRecipeMsg" class="notification is-success">
            <button v-on:click="addingRecipeMsg=false;" class="delete"></button>
            <strong>Recipe was added</strong>
        </div>
        <div v-if="removingRecipeMsg" class="notification is-danger">
            <button v-on:click="removingRecipeMsg=false;" class="delete"></button>
            <strong>Recipe was removed</strong>
        </div>
        <div class="columns">
            <div class="column is-three-fifths">
                <form>
                    <div class="field">
                        <input v-model="week.name" v-on:input="onChange" placeholder="Week's name or number" class="input" type="text" list="weekList">
                        <datalist id="weekList">
                            <option :data-week="week.id" v-for="week in weeks">{{ week.name }}</option>
                        </datalist>
                    </div>
                </form>
                <br><br>
                <template v-if="week.name">
                    <h3 class="title is-4">Recipes of  {{ week.name }} week</h3>
                    <ol class="recipes_list">
                        <li class="recipes_list_item" v-for="recipe in week.recipes">
                            <router-link :to="{ name: 'single_recipe', params: { id: recipe.id }}">{{ recipe.title }}</router-link>
                            <span class="tag is-info">{{ recipe.category }}</span>
                            <a title="Remove" v-on:click="removeRecipe(recipe.id )" class="icon has-text-danger">
                                <i class="fa fa-ban"></i>
                            </a>
                        </li>
                    </ol>
                    <br><br>
                    <a v-if="addingRecipe" class="button is-info" v-on:click="addingRecipe = false;">
                        Add a recipe
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
                <template v-if="week.name">
                <h3 class="title is-4">Things to buy:</h3>
                <ul class="recipes_list">
                    <ul>
                        <li v-for="ingredient in ingredients">
                            {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }} 
                        </li>
                    </ul>
                </ul>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      ingredients: [],
      weeks: [],
      recipes: [],
      week: {
          "id": null,
          "name": '',
          "recipes": []
      },
      addingRecipe: true,
      addingRecipeMsg: false,
      removingRecipeMsg: false,
      selectedRecipeId: null
    }
  },
  beforeRouteEnter: (to, from, next) => {
      next(vm => {
        vm.$http.get('http://127.0.0.1:8000/api/weeks/').then(data => {
            vm.weeks = data.body;
        })
        vm.$http.get('http://127.0.0.1:8000/api/recipes/').then(data => {
            vm.recipes = data.body;
        })
      })
  },
  methods: {
      selectRecipe: function() {
          var obj = event.target;
          this.selectedRecipeId = obj.options[obj.selectedIndex].getAttribute('data-recipeid');
      },
      removeRecipe: function(selectedRecipeId) {
          this.$http.put('http://127.0.0.1:8000/api/recipes/' + selectedRecipeId  + '/removeweek/' , 
        {"week": this.week.id}).then(function() {
            this.$http.get('http://127.0.0.1:8000/api/recipes/?week=' + this.week.id).then(function(data) {
                var vm = this;
                this.week.recipes = data.body;
                this.addingRecipe = true;;
                this.removingRecipeMsg = true;
                setTimeout(function(){ vm.removingRecipeMsg = false; }, 3000);
            })
        })
      },
      post: function() {
        this.$http.put('http://127.0.0.1:8000/api/recipes/' + this.selectedRecipeId  + '/' , 
        {"week": this.week.id}).then(function() {
            this.$http.get('http://127.0.0.1:8000/api/recipes/?week=' + this.week.id).then(function(data) {
                var vm = this;
                this.week.recipes = data.body;
                this.addingRecipe = true;
                this.addingRecipeMsg = true;
                setTimeout(function(){ vm.addingRecipeMsg = false; }, 3000);
            })
        })
      },
      onChange: function() {
        var selected_week = this.week.name.toLowerCase();
        var existed_week = false;
        var weeks_num = this.weeks.length;

        for (var i = 0; i < weeks_num; i++) {
            if (this.weeks[i].name.toLowerCase() == selected_week) {
                this.week.id = this.weeks[i].id;
                existed_week = true;
                this.$http.get('http://127.0.0.1:8000/api/recipes/?week=' + this.week.id).then(function(data) {
                    this.week.recipes = data.body;
                    this.ingredients = [];
                    for (let i = 0; i < this.week.recipes.length; i++) { 
                        let recipeIngredients = this.week.recipes[i].ingredients;
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
  }
}
</script>

<style>
.recipes_list {
    
}
</style>






