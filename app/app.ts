import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Button } from './shared/components/button/button';
import { ButtonConfig } from './shared/components/button/button-config';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Breadcrumb } from "@shared/components/breadcrumb/breadcrumb";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Breadcrumb],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Angular Zoneless';
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _titleService = inject(Title);
  private readonly _destroyRef = inject(DestroyRef);

  config: ButtonConfig = {
    "text": "Cancel",
    "variant": "secondary",
    "action": "cancel"
  };

   ngOnInit(): void {
    // Subscribe to router events to react to route changes
   this._router.events.pipe(
      takeUntilDestroyed(this._destroyRef),
      // Filter for the NavigationEnd event, which signifies a successful navigation
      filter(event => event instanceof NavigationEnd),
      // Get the activated route
      map(() => this._activatedRoute),
      // Traverse the route tree to find the last activated route with a title
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // Filter to ensure it's the primary router outlet
      //filter(route => route.outlet === 'primary'),
      // Extract the `title` property from the route's data
      mergeMap(route => route.data),
      map(data => data['title'])
    ).subscribe(title => {
     
      this.title = 'Angular Zoneless'; // Reset to base title
      
      // Update the title property
      if (title) {
        this.title = this.title + ' - ' + title;
      }

      this._titleService.setTitle(this.title);
    });
  }

  onActivate(){
    this._cdr.markForCheck();
  }

  handleButtonClick(action: string) {
    console.log(`Action: ${action}`);
    // Handle the specific action based on the 'action' string
    if (action === 'save') {
      // Logic for saving
    } else if (action === 'cancel') {
      // Logic for canceling
    }
  }
}
