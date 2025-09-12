import { Routes } from '@angular/router';
import {formChangeDetectionGuard} from './core/guards/form-change-detection-guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'test',
        pathMatch: 'full',
        data: {
            title: 'Home'
        }
    },
    {
        path: 'test',
        loadComponent: () => import('./features/test/test').then(m => m.Test),
        data: {
            title: 'Test'
        },
        canDeactivate: [formChangeDetectionGuard]          
    },
    {
        path: 'test1',
        loadComponent: () => import('./features/test1/test1').then(m => m.Test1),
        data: {
            title: 'Test 1'
        },
        canDeactivate: [formChangeDetectionGuard]
    },
    {
        path: 'test2',
        loadComponent: () => import('./features/test2/test2').then(m => m.Test2),
        data: {
            title: 'Test 2'
        },
        canDeactivate: [formChangeDetectionGuard]
    },
    {
        path: 'products',
        loadComponent: () => import('./features/products/products').then(m => m.Products),
        loadChildren: () => import('./features/products/product.routes').then(m => m.routes),
    },
    {
        path: '**',
        data: {
            title: 'Page Not Found'
        },
        loadComponent: () => import('./features/page-not-found/page-not-found').then(m => m.PageNotFound)
    },
];
