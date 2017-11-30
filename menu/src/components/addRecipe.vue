<template>
  <div style="width: 60%;">
    <h2 class="title is-4">Add a new recipe</h2>
    <form>
      <div class="field">
        <input type="text" placeholder="Title" class="input" v-model="recipe.title">
      </div>
      <div class="field">
        <textarea class="textarea is-info" rows='10' type="text" placeholder="Method" v-model="recipe.method"></textarea>
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
        <button type="submit" class="button is-info" v-on:click.prevent="post">Add a recipe</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      categories: [],
      recipe: {
        title: '',
        method: '',
        category: ''
      },
      selectedCategory: '',
      addedNewCategory: false
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
          existed_category = true;
        }
      }

      if (!existed_category) {
        this.$http.post("http://localhost:8000/api/addcategory", {
          name: this.selectedCategory
        }).then(function(data){
          this.addedNewCategory = true;
          this.$http.get('http://127.0.0.1:8000/api/categorieslist').then(function(data) {
              this.categories = data.body;
              this.recipe.category = this.categories[categories_num].id;
          })
        });
      }
    },
    closeNotification: function() {
      this.addedNewCategory = false;
    },
    post: function() {
      this.$http.post('http://localhost:8000/api/addrecipe', {
        title: this.recipe.title,
        method: this.recipe.method,
        category: this.recipe.category
      }).then(function(data) {
        this.$router.push({ name: 'list'})
      });
    }
  },
  created() {
    this.$http.get('http://127.0.0.1:8000/api/categorieslist').then(function(data) {
        this.categories = data.body;
    })
  }
}
</script>

<style>

</style>
