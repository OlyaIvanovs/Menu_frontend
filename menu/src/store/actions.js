import api from '../api'
import * as types from './mutation-types'

export const getCategories = ({ commit }) => {
    api.getCategories((categories) => {
        commit(types.RECEIVE_CATEGORIES,  { categories })
    })
}