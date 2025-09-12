import {productActions} from './product-actions';
import {createCrudReducer, FeatureState, initialFeatureState} from '@core/store/utils/feature-reducer.util';
import {Product} from '../model/product.model'; 

export const initialProductState: FeatureState<Product> = initialFeatureState<Product>();

export const productFeatureKey = 'products';

export const productReducer = createCrudReducer<Product>(
  productActions,
  initialProductState
);