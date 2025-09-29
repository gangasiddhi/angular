import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { productActions } from "../../store/product-actions";
import { productSelectors } from "../../store/product-selectors";
import { map, Observable } from "rxjs";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Product } from "../../model/product.model";
import { ActivatedRoute } from "@angular/router";

@Component({
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: "./product-details.html",
  styleUrl: "./product-details.scss",
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class ProductDetails implements OnInit {
  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _activatedRoute = inject(ActivatedRoute);

  protected readonly product$: Observable<Product | undefined | null> =
    this._store.pipe(
      select(productSelectors.selectSelected),
      takeUntilDestroyed(this._destroyRef)
    );

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        map((params) => params["id"]),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((id) => {
        this._store.dispatch(productActions.loadById({ id }));
      });
  }
}
