// store/utils/crud-reducer.util.ts
import { createReducer, on } from '@ngrx/store';
import { createFeatureActions } from './feature-actions.util';


export interface Entity {
  id: string | number;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
}

export interface FeatureState<T extends Entity> {
  entities: T[];
  selected?: T | null;
  loading: boolean;
  error: any;
}

export const initialFeatureState = <T extends Entity>(): FeatureState<T> => ({
  entities: [],
  selected: null,
  loading: false,
  error: null
});

export function createCrudReducer<T extends Entity>(actions: ReturnType<typeof createFeatureActions<T>>, initialState: FeatureState<T>) {
  return createReducer(
    initialState,

    // Load All
    on(actions.loadAll, state => ({ ...state, loading: true })),
    on(actions.loadAllSuccess, (state, { data }) => ({ ...state, loading: false, entities: data as T[] })),
    on(actions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Load by ID
    on(actions.loadById, state => ({ ...state, loading: true })),
    on(actions.loadByIdSuccess, (state, { data }) => ({ ...state, loading: false, selected: data as T })),
    on(actions.loadByIdFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Create
    on(actions.create, state => ({ ...state, loading: true })),
    on(actions.createSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      entities: [...state.entities, data as T]
    })),
    on(actions.createFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Update
    on(actions.update, state => ({ ...state, loading: true })),
    on(actions.updateSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      entities: state.entities.map(item => (item['id'] === (data as T)['id'] ? (data as T) : item) ) as T[]
    })),
    on(actions.updateFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Delete
    on(actions.delete, state => ({ ...state, loading: true })),
    on(actions.deleteSuccess, (state, { id }) => ({
      ...state,
      loading: false,
      entities: state.entities.filter(item => item['id'] !== id)
    })),
    on(actions.deleteFailure, (state, { error }) => ({ ...state, loading: false, error }))
  );
}
