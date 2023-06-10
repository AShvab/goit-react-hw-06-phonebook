import { createSlice, nanoid } from "@reduxjs/toolkit";
import {data} from '../data/data.json'
const contactsInitialState = data.data

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            text,
            id: nanoid(),
            completed: false,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
    toggleCompleted(state, action) {
      for (const contact of state) {
        if (contact.id === action.payload) {
          contact.completed = !contact.completed;
          break;
        }
      }
    },
  },
});

export const { addTask, deleteContact, toggleCompleted } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
