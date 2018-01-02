<template>
  <div class="columns">
    <div class="column">
      <h2 class="title is-4">Add a new recipe</h2>
      <div class="notification is-success" v-if="addedRecipe">
          <button class="delete"></button>
          A new 
          <router-link :to="{ name: 'single_recipe', params: { id: recipe_id }}">recipe</router-link>
           was added.
        </div>
      <form>
        <div class="field">
          <input type="text" placeholder="Title" class="input" v-model.lazy="recipe.title">
        </div>
        <div class="field">
          <input placeholder="Category" class="input" type="text" list="categoryList" v-on:change="onChangeCategory" v-model="selectedCategory">
          <datalist id="categoryList">
            <option v-for="category in categories">{{ category.name }}</option>
          </datalist>
        </div>  
        <div class="notification is-info" v-if="addedCategory">
          <button class="delete" v-on:click="closeNotification"></button>
          A new category: <b>{{ selectedCategory }}</b> was added.
        </div>
        <div class="field">
          <textarea class="textarea is-info" rows='10' type="text" placeholder="Method" v-model.lazy="recipe.method"></textarea>
        </div>
        <div class="field">
          <textarea v-on:blur="changeIngredients" class="textarea is-info" rows='5' type="text" placeholder="Ingredients" v-model.lazy="ingredients_text"></textarea>
        </div>
        <div class="field">
          <button type="submit" class="button is-info" v-on:click.prevent="addRecipe">Add a recipe</button>
        </div>
      </form>
    </div>
    <div class="column">
      <h2 class="title is-4">
        {{ recipe.title }}
        <span class="tag is-info" v-if="selectedCategory">{{ selectedCategory }}</span>
      </h2>
      <div class="columns">
        <div class="column" v-if="ingredients_text">
          <h3 class="title is-5">Ingredients:</h3>
          <template v-if="recipe.ingredients">
            <ul>
              <li v-for="ingredient in recipe.ingredients">
                {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient. name }} {{ ingredient.add_info }}
              </li>
            </ul>
          </template>
        </div>
        <div class="column" v-if="recipe.method">
          <h3 class="title is-5">Method:</h3>
          <div  v-html='previewText(recipe.method)'>{{ recipe.method }}</div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

let marked = require('marked');

function getId(arr) {
    var id = arr.slice(-1)[0].id + 1
    return id
}

export default {
  data() {
    return {
      recipe: {
        title: '',
        method: '',
        category: null,
        ingredients: []
      },
      selectedCategory: '',
      ingredients_text: '',
      ingredients_string: '',
      recipe_id: null
    }
  },
  methods: {
    onChangeCategory: function() {
      const record = this.categories
        .find(cat => cat.name.toLowerCase() === this.selectedCategory.toLowerCase())
      
      if (typeof record !== 'undefined') {
        this.recipe.category = record.id
      } else {
        this.$store.dispatch('addCategory', this.selectedCategory)
        this.recipe.category = this.categories.slice(-1)[0].id
      }
    },

    closeNotification: function() {
      this.$store.commit(types.ADDED_CATEGORY, false)
    },

    addRecipe: function() {
      this.$store.dispatch('addRecipe', this.recipe)
      this.recipe_id = this.recipes.slice(-1)[0].id
      this.recipe = {}
      this.selectedCategory = ''
      this.ingredients_text = ''
    },

    previewText: function(text) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      });
      return marked(text);
    },

    changeIngredients: function() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      });
      var ingredients = [];
      var measures = ['g', 'teaspoon', 'cup', 'cups', 'teaspoons', 'kg'];
      this.ingredients_string = marked(this.ingredients_text);
      var ingredients_list = this.ingredients_string.replace(/(<(\/)?p>)+/g, '').split('<br>');
      for (let i=0; i<ingredients_list.length; i++) {
        var dict = {
          amount: 0,
          unit: '',
          name: '',
          add_info: ''
        };
        var all_info = ingredients_list[i].split(',');
        var info = all_info[0];
        if (typeof all_info[1] !== "undefined") {
          dict['add_info'] = all_info[1];
        }
        var numb = info.match(/\d+([\/.]\d+)?/g);
        if (numb) { dict['amount'] = numb.join(" ");}
        var words = info.replace(/\d+([\/.]\d+)?/g, '').split(' '); 
        var name = '';
        for (let k=0; k<words.length; k++) {
          if (words[k]) {
            if (measures.indexOf(words[k]) > -1) {
              dict['unit'] = words[k];
            } else {
              name += words[k] + ' ';
            }
          }
        }
        dict['name'] = name.slice(0, -1);
        ingredients.push(dict);
      }
      this.recipe.ingredients = ingredients;
    }
  },

  computed: {
     // map `this.categories` to `store.getters.categories`
    ...mapGetters(['categories', 'recipes', 'addedCategory', 'addedRecipe']),
  },
  created() {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getRecipes')
  }
}
</script>

<style>

</style>
