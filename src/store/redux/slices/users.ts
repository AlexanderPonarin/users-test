import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../axios';
import { RequestStatus } from '../../../types/request-status';
import { UsersType } from '../../../types/user';
import { SortingVariants } from '../../../types/sorting-variants';

export const fetchUers = createAsyncThunk('users/fetchUsers', async () => {
  const data = await axios.get('/users');
  return data;
});

type InitialUsersState = {
  users: {
    items: UsersType;
    status: RequestStatus;
  };
  sortingVariant: SortingVariants | null;
};

const initialState: InitialUsersState = {
  users: {
    items: [],
    status: RequestStatus.LOADING,
  },
  sortingVariant: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users.items = action.payload;
    },
    setSortingVariant(state, action) {
      state.sortingVariant = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUers.pending, (state) => {
        state.users.status = RequestStatus.LOADING;
      })
      .addCase(fetchUers.fulfilled, (state, action) => {
        state.users.items = action.payload.data;
        state.users.status = RequestStatus.LOADED;
      })
      .addCase(fetchUers.rejected, (state) => {
        state.users.status = RequestStatus.ERROR;
      });
  },
});

export const usersReduser = usersSlice.reducer;

export const { setUsers, setSortingVariant } = usersSlice.actions;
