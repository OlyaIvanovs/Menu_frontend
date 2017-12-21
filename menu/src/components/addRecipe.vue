<template>
  <div class="columns">
    <div class="column">
      <h2 class="title is-4">Add a new recipe</h2>
      <form>
        <div class="field">
          <input type="text" placeholder="Title" class="input" v-model.lazy="recipe.title">
        </div>
        <div class="field">
          <input placeholder="Category" class="input" type="text" list="categoryList" v-on:change="onChange" v-model="selectedCategory">
          <datalist id="categoryList">
            <option v-for="category in categories">{{ category.name }}</option>
          </datalist>
        </div>  
        <div class="notification is-info" v-if="addedNewCategory">
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
          <button type="submit" class="button is-info" v-on:click.prevent="post">Add a recipe</button>
        </div>
      </form>
    </div>
    <div class="column">
      <h2 class="title is-4">
        {{ recipe.title }}
        <span class="tag is-info" v-if="recipe.category">{{ recipe.category_name }}</span>
      </h2>
      <div class="columns">
        <div class="column" v-if="ingredients_text">
          <h3 class="title is-5">Ingredients:</h3>
          <template v-if="ingredients">
            <ul>
              <li v-for="ingredient in ingredients">
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
let marked = require('marked');

export default {
  data() {
    return {
      categories: [],
      recipe: {
        title: '',
        method: '',
        category: '',
        category_name: ''
      },
      selectedCategory: '',
      addedNewCategory: false,
      ingredients_text: '',
      ingredients_string: '',
      ingredients: []
    }
  },
  methods: {
    onChange: function() {
      var selected_category = this.selectedCategory.toLowerCase();
      var existed_category = false;
      var categories_num = this.categories.length;
      // var existed_category = this.categories.some(category => category.name.toLowerCase() == selected_category);

      for (var i = 0; i < categories_num; i++) {
        if (this.categories[i].name.toLowerCase() == selected_category) {
          this.recipe.category = this.categories[i].id;
          this.recipe.category_name = this.categories[i].name;
          existed_category = true;
        }
      }

      if (!existed_category) {
        this.$http.post("http://localhost:8000/api/categories/", {
          name: this.selectedCategory
        }).then(function(data){
          this.addedNewCategory = true;
          this.$http.get('http://127.0.0.1:8000/api/categories/').then(function(data) {
              this.categories = data.body;
              this.recipe.category = this.categories[categories_num].id;
              this.recipe.category_name = this.categories[categories_num].name;
          })
        });
      }
    },
    closeNotification: function() {
      this.addedNewCategory = false;
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
      this.ingredients = ingredients;
    },
    post: function() {
      this.$http.post('http://localhost:8000/api/recipes/', {
        title: this.recipe.title,
        method: this.recipe.method,
        category: this.recipe.category,
        ingredients: this.ingredients
      }).then(function(data) {
        this.$router.push({ name: 'list'})
      });
      console.log(JSON.stringify({
        title: this.recipe.title,
        method: this.recipe.method,
        category: this.recipe.category,
        ingredients: this.ingredients
      }))
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
    }
  },
  computed: {
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/categories/').then(function(data) {
        this.categories = data.body;
    })
  }
}
</script>

<style>

</style>
