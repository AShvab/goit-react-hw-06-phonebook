import { createSlice, nanoid } from "@reduxjs/toolkit";


const contactsInitialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare: ({name, number}) => {
        const id = nanoid();
        return { payload: {id, name, number} };        
      },
    },

    deleteContact: (state, action) =>{
      const id = action.payload;
      return state.filter(contact => contact.id !== id);
    },

    // toggleCompleted(state, action) {
    //   for (const contact of state) {
    //     if (contact.id === action.payload) {
    //       contact.completed = !contact.completed;
    //       break;
    //     }
    //   }
    // },
  },
});

export const { addTask, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
