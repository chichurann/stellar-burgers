import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { getBurgerConstructorSelector } from '../../services/slice';
import { orderBurgerApi } from '@api';

export const BurgerConstructor: FC = () => {
  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const constructorItems = useSelector(getBurgerConstructorSelector);

  const onOrderClick = () => {
    setOrderRequest(true);
    if (!constructorItems.bun || orderRequest) return;
    orderBurgerApi(constructorItems.ingredients.map((item) => item._id)).then(
      (responce) => {
        setOrderRequest(false);
        setOrderModalData(responce.order);
      }
    );
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
