import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      categories: []
    },
    getters: {
      getCategories: function(state) {
        return state.categories;
    }},
    mutations: {},
    actions: {
      getCategoriesDB: function(context) {
        fetch('http://127.0.0.1:8000/api/categories/')
          .then((resp) => resp.json())
          .then(function(data) {
            console.log(data);
        })
      }
    }
  });
