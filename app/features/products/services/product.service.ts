import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { FeatureService } from '@core/services/feature.service';

@Injectable({ providedIn: 'root' })
export class ProductService extends FeatureService<Product> {
  constructor() {
    super('products');
  }
}
