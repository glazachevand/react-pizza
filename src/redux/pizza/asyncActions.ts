import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

// Создаем асинхронный экшен: сделать запрос к серверу, вернуть ответ
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { order, sortBy, category, title, page } = params;

    const { data } = await axios.get<Pizza[]>(`https://62d162dcdccad0cf176680f0.mockapi.io/items`, {
      params: pickBy(
        {
          page,
          limit: 8,
          category,
          sortBy,
          order,
          title,
        },
        identity,
      ),
    });

    return data;
  },
);
