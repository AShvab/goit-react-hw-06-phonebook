import { configureStore } from "@reduxjs/toolkit";
import {  createReducer } from "@reduxjs/toolkit";

const myReducer = createReducer(0, {

});

export const store = configureStore({
  reducer: {
    myValue: myReducer
  },
});