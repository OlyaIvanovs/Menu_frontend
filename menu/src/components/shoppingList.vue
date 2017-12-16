<template>
    <div>
        <h1 class="title is-4">Shopping list</h1>
        <div class="columns">
            <div class="column is-three-fifths">
                <form>
                    <div class="field">
                        <input placeholder="Week's name or number" class="input" type="text" list="weeksList" v-model="weekName">
                        <datalist id="weeksList">
                            <option v-for="week in weeks">{{ week.name }}</option>
                        </datalist>
                    </div> 

                    <div class="notification is-warning" v-if="existedWeek">
                        <button class="delete"></button>
                        The week: <b>{{ weekName }}</b> will be added.
                    </div>
                </form>
                <br>
                <h3 class="title is-4">Recipes of this week</h3>
                <ol class="recipes_list">
                    <li>shopping</li>
                    <li>shopping</li>
                    <li>shopping</li>
                    <li>shopping</li>
                </ol>
            </div>
            <div class="column">
                <h3 class="title is-4">Things to buy:</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      week_name: ''
    }
  },
  computed: {

  },
  created() {

  }
}
</script>

<style>

</style>
