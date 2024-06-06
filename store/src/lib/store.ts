import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import diagramReducer from './features/diagram/diagramSlice';

export const store = configureStore({
  reducer: {
    diagram: diagramReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
