import { inject, Injectable } from '@angular/core';
import { createFeatureEffects } from '@core/store/utils/feature-effects.util';
import { productActions } from './product-actions';
import { Actions } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Injectable()
export class ProductEffects {

 private productService = inject(ProductService);
 private actions$ = inject(Actions);

  // Dynamically create CRUD effects
  crudEffects = createFeatureEffects<Product>(
    this.actions$,
    productActions,
    this.productService
  );

  loadAll$ = this.crudEffects.loadAll$;
  loadById$ = this.crudEffects.loadById$;
  create$ = this.crudEffects.create$;
  update$ = this.crudEffects.update$;
  delete$ = this.crudEffects.delete$;
}
