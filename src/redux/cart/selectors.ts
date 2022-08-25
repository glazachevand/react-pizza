import { RootState } from '../store';

export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (title: string) => (state: RootState) =>
  state.cart.items.filter((item) => item.title === title);
