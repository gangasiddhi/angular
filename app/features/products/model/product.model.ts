export interface Product {
  id: number;   
  title: string;
  price: number;
  description?: string;   
  inStock: boolean;
  category?: string;
  createdAt: Date;
  updatedAt?: Date;
  tags?: string[];
  imageUrl?: string;
  rating?: number; // e.g., average user rating
  reviews?: { userId: number; comment: string; rating: number; date: Date }[];
  dimensions?: { width: number; height: number; depth: number };
  weight?: number;                    
  manufacturer?: string;
  sku?: string;
  barcode?: string;
  isFeatured?: boolean;
  discount?: { amount: number; type: 'percentage' | 'fixed'; validUntil: Date };
  relatedProducts?: number[];
  [key: string]: any; // For any additional dynamic properties
}

export interface ProductState {
  entities: Product[];
  selectedProductId: number | null;
  loading: boolean;
  error: string | null;
}