import { configureStore } from "@reduxjs/toolkit";
import todosReducer from './todoSlice';

// configureStore is an abstarction of Redux store
export const store = configureStore({
    reducer: todosReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;