import axios from 'axios'
import * as urls from '../api/urls'
import * as types from './mutation-types'

/* const actions = {
    getCategories({ commit }) {
        api.getCategories((categories) => {
            commit(types.RECEIVE_CATEGORIES,  { categories })
        })
    },

    getRecipes({ commit }) {
        api.getRecipes((recipes) => {
            commit(types.RECEIVE_RECIPES,  { recipes })
        })
    }
}
 */

const actions = {
    getCategories({ commit }) {
        axios.get(urls.URL_RECEIVE_CATEGORIES).then(response => response.data)
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
}

export default actions
