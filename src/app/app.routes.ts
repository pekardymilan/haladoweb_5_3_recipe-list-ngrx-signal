import { Routes } from '@angular/router';
import { RecipeList } from './components/recipe-list/recipe-list';
import { CreateRecipe } from './components/create-recipe/create-recipe';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth-guard';
import { Login } from './components/login/login';
import { recipesGuard } from './guards/recipes-guard';
import { RecipeLayout } from './components/recipe-layout/recipe-layout';
import { recipeEditGuard } from './guards/recipe-edit-guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'recipes',
    component: RecipeLayout,
    canActivate: [authGuard],
    canActivateChild: [recipesGuard],
    children: [
      {
        path: '',
        component: RecipeList,
      },
      {
        path: 'create',
        component: CreateRecipe,
        canDeactivate: [recipeEditGuard],
      },
    ],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
