import { inject, Injectable } from "@angular/core";
import { createFeatureEffects } from "@core/store/utils/feature-effects.util";
import { productActions } from "./product-actions";
import { Actions } from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import { Product } from "../model/product.model";

export const PRODUCT_FEATURE_KEY = "Product";

@Injectable()
export class ProductEffects {
  private productService = inject(ProductService);
  private actions$ = inject(Actions);

  // Dynamically create CRUD effects
  crudEffects = createFeatureEffects<Product>(
    this.actions$,
    productActions,
    this.productService,
    PRODUCT_FEATURE_KEY,
  );

  loadAll$ = this.crudEffects.loadAll$;
  loadAllSuccess$ = this.crudEffects.loadAllSuccess$;
  loadAllFailure$ = this.crudEffects.loadAllFailure$;

  loadById$ = this.crudEffects.loadById$;
  loadByIdSuccess$ = this.crudEffects.loadByIdSuccess$;
  loadByIdFailure$ = this.crudEffects.loadByIdFailure$;

  create$ = this.crudEffects.create$;
  createSuccess$ = this.crudEffects.createSuccess$;
  createFailure$ = this.crudEffects.createFailure$;

  update$ = this.crudEffects.update$;
  updateSuccess$ = this.crudEffects.updateSuccess$;
  updateFailure$ = this.crudEffects.updateFailure$;

  delete$ = this.crudEffects.delete$;
  deleteSuccess$ = this.crudEffects.deleteSuccess$;
  deleteFailure$ = this.crudEffects.deleteFailure$;
}
