import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectPizzaData } from '../redux/pizza/selectors';
import { useAppDispatch } from '../redux/store';
import { sortList } from '../components/Sort';
import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  // есть ли  в адресной строке параметры
  const isSearch = React.useRef(false);
  // был ли первый рендер
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? String(categoryId) : '';
    const title = searchValue ? searchValue.toLowerCase() : '';
    const page = String(currentPage);

    dispatch(fetchPizzas({ order, sortBy, category, title, page }));

    window.scrollTo(0, 0);
  };

  // не добавлять URL параметры при первом рендере, при всех остальных добавлять
  React.useEffect(() => {
    if (isMounted.current) {
      setSearchParams({
        sortProperty: sort.sortProperty,
        categoryId: String(categoryId),
        currentPage: String(currentPage),
      });
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // если рендер первый, то проверяем есть ли URL параметры и сохраняем в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = Object.fromEntries(new URLSearchParams(searchParams));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          searchValue: String(params.searchValue),
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // делаем первый запрос, только если ничего нет в параметрах
  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить данные с сервера. Попробуйте повторить позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
