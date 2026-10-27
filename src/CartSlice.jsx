
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find(
        (item) => item.name === plant.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const plantName =
        typeof action.payload === 'string'
          ? action.payload
          : action.payload.name;

      state.items = state.items.filter(
        (item) => item.name !== plantName
      );
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.name === name
      );

      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.name !== name
          );
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
