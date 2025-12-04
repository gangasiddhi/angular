import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { SpinnerService } from "@shared/components/spinner/services/spinner.service";
import { finalize } from "rxjs";

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(SpinnerService);
  spinner.show();
  return next(req).pipe(finalize(() => spinner.hide()));
};
