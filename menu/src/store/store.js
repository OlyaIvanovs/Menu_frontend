import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        categories: [],
        recipes: [],
        existedCategory: false,
        addedCategory: false,
        addedRecipe: false
    },
    getters,
    actions,
    mutations
  });
