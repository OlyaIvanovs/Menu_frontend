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
    },

/*     [types.EXISTED_CATEGORY](state, status) {
        state.existedCategory = status
    }, */
}

export default mutations