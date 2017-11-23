<template>
  <div>
    <h2 class="title is-4">Add a new recipe</h2>
    <form>
      <div class="field">
        <input type="text" placeholder="Title" class="input">
      </div>
      <div class="field">
        <div class="select">
          <select>
            <option>Category</option>
            <option>With options</option>
          </select>
        </div>
      </div>
      <div class="field">
        <textarea class="textarea is-info" type="text" placeholder="Info textarea"></textarea>
      </div>
      <button type="submit" class="button is-info">Add</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      copyright: "Copyright 2017",
    }
  }
}
</script>

<style>

</style>
