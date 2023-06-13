import { createSlice, nanoid } from "@reduxjs/toolkit";
import contactsData from '../data/data.json'

// const contactsInitialState = [
//   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

const contactsSlice = createSlice({
  name: "contacts",
  // initialState: contactsInitialState,
  initialState: contactsData,

  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      // коли викликається дія addContact, prepare генерує id за допомогою nanoid(). Потім вона повертає об'єкт зі структурою { id, name, number }, який стає значенням payload для дії.
      prepare: ({name, number}) => {
        const id = nanoid();
        return { payload: {id, name, number} };        
      },
    },

    deleteContact: (state, action) =>{
      const id = action.payload;
      return state.filter(contact => contact.id !== id);
    },

  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
