import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const filtersSlice = createSlice({
  name: "filter",
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

const persistFilterConfig = {
  key: 'filter',
  storage,
  whitelist: ['filter'],
};

export const persistedFilterReducer = persistReducer(
  persistFilterConfig,
  filtersSlice.reducer
);

export const { setFilter } = filtersSlice.actions;
