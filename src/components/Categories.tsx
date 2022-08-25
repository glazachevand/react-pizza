import React from 'react';
//import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  //useWhyDidYouUpdate('Categories', { value, onChangeCategory });

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => {
              onChangeCategory(index);
            }}
            className={value === index ? 'active' : ''}
            key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});
