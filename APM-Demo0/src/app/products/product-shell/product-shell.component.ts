import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state';
import { ProductPageActions } from '../state/actions';
@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  displayCode$: Observable<any>;

  products$: Observable<Array<Product>>;
  selectedProduct$: Observable<Product>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());

    this.products$ = this.store.select(getProducts);
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.errorMessage$ = this.store.select(getError);

    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({ currentProductId: product.id })
    );
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(ProductPageActions.deleteCurrentProduct());
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(ProductPageActions.deleteCurrentProduct());
    }
  }

  saveProduct(product: Product): void {
    if (product.id === 0) {
      this.store.dispatch(ProductPageActions.createProduct({ product }));
    } else {
      this.store.dispatch(ProductPageActions.updateProduct({ product }));
    }
  }
}
