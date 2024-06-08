import { configureStore } from '@reduxjs/toolkit';
import { fetchData } from './diagramThunk';
import diagramReducer from './diagramSlice';

describe('fetchData thunk', () => {
  it('creates an array of nodes and links', async () => {
    const store = configureStore({
      reducer: {
        diagram: diagramReducer,
      },
    });

    await store.dispatch(fetchData());

    const state = store.getState().diagram;
    expect(state.nodes.length).toBe(10000);
    expect(state.links.length).toBe(9999);
    expect(state.nodes[0]).toHaveProperty('color');
    expect(state.links[0]).toHaveProperty('text');
  });
});
