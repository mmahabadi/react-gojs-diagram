import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectDiagramState = (state: RootState) => state.diagram;

export const selectNodes = createSelector(
  [selectDiagramState],
  (state) => state.nodes
);

export const selectLinks = createSelector(
  [selectDiagramState],
  (state) => state.links
);

export const selectLoading = createSelector(
  [selectDiagramState],
  (state) => state.loading
);

export const selectSelectedNodeKey = createSelector(
  [selectDiagramState],
  (state) => state.selectedNodeKey
);
