export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
  descrioption: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  title: string;
  page: string;
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
