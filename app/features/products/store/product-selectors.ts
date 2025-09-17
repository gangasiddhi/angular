import { createFeatureSelectors } from "@core/store/utils/feature-selectors.util";
import { Product } from "../model/product.model";
export const productFeatureKey = "products";

export const productSelectors =
  createFeatureSelectors<Product>(productFeatureKey);
