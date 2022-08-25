export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};
