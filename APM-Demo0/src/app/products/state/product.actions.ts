import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle product code');
export const setCurrentProduct = createAction(
  '[Product] Set current product',
  props<{ product: Product }>()
);
export const clearCurrentProduct = createAction(
  '[Product] Clear current product'
);
export const initializeCurrentProduct = createAction(
  '[Product] Initialize current product'
);

/** Loading */
export const loadProducts = createAction('[Product Load] Load');
export const loadProductsSuccess = createAction(
  '[Product Load] Load success',
  props<{ products: Array<Product> }>()
);
export const loadProductsFailure = createAction(
  '[Product Load] Load failure',
  props<{ error: string }>()
);
