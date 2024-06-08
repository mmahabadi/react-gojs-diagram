import diagramReducer, { selectNode, initialState } from './diagramSlice';
import { fetchData, saveChanges } from './diagramThunk';
import { configureStore } from '@reduxjs/toolkit';

describe('diagramSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { diagram: diagramReducer } });
  });

  it('should handle initial state', () => {
    expect(diagramReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle selectNode', () => {
    const actual = diagramReducer(initialState, selectNode('node-1'));
    expect(actual.selectedNodeKey).toEqual('node-1');
  });

  it('handles fetchData.fulfilled', async () => {
    const action = {
      type: fetchData.fulfilled.type,
      payload: { nodes: [{ id: 1 }], links: [{ id: 1, source: 1, target: 2 }] },
    };
    const state = diagramReducer(initialState, action);
    expect(state.nodes).toHaveLength(1);
    expect(state.links).toHaveLength(1);
    expect(state.loading).toBe(false);
  });

  it('handles saveChanges.pending and saveChanges.fulfilled', () => {
    let state = diagramReducer(initialState, {
      type: saveChanges.pending.type,
    });
    expect(state.loading).toBe(true);

    state = diagramReducer(state, { type: saveChanges.fulfilled.type });
    expect(state.loading).toBe(false);
  });
});
