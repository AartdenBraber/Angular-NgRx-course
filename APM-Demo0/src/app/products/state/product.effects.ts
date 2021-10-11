import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';
import { ProductService } from '../product.service';

import { ProductPageActions, ProductApiActions } from './actions';
import { getCurrentProductId } from './';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) =>
            ProductApiActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductApiActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  deleteCurrentProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPageActions.deleteCurrentProduct),
      withLatestFrom(this.store$.select(getCurrentProductId)),
      map(([action, productId]) =>
        ProductPageActions.deleteProduct({ productId })
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      concatMap((action) =>
        this.productService.deleteProduct(action.productId).pipe(
          map((productId) =>
            ProductApiActions.deleteProductSuccess({ productId: productId })
          ),
          catchError((error) =>
            of(ProductApiActions.deleteProductFailure({ error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductApiActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductApiActions.updateProductFailure({ error }))
          )
        )
      )
    )
  );
}
