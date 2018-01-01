<template>
  <div>
    <h2 class="title is-4">List of all categories</h2>
    <ul>
      <li v-for="category in categories">{{ category.name }}</li>
    </ul>
    <br>
    <h2 class="title is-4">Add a new category</h2>
    <div class="notification is-warning" v-if="existedCategory">
      <button class="delete" v-on:click="closeMsgExisted"></button>
      The category <b>{{ msg_category }}</b> is existed already.
    </div>  
    <div class="notification is-success" v-if="addedCategory">
      <button v-on:click="closeMsgAdded" class="delete"></button>
      The category <b>{{ msg_category }}</b> was added succeessfully.
    </div>
    <form>
      <div class="field">
        <input type="text" placeholder="New category" class="input" v-model="category">
      </div>
      <button type="submit" class="button is-info" v-on:click.prevent="addCategory()">Add</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  data() {
    return {
      category: null,
      msg_category: null
    }
  },
  methods: {
    addCategory() {
      this.msg_category = this.category
      this.$store.dispatch('addCategory', this.category)
      this.category = null
    },
    closeMsgAdded() {
      this.$store.commit(types.ADDED_CATEGORY, false)
    },
    closeMsgExisted() {
      this.$store.commit(types.EXISTED_CATEGORY, false)
    }
  }, 
  computed: {
     // map `this.categories` to `store.getters.categories`
    ...mapGetters(['categories', 'existedCategory', 'addedCategory']),
  },
  created() {
    this.$store.dispatch('getCategories')
  }
}
</script>


<style>

</style>
