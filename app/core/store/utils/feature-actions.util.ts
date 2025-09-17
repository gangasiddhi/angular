// store/utils/crud-actions.util.ts
import { createAction, props } from "@ngrx/store";

export function createFeatureActions<T>(entity: string) {
  const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);

  return {
    loadAll: createAction(`[${capitalized}] Load All`),
    loadAllSuccess: createAction(
      `[${capitalized}] Load All Success`,
      props<{ data: T[] }>(),
    ),
    loadAllFailure: createAction(
      `[${capitalized}] Load All Failure`,
      props<{ error: { message: string; code?: number } }>(),
    ),

    loadById: createAction(
      `[${capitalized}] Load By ID`,
      props<{ id: string | number }>(),
    ),
    loadByIdSuccess: createAction(
      `[${capitalized}] Load By ID Success`,
      props<{ data: T }>(),
    ),
    loadByIdFailure: createAction(
      `[${capitalized}] Load By ID Failure`,
      props<{ error: { message: string; code?: number } }>(),
    ),

    create: createAction(`[${capitalized}] Create`, props<{ data: T }>()),
    createSuccess: createAction(
      `[${capitalized}] Create Success`,
      props<{ data: T }>(),
    ),
    createFailure: createAction(
      `[${capitalized}] Create Failure`,
      props<{ error: { message: string; code?: number } }>(),
    ),

    update: createAction(
      `[${capitalized}] Update`,
      props<{ id: string | number; data: T }>(),
    ),
    updateSuccess: createAction(
      `[${capitalized}] Update Success`,
      props<{ data: T }>(),
    ),
    updateFailure: createAction(
      `[${capitalized}] Update Failure`,
      props<{ error: { message: string; code?: number } }>(),
    ),

    delete: createAction(
      `[${capitalized}] Delete`,
      props<{ id: string | number }>(),
    ),
    deleteSuccess: createAction(
      `[${capitalized}] Delete Success`,
      props<{ id: string | number }>(),
    ),
    deleteFailure: createAction(
      `[${capitalized}] Delete Failure`,
      props<{ error: { message: string; code?: number } }>(),
    ),
  };
}
