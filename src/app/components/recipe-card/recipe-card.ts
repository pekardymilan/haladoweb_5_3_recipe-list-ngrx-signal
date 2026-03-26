import { Component, input, output } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectCard } from '../../directives/select-card';

@Component({
  selector: 'app-recipe-card',
  imports: [MatCardModule, MatChipsModule, MatButtonModule, MatCheckboxModule, SelectCard],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  readonly recipe = input.required<Recipe>();
  readonly isChecked = input.required<boolean>();

  selectAction = output<number>();

  onSelect() {
    if (!this.recipe().id) return;
    this.selectAction.emit(this.recipe().id!);
  }
}
