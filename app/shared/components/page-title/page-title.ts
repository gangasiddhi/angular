import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from "@angular/router";
import { filter, map, mergeMap } from "rxjs";
import { Title } from "@angular/platform-browser";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  standalone: true,
  imports: [],
  templateUrl: './page-title.html',
  styleUrl: './page-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTitle implements OnInit {

  protected title = "";
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _titleService = inject(Title);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // Subscribe to router events to react to route changes
    this._router.events
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        // Filter for the NavigationEnd event, which signifies a successful navigation
        filter((event) => event instanceof NavigationEnd),
        // Get the activated route
        map(() => this._activatedRoute),
        // Traverse the route tree to find the last activated route with a title
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        // Filter to ensure it's the primary router outlet
        //filter(route => route.outlet === 'primary'),
        // Extract the `title` property from the route's data
        mergeMap((route) => route.data),
        map((data) => data["title"]),
      )
      .subscribe((title) => {
        this.title = ""; // Reset to base title

        // Update the title property
        if (title) {
          this.title = title;
        }

        this._titleService.setTitle(this.title);
        this._cdr.detectChanges();
        this._cdr.detach();
      });
  }
}
