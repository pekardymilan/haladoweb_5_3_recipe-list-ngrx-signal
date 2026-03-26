export interface Recipe {
  id?: number;
  name: string;
  description: string;
  recipeCode: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: number;
  unitOfMeasurement: UnitOfMeasurement;
}

export enum UnitOfMeasurement {
  ml = 'ml',
  g = 'g',
  kg = 'kg',
  l = 'l',
  piece = 'piece',
  dkg = 'dkg',
  tableSpoon = 'tableSpoon',
}
