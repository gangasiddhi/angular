import { Component, DestroyRef, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { productActions } from '../../store/product-actions';
import { productSelectors } from '../../store/product-selectors';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '../../model/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly products$: Observable<Product[]> = this._store.pipe(
    select(productSelectors.selectEntities),
    takeUntilDestroyed(this._destroyRef),
    map((products: any) => products?.products || [])
  )

  ngOnInit(): void {
    this._store.dispatch(productActions.loadAll());
  }

}
