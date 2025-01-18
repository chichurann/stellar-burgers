import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@components';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';
import { useSelector, useDispatch } from '../../services/store';
import { getIngredients } from '../../services/actions';
import { getIngredientsSelector } from '../../services/slice';

export const OrderInfo: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { number } = useParams();

  const [orderData, setOrderData] = useState<TOrder>();

  useEffect(() => {
    getOrderByNumberApi(Number(number)).then((responce) => {
      setOrderData(responce.orders[0]);
    });
    dispatch(getIngredients());
  }, []);

  const { buns, mains, sauces } = useSelector(getIngredientsSelector);

  const ingredients: TIngredient[] = [...buns, ...mains, ...sauces];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <Modal
      title='Order Info'
      onClose={() => {
        navigate(-1);
      }}
    >
      <OrderInfoUI orderInfo={orderInfo} />{' '}
    </Modal>
  );
};
