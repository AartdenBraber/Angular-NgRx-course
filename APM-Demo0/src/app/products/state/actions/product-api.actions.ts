import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const deleteProductSuccess = createAction(
  '[Product API] Delete success',
  props<{ productId: Product['id'] }>()
);
export const deleteProductFailure = createAction(
  '[Product API] Delete failure',
  props<{ error: string }>()
);

export const loadProductsSuccess = createAction(
  '[Product API] Load success',
  props<{ products: Array<Product> }>()
);
export const loadProductsFailure = createAction(
  '[Product API] Load failure',
  props<{ error: string }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update product success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product API] Update product failure',
  props<{ error: string }>()
);
