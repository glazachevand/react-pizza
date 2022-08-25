import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FullPizzaBlock } from '../components';

const FullPizza: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="container container--cart">
      <FullPizzaBlock id={id} />
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
