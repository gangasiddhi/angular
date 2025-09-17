// store/utils/crud-selectors.util.ts
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeatureState, Entity } from "./feature-reducer.util";

export function createFeatureSelectors<T extends Entity>(featureKey: string) {
  const selectState = createFeatureSelector<FeatureState<T>>(featureKey);

  return {
    selectEntities: createSelector(
      selectState,
      (state) => state?.entities ?? [],
    ),
    selectSelected: createSelector(selectState, (state) => state.selected),
    selectLoading: createSelector(selectState, (state) => state.loading),
    selectError: createSelector(selectState, (state) => state.error),
  };
}
