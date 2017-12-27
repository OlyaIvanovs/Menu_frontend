import api from '../api'
import * as types from './mutation-types'

const actions = {
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

export default actions