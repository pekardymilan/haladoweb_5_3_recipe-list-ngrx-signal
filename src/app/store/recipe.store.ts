import { computed, inject } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { RecipeService } from '../services/recipe.service';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { forkJoin, pipe, switchMap } from 'rxjs';
import { Router } from '@angular/router';

//using ngrx store we worked with state observables transformed to signals in the component code
//with ngrx signals we store state in signals, this way we can enjoy all of the convenient features angular offers for signals

interface RecipeState {
  recipes: Recipe[];
  selectedRecipes: number[];
}

const initialState: RecipeState = {
  recipes: [],
  selectedRecipes: [],
};

//we create a signal store with the signalStore method, it can be injected like a class, plus we need to declare the initial state of it
export const RecipeStore = signalStore(
  { providedIn: 'root' },
  withDevtools('recipe'),
  withState(initialState),
  //we can also define computed fields, which returns the state transformed in our own way
  withComputed(({ selectedRecipes }) => ({
    selectedRecipesCount: computed(() => selectedRecipes().length),
  })),
  //we can also define methods, which will mutate the immutable state of our store using patchState method
  withMethods((store, recipeService = inject(RecipeService), router = inject(Router)) => {
    //to work async logic such as API calls we use rxMethod()
    const loadRecipes = rxMethod<void>(
      pipe(
        switchMap(() =>
          recipeService.getRecipes().pipe(
            tapResponse({
              next: (recipes) => {
                //after we get the response from the API we can just patch it to the state
                patchState(store, { recipes });
              },
              error: () => {
                console.error('Error while loading recipes');
              },
            })
          )
        )
      )
    );

    const createRecipe = rxMethod<Recipe>(
      pipe(
        switchMap((recipe) =>
          recipeService.createRecipe(recipe).pipe(
            tapResponse({
              next: () => {
                router.navigateByUrl('recipes');
                loadRecipes();
              },
              error: () => {
                console.error('Error while creating the recipe!');
              },
            })
          )
        )
      )
    );

    const deleteRecipes = rxMethod<void>(
      pipe(
        switchMap(() =>
          forkJoin(
            store.selectedRecipes().map((recipeId) => recipeService.deleteRecipe(recipeId))
          ).pipe(
            tapResponse({
              next: () => {
                patchState(store, { selectedRecipes: [] });
                loadRecipes();
              },
              error: () => {
                console.error('Error while deleting the recipe!');
              },
            })
          )
        )
      )
    );

    const selectRecipe = (recipeId: number) => {
      if (store.selectedRecipes().includes(recipeId)) {
        patchState(store, (state) => ({
          ...state,
          selectedRecipes: state.selectedRecipes.filter((id) => id !== recipeId),
        }));
      } else {
        patchState(store, (state) => ({
          ...state,
          selectedRecipes: [...state.selectedRecipes, recipeId],
        }));
      }
    };

    return {
      loadRecipes,
      createRecipe,
      deleteRecipes,
      selectRecipe,
    };
  })
);
