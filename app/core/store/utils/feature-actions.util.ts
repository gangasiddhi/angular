// store/utils/crud-actions.util.ts
import { createAction, props } from '@ngrx/store';

export function createFeatureActions<T>(entity: string) {
  const capitalized = entity.charAt(0).toUpperCase() + entity.slice(1);

  return {
    loadAll: createAction(`[${capitalized}] Load All`),
    loadAllSuccess: createAction(`[${capitalized}] Load All Success`, props<{ data: T[] }>()),
    loadAllFailure: createAction(`[${capitalized}] Load All Failure`, props<{ error: any }>()),

    loadById: createAction(`[${capitalized}] Load By ID`, props<{ id: string | number }>()),
    loadByIdSuccess: createAction(`[${capitalized}] Load By ID Success`, props<{ data: T }>()),
    loadByIdFailure: createAction(`[${capitalized}] Load By ID Failure`, props<{ error: any }>()),

    create: createAction(`[${capitalized}] Create`, props<{ data: T }>()),
    createSuccess: createAction(`[${capitalized}] Create Success`, props<{ data: T }>()),
    createFailure: createAction(`[${capitalized}] Create Failure`, props<{ error: any }>()),

    update: createAction(`[${capitalized}] Update`, props<{ id: string | number, data: T }>()),
    updateSuccess: createAction(`[${capitalized}] Update Success`, props<{ data: T }>()),
    updateFailure: createAction(`[${capitalized}] Update Failure`, props<{ error: any }>()),

    delete: createAction(`[${capitalized}] Delete`, props<{ id: string | number }>()),
    deleteSuccess: createAction(`[${capitalized}] Delete Success`, props<{ id: string | number }>()),
    deleteFailure: createAction(`[${capitalized}] Delete Failure`, props<{ error: any }>()),
  };
}
