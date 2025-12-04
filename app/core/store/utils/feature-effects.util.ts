// store/utils/crud-effects.util.ts
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, Observable, of, tap } from "rxjs";
import { createFeatureActions } from "./feature-actions.util";
import { SnackbarService } from "@shared/components/snackbar/services/snackbar.service";
import { inject } from "@angular/core";

export function createFeatureEffects<T extends object>(
  actions$: Actions,
  actions: ReturnType<typeof createFeatureActions<T>>,
  service: {
    getAll: (filters: any) => Observable<T[]>;
    getById: (id: string | number) => Observable<T>;
    create: (data: T) => Observable<T>;
    update: (id: string | number, data: T) => Observable<T>;
    delete: (id: string | number) => Observable<T>;
  },
  entityName: string,
) {
  const _snackBar = inject(SnackbarService);
  return {
    loadAll$: createEffect(() =>
      actions$.pipe(
        ofType(actions.loadAll),
        mergeMap(({ filters }) =>
          service.getAll(filters).pipe(
            map((data: T[]) => actions.loadAllSuccess({ data })),
            catchError((error) => of(actions.loadAllFailure({ error }))),
          ),
        ),
      ),
    ),

    loadAllSuccess$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.loadAllSuccess),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}s`,
              message: "Successfully Loaded.",
              type: "success",
            });
          }),
        ),
      { dispatch: false },
    ),

    loadAllFailure$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.loadAllFailure),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}s`,
              message: "Failed to Load.",
              type: "error",
            });
          }),
        ),
      { dispatch: false },
    ),

    loadById$: createEffect(() =>
      actions$.pipe(
        ofType(actions.loadById),
        mergeMap(({ id }) =>
          service.getById(id).pipe(
            map((data) => actions.loadByIdSuccess({ data })),
            catchError((error) => of(actions.loadByIdFailure({ error }))),
          ),
        ),
      ),
    ),

    loadByIdSuccess$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.loadByIdSuccess),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Successfully Loaded.",
              type: "success",
            });
          }),
        ),
      { dispatch: false },
    ),

    loadByIdFailure$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.loadByIdFailure),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Failed to Load.",
              type: "error",
            });
          }),
        ),
      { dispatch: false },
    ),

    create$: createEffect(() =>
      actions$.pipe(
        ofType(actions.create),
        mergeMap(({ data }) =>
          service.create(data as T).pipe(
            map((created) => actions.createSuccess({ data: created })),
            catchError((error) => of(actions.createFailure({ error }))),
          ),
        ),
      ),
    ),

    createSuccess$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.createSuccess),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Successfully Created.",
              type: "success",
            });
          }),
        ),
      { dispatch: false },
    ),

    createFailure$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.createFailure),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Failed to Create.",
              type: "error",
            });
          }),
        ),
      { dispatch: false },
    ),

    update$: createEffect(() =>
      actions$.pipe(
        ofType(actions.update),
        mergeMap(({ id, data }) =>
          service.update(id, data as T).pipe(
            map((updated) => actions.updateSuccess({ data: updated })),
            catchError((error) => of(actions.updateFailure({ error }))),
          ),
        ),
      ),
    ),

    updateSuccess$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.updateSuccess),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Successfully Created.",
              type: "success",
            });
          }),
        ),
      { dispatch: false },
    ),

    updateFailure$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.updateFailure),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Failed to update.",
              type: "error",
            });
          }),
        ),
      { dispatch: false },
    ),

    delete$: createEffect(() =>
      actions$.pipe(
        ofType(actions.delete),
        mergeMap(({ id }) =>
          service.delete(id).pipe(
            map(() => actions.deleteSuccess({ id })),
            catchError((error) => of(actions.deleteFailure({ error }))),
          ),
        ),
      ),
    ),

    deleteSuccess$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.deleteSuccess),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Successfully Deleted.",
              type: "success",
            });
          }),
        ),
      { dispatch: false },
    ),

    deleteFailure$: createEffect(
      () =>
        actions$.pipe(
          ofType(actions.updateFailure),
          tap(() => {
            _snackBar.show({
              heading: `${entityName}`,
              message: "Failed to Delete.",
              type: "error",
            });
          }),
        ),
      { dispatch: false },
    ),
  };
}
