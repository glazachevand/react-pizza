import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemType } from '../../redux/cart/types';
import { addItem } from '../../redux/cart/slice';
import { selectCartItems } from '../../redux/cart/selectors';

import axios from 'axios';
import styles from './FullPizzaBlock.module.scss';

type FullPizzaBlockProps = {
  id: string | undefined;
};

export const FullPizzaBlock: React.FC<FullPizzaBlockProps> = ({ id }) => {
  const [pizza, setPizza] = React.useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
    rating: number;
    description: string;
  }>();
  const typeNames = ['тонкое', 'традиционное'];

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = pizza ? pizza.title : '';
  const cartItems = useSelector(selectCartItems(title));
  const addedCount = cartItems.reduce((sum: number, item: CartItemType) => item.count + sum, 0);

  const onClickAdd = () => {
    if (pizza) {
      const item: CartItemType = {
        id: pizza.id,
        title: pizza.title,
        price: pizza.price,
        imageUrl: pizza.imageUrl,
        type: typeNames[activeType],
        size: pizza.sizes[activeSize],
        count: 0,
      };

      dispatch(addItem(item));
    }
  };

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62d162dcdccad0cf176680f0.mockapi.io/items/${id}`);
        setPizza(data);
        setActiveType(data.types[0]);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className={styles.pizza}>
      <img className={styles.pizza__image} src={pizza.imageUrl} alt="" />
      <h2 className={styles.pizza__title2}>{pizza.title}</h2>
      <p className={styles.pizza__price}>Рейтинг {pizza.rating}</p>
      <h3 className={styles.pizza__title3}>Описание:</h3>
      <p className={styles.pizza__description}>{pizza.description}</p>

      <div className={styles.pizza__selector}>
        <ul>
          {pizza.types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}>
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {pizza.sizes.map((size, index) => (
            <li
              key={size}
              className={activeSize === index ? 'active' : ''}
              onClick={() => {
                setActiveSize(index);
              }}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pizza__bottom}>
        <div className={styles.pizza__price}>от {pizza.price} ₽</div>
        <button className="button button--outline button--add" onClick={onClickAdd}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
