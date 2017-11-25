<template>
  <div style="width: 60%;">
    <h2 class="title is-4">Add a new recipe</h2>
    <form>
      <div class="field">
        <input type="text" placeholder="Title" class="input">
      </div>
      <div class="field">
        <textarea class="textarea is-info" rows='10' type="text" placeholder="Method"></textarea>
      </div>
      <div class="field">
        <div class="select">
          <select v-model="recipe.category">
            <option value="" disabled selected>Category</option>
            <option v-for="category in categories">{{ category.name }}</option>
          </select>
        </div>
      </div>  
      <router-link :to="{name: 'add_category'}" exact>
        <i class="fa fa-plus-circle" aria-hidden="true"></i> Add a new category
      </router-link>
      <br><br>
      <div class="field">
        <input class="input" type="text" list="categoryList" v-on:change="onChange" v-model="selectedCategory">
        <datalist id="categoryList">
          <option v-for="category in categories">{{ category.name }}</option>
        </datalist>
      </div>  
      <div class="notification is-info" v-if="addedNewCategory">
        <button class="delete"></button>
        A new category: <b>{{ selectedCategory }}</b> was added.
      </div>
      <div class="field">
        <button type="submit" class="button is-info">Add a recipe</button>
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
      console.log(this.selectedCategory);
      this.$http.post("http://localhost:8000/api/addcategory", {
        name: this.selectedCategory
      }).then(function(data){
        this.addedNewCategory = true;
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
