import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartSliceState, CartItemType } from './types';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.type !== action.payload.type ||
          item.size !== action.payload.size,
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.type === action.payload.type,
      );
      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
