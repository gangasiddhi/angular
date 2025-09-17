import { createFeatureActions } from "@core/store/utils/feature-actions.util";
import { Product } from "../model/product.model";
export const productFeatureKey = "products";

export const productActions = createFeatureActions<Product>(productFeatureKey);
