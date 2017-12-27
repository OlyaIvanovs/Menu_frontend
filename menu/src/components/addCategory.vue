<template>
  <div>
    <h2 class="title is-4">List of all categories</h2>
    <ul>
      <li v-for="category in categories">{{ category.name }}</li>
    </ul>
    <br>
    <h2 class="title is-4">Add a new category</h2>
    <form>
      <div class="field">
        <input type="text" placeholder="New category" class="input" v-model="category" @focus="existedCategory = false">
      </div>
      <div class="notification is-warning" v-if="existedCategory">
        <button class="delete"></button>
        The category: <b>{{ category }}</b> is existed already.
      </div>
      <button type="submit" class="button is-info" v-on:click.prevent="post">Add</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      categories: [],
      category: null,
      existedCategory: false,
      message: ''
    }
  },
  methods: {
    post: function() {
      var selected_category = this.category.toLowerCase();
      var existed_category = this.categories.some(category => category.name.toLowerCase() == selected_category);

      if (!existed_category) {
        this.$http.post("http://localhost:8000/api/categories/", {
          name: this.category
        }).then(function(data){
          this.$http.get('http://127.0.0.1:8000/api/categories/').then(function(data) {
              this.categories = data.body;
          })
          this.category = '';
        });
      } else {
        this.existedCategory = true;
      }
    }
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