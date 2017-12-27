import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        categories: [
            { id: 1, name: "!chicken"},
            { id: 2, name: "!fish"},
            { id: 3, name: "!chips"},
            { id: 4, name: "!sweets"},
        ],
        ategories: [
            { id: 1, name: "chicken"},
            { id: 2, name: "fish"},
            { id: 3, name: "chips"},
            { id: 4, name: "sweets"},
        ]
    },
    getters,
    actions,
    mutations
  });
