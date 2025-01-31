import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Store } from '@ngrx/store';
import { getCurrentProduct, State } from '../state';
import { ProductPageActions } from '../state/actions';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  @Input('errorMessage') errorMessage;

  private _product: Product;
  @Input('product') set product(newProduct: Product) {
    this._product = newProduct;
    this.displayProduct(newProduct);
  }
  get product() {
    return this._product;
  }

  @Output() saveProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<Product>();

  productForm: FormGroup;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.',
      },
      productCode: {
        required: 'Product code is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: '',
    });

    // Watch for value changes for validation
    this.productForm.valueChanges.subscribe(
      () =>
        (this.displayMessage = this.genericValidator.processMessages(
          this.productForm
        ))
    );
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.productForm
    );
  }

  displayProduct(product: Product | null): void {
    if (!product) return;

    // Reset the form back to pristine
    this.productForm.reset();

    // Display the appropriate page title
    if (this._product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${product.productName}`;
    }

    // Update the data on the form
    this.productForm.patchValue(product);
  }

  reset(product: Product): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct(product);
  }

  delete(product: Product) {
    this.deleteProduct.emit(product);
  }

  save(originalProduct: Product): void {
    if (!this.productForm.valid) return;
    if (!this.productForm.dirty) return;
    // Copy over all of the original product properties
    // Then copy over the values from the form
    // This ensures values not on the form, such as the Id, are retained
    const product = { ...originalProduct, ...this.productForm.value };

    this.saveProduct.emit(product);
  }
}
