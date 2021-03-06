import * as urls from './urls'
import axios from 'axios'

function getData(fun, url) {
  fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(data) {
        fun(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}


export default {
  getCategories (fun) {
    getData(fun, urls.URL_RECEIVE_CATEGORIES)
  },

  getRecipes (fun) {
    getData(fun, urls.URL_RECEIVE_RECIPES)
  },
}
