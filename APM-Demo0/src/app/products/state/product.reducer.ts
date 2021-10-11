import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';

import { ProductPageActions, ProductApiActions } from './actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId?: number;
  products: Array<Product>;
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: null,
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    ProductPageActions.toggleProductCode,
    (state): ProductState => ({
      ...state,
      showProductCode: !state.showProductCode,
    })
  ),
  on(
    ProductPageActions.setCurrentProduct,
    (state, action): ProductState => ({
      ...state,
      currentProductId: action.currentProductId,
    })
  ),
  on(
    ProductPageActions.initializeCurrentProduct,
    (state): ProductState => ({
      ...state,
      currentProductId: 0,
    })
  ),

  /* Deleting product */
  on(
    ProductPageActions.deleteProduct,
    (state): ProductState => ({
      ...state,
      currentProductId: null,
    })
  ),
  on(
    ProductApiActions.deleteProductSuccess,
    (state, action): ProductState => ({
      ...state,
      products: state.products.filter((p) => p.id !== action.productId),
      error: null,
    })
  ),
  on(
    ProductApiActions.deleteProductFailure,
    (state, action): ProductState => ({
      ...state,
      error: action.error,
    })
  ),

  /* Load products */
  on(
    ProductApiActions.loadProductsSuccess,
    (state, action): ProductState => ({
      ...state,
      products: action.products,
      error: null,
    })
  ),
  on(
    ProductApiActions.loadProductsFailure,
    (state, action): ProductState => ({
      ...state,
      error: action.error,
    })
  ),

  /* Update products */
  on(
    ProductApiActions.updateProductSuccess,
    (state, action): ProductState => ({
      ...state,
      products: state.products.map((p) => {
        if (p.id !== action.product.id) return p;
        return action.product;
      }),
      error: null,
    })
  ),
  on(
    ProductApiActions.updateProductFailure,
    (state, action): ProductState => ({
      ...state,
      error: action.error,
    })
  )
);
