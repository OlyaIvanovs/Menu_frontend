<template>
  <div>
    <h2 class="title is-4">Add a new recipe</h2>
    <form>
      <div class="field">
        <input type="text" placeholder="Title" class="input">
      </div>
      <div class="field">
        <textarea class="textarea is-info" type="text" placeholder="Info textarea"></textarea>
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
