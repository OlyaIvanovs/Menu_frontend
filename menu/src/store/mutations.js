import * as types from './mutation-types'

function getId(arr) {
    var id = arr.slice(-1)[0].id + 1
    return id
}

const mutations = {
    [types.RECEIVE_CATEGORIES](state, { categories }) {
        state.categories = categories
    },

    [types.RECEIVE_RECIPES](state, { recipes }) {
        state.recipes = recipes
    },

    [types.ADD_CATEGORY](state, category) {
        state.categories.push({
            id: getId(state.categories),
            name: category
        })
        state.addedCategory = true
        setTimeout(()=> {
            state.addedCategory = false
          }, 1500);
    },

    [types.EXISTED_CATEGORY](state, status) {
        state.existedCategory = status
        if (state.existedCategory) {
            setTimeout(()=> {
                state.existedCategory = false
              }, 1500);
        }
    },

    [types.ADDED_CATEGORY](state, status) {
        state.addedCategory = status
    },

    [types.ADD_RECIPE](state, recipe) {
        state.recipes.push({
            id: getId(state.recipes),
            title: recipe.title,
            method: recipe.method,
            category: recipe.category,
            ingredients: recipe.ingredients
        })
        state.addedRecipe = true
    },
}

export default mutations