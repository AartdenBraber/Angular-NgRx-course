import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction(
  '[Product Page] Toggle product code'
);
export const setCurrentProduct = createAction(
  '[Product Page] Set current product',
  props<{ currentProductId: Product['id'] }>()
);
export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize current product'
);

export const deleteCurrentProduct = createAction(
  '[Product Page] Delete current product'
);
export const deleteProduct = createAction(
  '[Product Page] Delete product',
  props<{ productId: Product['id'] }>()
);

export const loadProducts = createAction('[Product Load] Load');

export const createProduct = createAction(
  '[Product Page] Create product',
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  '[Product Page] Update product',
  props<{ product: Product }>()
);
