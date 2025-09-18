import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { BreadcrumbInterface } from "./breadcrumb.interface";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./breadcrumb.html",
  styleUrl: "./breadcrumb.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Breadcrumb implements OnInit {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _cdr = inject(ChangeDetectorRef);

  protected breadcrumbs: BreadcrumbInterface[] = [];

  public breadcrumbs$: Observable<BreadcrumbInterface[]> =
    this._activatedRoute.data.pipe(map((data) => data["breadcrumbs"] || []));

  ngOnInit(): void {
    this._router.events
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root);
        this._cdr.detectChanges();
        this._cdr.detach();
      });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url = "",
    breadcrumbs: BreadcrumbInterface[] = [],
  ): BreadcrumbInterface[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join("/");
      if (routeURL !== "") {
        url += `/${routeURL}`;
      }
      if (child.snapshot.data["title"]) {
        // Check for 'title' data in route
        breadcrumbs.push({ label: child.snapshot.data["title"], url: url });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
