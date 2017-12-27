import * as types from './mutation-types'

const mutations = {
    [types.RECEIVE_CATEGORIES](state, { categories }) {
        state.categories = categories
    },

    [types.RECEIVE_RECIPES](state, { recipes }) {
        state.recipes = recipes
    },
}

export default mutations