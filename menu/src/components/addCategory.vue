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
        <input type="text" placeholder="New category" class="input" v-model='category'>
      </div>
      <button type="submit" class="button is-info" v-on:click.prevent="post">Add</button>
      <div>{{ category }}</div>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      categories: [],
      category: ''
    }
  },
  methods: {
    post: function() {
      this.$http.post("http://localhost:8000/api/addcategory", {
        name: this.category
      }).then(function(data){
        this.$http.get('http://127.0.0.1:8000/api/categorieslist').then(function(data) {
            this.categories = data.body;
        })
        this.category = '';
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
