import recipesList from './components/recipesList.vue';
import addRecipe from './components/addRecipe.vue';
import addCategory from './components/addCategory.vue';
import showRecipe from './components/showRecipe.vue';

export default [
    {path: '/', name: 'list',component: recipesList},
    {path: '/add', name: 'add', component: addRecipe},
    {path: '/add_category', name: 'add_category', component: addCategory},
    {path: '/recipe/:id', name: 'single_recipe', component: showRecipe}
]