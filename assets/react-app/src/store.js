import { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filter/filterSlice';
import modalSlice from './features/modal/modalSlice';

const store = configureStore({
  reducer: {
    filter: filterSlice,
    modal: modalSlice,
  },
});

export default store;
