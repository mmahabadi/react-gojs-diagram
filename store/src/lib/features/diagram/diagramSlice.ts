import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DiagramState } from '../../../types';
import { fetchData, saveChanges } from './diagramThunk';

export const initialState: DiagramState = {
  nodes: [],
  links: [],
  selectedNodeKey: null,
  loading: false,
};
const diagramSlice = createSlice({
  name: 'diagram',
  initialState,
  reducers: {
    selectNode: (state, action: PayloadAction<string>) => {
      state.selectedNodeKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<unknown>) => {
        state.nodes = (action.payload as DiagramState).nodes;
        state.links = (action.payload as DiagramState).links;
        state.loading = false;
      })
      .addCase(saveChanges.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveChanges.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { selectNode } = diagramSlice.actions;
export default diagramSlice.reducer;
