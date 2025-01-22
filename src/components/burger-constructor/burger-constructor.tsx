import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  getBurgerConstructorSelector,
  clearBurgerConstructor
} from '../../services/slice';
import { getCookie } from '../../utils/cookie';
import { orderBurgerApi } from '@api';

export const BurgerConstructor: FC = () => {
  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(getBurgerConstructorSelector);
  const isAuthenticated = getCookie('accessToken');

  const onOrderClick = () => {
    if (isAuthenticated) {
      setOrderRequest(true);
      if (!constructorItems.bun || orderRequest) return;

      orderBurgerApi(constructorItems.ingredients.map((item) => item._id))
        .then((response) => {
          setOrderRequest(false);
          setOrderModalData(response.order);
          dispatch(clearBurgerConstructor());
        })
        .catch(() => {
          setOrderRequest(false);
        });
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
