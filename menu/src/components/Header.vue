<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand title">
        <br>Menu
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item is-hoverable">
            <router-link :to="{name: 'list'}" exact>All recipes</router-link>
          </div>
          <div class="navbar-item is-hoverable">
            <router-link :to="{name: 'add'}" exact>Add a new recipe</router-link>
          </div>
          <div class="navbar-item is-hoverable">
            <router-link :to="{name: 'add_category'}" exact>Add a new category</router-link>
          </div>
<!--           <div class="navbar-item is-hoverable">
            <a class="">Shopping list</a>
          </div>
          <div class="navbar-item is-hoverable">
            <a class="">Week menu</a>
          </div> -->
        </div>
      </div>
    </nav>
</template>

<script>


export default {
  data () {
    return {
  
    }
  },
  methods: {
    
  },
}
</script>

<style>
.navbar-brand {
  color: #209cee;
}
.navbar-item a {
  padding: 5px;
  border-radius: 10px;
}
/*.router-link-active {
  background: #209cee;
  color: #fff;
}
.router-link-active:hover {
  color: #fff;
}*/
</style>
