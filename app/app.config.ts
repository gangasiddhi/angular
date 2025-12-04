import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { loadingInterceptor } from "@core/interceptors/loading-interceptor";
import { provideClientHydration, withIncrementalHydration } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withIncrementalHydration()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideStore({}), // Provide the store with an initial state
    provideAppInitializer(() => {
      console.log("App initialized");
    }),
  ],
};
