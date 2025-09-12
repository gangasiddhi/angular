import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProductEffects } from 'src/app/features/products/store/product-effects';
import { productFeatureKey, productReducer } from 'src/app/features/products/store/product-reducer';

export const routes: Routes = [
    {
        path: '',
         data: {
            title: 'Products'
        },
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full',
            },
            {
                path: 'list',
                loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductList),
                data: {
                    title: 'Product List'
                }
            },
            {
                path: ':id',
                loadComponent: () => import('./components/product-details/product-details').then(m => m.ProductDetails),
                data: {
                    title: 'Product Detail'
                }
            }
        ],
        providers: [
            provideState(productFeatureKey, productReducer),
            provideEffects(ProductEffects)
        ]
    }

]