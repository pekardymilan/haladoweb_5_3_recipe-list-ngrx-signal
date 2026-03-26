import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Recipe, UnitOfMeasurement } from '../../model/recipe.model';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { CanLeaveComponent } from '../../guards/recipe-edit-guard';
import { RecipeStore } from '../../store/recipe.store';

@Component({
  selector: 'app-create-recipe',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormlyForm,
  ],
  templateUrl: './create-recipe.html',
  styleUrl: './create-recipe.css',
})
export class CreateRecipe implements CanLeaveComponent {
  readonly router = inject(Router);
  readonly recipeStore = inject(RecipeStore);

  recipeForm = new UntypedFormGroup({});
  recipeFormOptions: FormlyFormOptions = {};
  recipeFormFields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Name',
        required: true,
      },
    },
    {
      key: 'recipeCode',
      type: 'input',
      props: {
        label: 'Recipe code',
        required: true,
      },
      validators: {
        recipeCode: {
          expression: (control: FormControl) =>
            control.value?.length === 9 && new RegExp(/^[A-Z]{4}_\d{4}$/).test(control.value),
          message: 'Invalid recipe code format!',
        },
      },
    },
    {
      key: 'description',
      type: 'textarea',
      props: {
        label: 'Description',
        required: true,
      },
    },
    {
      key: 'totalIngredients',
      type: 'input',
      props: {
        readonly: true,
        label: 'Total ingredients',
      },
      expressionProperties: {
        'model.totalIngredients': (model) =>
          Array.isArray(model.ingredients) ? model.ingredients.length : 0,
      },
    },
    {
      key: 'ingredients',
      type: 'array',
      props: {
        addText: 'Add ingredient',
        label: 'Ingredients',
        required: true,
        minLength: 1,
      },
      fieldArray: {
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            props: {
              label: 'Name',
              required: true,
            },
          },
          {
            key: 'quantity',
            type: 'input',
            props: {
              label: 'Quantity',
              required: true,
              type: 'number',
            },
          },
          {
            key: 'unitOfMeasurement',
            type: 'select',
            props: {
              label: 'Unit of measurement',
              required: true,
              options: Object.values(UnitOfMeasurement).map((unitOfMeasurement) => ({
                label: unitOfMeasurement,
                value: unitOfMeasurement,
              })),
            },
          },
        ],
      },
    },
  ];

  isSubmitting = signal(false);

  canDeactivate = () => {
    if (this.recipeForm.dirty && !this.isSubmitting()) {
      return confirm('You have unsaved changes do you want to leave?');
    }
    return true;
  };

  onCancel() {
    this.router.navigateByUrl('recipes');
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.isSubmitting.set(true);
      const recipe: Recipe = this.recipeForm.value;
      this.recipeStore.createRecipe(recipe);
    } else {
      alert('Form is invalid!');
    }
  }
}
