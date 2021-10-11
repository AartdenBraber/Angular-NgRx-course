import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input('errorMessage') errorMessage: string;
  @Input('products') products: Array<Product>;
  @Input('displayCode') displayCode: boolean;
  @Input('selectedProduct') selectedProduct: Product;

  @Output('displayCodeChanged') displayCodeChanged =
    new EventEmitter<boolean>();
  @Output('initializeNewProduct') initializeNewProduct =
    new EventEmitter<void>();
  @Output('productWasSelected') productWasSelected =
    new EventEmitter<Product>();

  checkChanged() {
    this.displayCodeChanged.emit();
  }

  newProduct() {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product) {
    this.productWasSelected.emit(product);
  }
}
