import { Pipe, PipeTransform } from '@angular/core';
import { Recipe } from './model/recipe.model';

@Pipe({
  name: 'recipeSearch',
})
export class RecipeSearchPipe implements PipeTransform {
  transform(recipes: Recipe[], searchString: string | null): Recipe[] {
    if (!searchString || searchString.length === 0) return recipes;

    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchString.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.name.toLowerCase().includes(searchString.toLowerCase())
        )
    );
  }
}
