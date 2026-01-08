import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { switchMap, catchError, filter, take } from "rxjs/operators";

const HEALTH_CHECK_INTERVAL = 1 * 60 * 1000; // 1 minute
const HEALTH_URL = "https://dummyjson.com/test"; // adjust if your backend uses a different path

let lastHealthCheck = 0;
let lastHealthy = true;

export const idleInterceptor: HttpInterceptorFn = (req, next) => {
  // If this is the health endpoint itself, skip the health-check to avoid recursion
  if (req.url.includes(HEALTH_URL) || req.url.includes("test")) {
    return next(req);
  }

  const now = Date.now();

  // If we've checked recently and the last result was healthy, proceed immediately
  if (now - lastHealthCheck < HEALTH_CHECK_INTERVAL && lastHealthy) {
    return next(req);
  }

  // Perform health check before forwarding the actual request
  const healthReq = req.clone({ url: HEALTH_URL, method: "GET" });

  return next(healthReq).pipe(
    filter(
      (event): event is HttpResponse<any> => event instanceof HttpResponse,
    ),
    take(1),
    switchMap((resp) => {
      lastHealthCheck = Date.now();
      if (resp.status >= 200 && resp.status < 300) {
        lastHealthy = true;
        return next(req);
      }
      lastHealthy = false;
      return throwError(
        () => new Error(`Health check failed with status ${resp.status}`),
      );
    }),
    catchError((err) => {
      lastHealthCheck = Date.now();
      lastHealthy = false;
      return throwError(() => err);
    }),
  );
};
