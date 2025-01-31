import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  products: ProductState;
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    // If it's a new product
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    }

    if (!currentProductId) return null;

    return state.products.find((p) => p.id === currentProductId);
  }
);
export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);
export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);
