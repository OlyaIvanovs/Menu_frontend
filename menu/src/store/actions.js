import axios from 'axios'
import * as urls from '../api/urls'
import * as types from './mutation-types'

const actions = {
    getCategories({ commit }) {
        axios.get(urls.URL_ALL_CATEGORIES).then(response => response.data)
        .then(categories => {
          commit(types.RECEIVE_CATEGORIES, { categories })
        })
    },

    getRecipes({ commit }) {
        axios.get(urls.URL_RECEIVE_RECIPES).then(response => response.data)
        .then(recipes => {
          commit(types.RECEIVE_RECIPES, { recipes })
        })
    },

    addCategory ({ commit, state }, category) {
        const record = state.categories
        .find(cat => cat.name.toLowerCase() === category.toLowerCase())
        if (!record) {
            axios.post(urls.URL_ALL_CATEGORIES, { name: category }).then(_ => {
                commit(types.ADD_CATEGORY, category)
            })
        } else {
            commit(types.EXISTED_CATEGORY, true)
        }
    },

    addRecipe({ commit, state }, recipe) {
        axios.post(urls.URL_ALL_RECIPES, recipe).then(_ => {
            commit(types.ADD_RECIPE, recipe)
        })
    }
}

export default actions
