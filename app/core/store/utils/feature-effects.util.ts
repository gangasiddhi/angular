// store/utils/crud-effects.util.ts
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { createFeatureActions } from './feature-actions.util';

export function createFeatureEffects<T extends object>(
  actions$: Actions,
  actions: ReturnType<typeof createFeatureActions<T>>,
  service: {
    getAll: () => Observable<T[]>;
    getById: (id: any) => Observable<T>;
    create: (data: T) => Observable<T>;
    update: (id: any, data: T) => Observable<T>;
    delete: (id: any) => Observable<any>;
  }
) {
  return {
    loadAll$: createEffect(() =>
      actions$.pipe(
        ofType(actions.loadAll),
        mergeMap(() =>
          service.getAll().pipe(
            map((data: T[]) => actions.loadAllSuccess({ data })),
            catchError(error => of(actions.loadAllFailure({ error })))
          )
        )
      )
    ),

    loadById$: createEffect(() =>
      actions$.pipe(
        ofType(actions.loadById),
        mergeMap(({ id }) =>
          service.getById(id).pipe(
            map(data => actions.loadByIdSuccess({ data })),
            catchError(error => of(actions.loadByIdFailure({ error })))
          )
        )
      )
    ),

    create$: createEffect(() =>
      actions$.pipe(
        ofType(actions.create),
        mergeMap(({ data }) =>
          service.create(data as T).pipe(
            map(created => actions.createSuccess({ data: created })),
            catchError(error => of(actions.createFailure({ error })))
          )
        )
      )
    ),

    update$: createEffect(() =>
      actions$.pipe(
        ofType(actions.update),
        mergeMap(({ id, data }) =>
          service.update(id, data as T).pipe(
            map(updated => actions.updateSuccess({ data: updated })),
            catchError(error => of(actions.updateFailure({ error })))
          )
        )
      )
    ),

    delete$: createEffect(() =>
      actions$.pipe(
        ofType(actions.delete),
        mergeMap(({ id }) =>
          service.delete(id).pipe(
            map(() => actions.deleteSuccess({ id })),
            catchError(error => of(actions.deleteFailure({ error })))
          )
        )
      )
    )
  };
}
