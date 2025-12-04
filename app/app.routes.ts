import { Routes } from "@angular/router";
import { formChangeDetectionGuard } from "./core/guards/form-change-detection-guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "test",
    pathMatch: "full",
    data: {
      title: "Home",
    },
  },
  {
    path: "test",
    loadComponent: () => import("./features/test/test").then((m) => m.Test),
    data: {
      title: "Test",
    },
    canDeactivate: [formChangeDetectionGuard],
  },
  {
    path: "products",
    loadChildren: () =>
      import("./features/products/product.routes").then((m) => m.routes),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./features/page-not-found/page-not-found").then(
        (m) => m.PageNotFound,
      ),
  },
];
