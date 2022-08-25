import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';
import Loadable from 'react-loadable';

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart"*/ './pages/Cart'),
  loading: () => <div>Загрузка корзины...</div>,
});

const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
