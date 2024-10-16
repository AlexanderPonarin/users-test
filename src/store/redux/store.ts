import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { usersReduser } from './slices/users';

const store = configureStore({
  reducer: {
    users: usersReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
