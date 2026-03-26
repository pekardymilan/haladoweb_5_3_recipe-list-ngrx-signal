import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCard } from '../recipe-card/recipe-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeSearchPipe } from '../../recipe-search-pipe';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RecipeStore } from '../../store/recipe.store';

@Component({
  selector: 'app-recipe-list',
  imports: [
    CommonModule,
    RecipeCard,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RecipeSearchPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  //we don't need any observables or config, we just inject our store and use it's state properties or methods
  readonly recipeStore = inject(RecipeStore);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.recipeStore.loadRecipes();
  }

  searchControl = this.formBuilder.control<string>('');

  get searchString() {
    return this.searchControl.value;
  }

  onCreate() {
    this.router.navigateByUrl('/recipes/create');
  }

  onSelect(recipeId: number) {
    this.recipeStore.selectRecipe(recipeId);
  }

  onDeleteMany() {
    this.recipeStore.deleteRecipes();
  }
}
