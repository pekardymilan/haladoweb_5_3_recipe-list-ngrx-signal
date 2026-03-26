import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FieldArrayType, FormlyField } from '@ngx-formly/core';

@Component({
  selector: 'array-form-item',
  template: `
    <mat-card class="repeat-section" appearance="outlined">
      @if (props.label || props.description) {
      <mat-card-header>
        @if (props.label) {
        <mat-card-title>{{ props.label }}</mat-card-title>
        } @if (props.description) {
        <mat-card-subtitle>{{ props.description }}</mat-card-subtitle>
        }
      </mat-card-header>
      }

      <mat-card-content>
        @for (field of field.fieldGroup; track field.key; let i = $index) {
        <div class="repeat-item">
          <formly-field [field]="field"></formly-field>

          <div class="remove-button">
            <button
              matIconButton
              color="warn"
              type="button"
              (click)="remove(i)"
              aria-label="Remove item"
            >
              <mat-icon>remove_circle_outline</mat-icon>
            </button>
          </div>

          @if (i < (field.fieldGroup?.length ?? 0) - 1) {
          <mat-divider></mat-divider>
          }
        </div>
        }

        <div class="add-button">
          <button matButton="outlined" color="primary" type="button" (click)="add()">
            <mat-icon>add</mat-icon>
            {{ props['addText'] || 'Add Item' }}
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .repeat-item {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }

      .remove-button {
        margin-left: 8px;
      }

      .add-button {
        margin-top: 24px;
        display: flex;
        justify-content: flex-start;
      }
    `,
  ],
  imports: [FormlyField, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule],
})
export class ArrayFormItemComponent extends FieldArrayType {}
