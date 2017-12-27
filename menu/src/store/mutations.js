import * as types from './mutation-types'

const mutations = {
    [types.RECEIVE_CATEGORIES](state, { categories }) {
        state.categories = categories
    }
}

export default mutations