import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { getOrdersApi } from '@api';

export const ProfileOrders: FC = () => {
  const [orders, setOrders] = useState<Array<TOrder>>([]);

  useEffect(() => {
    getOrdersApi().then((responce) => {
      setOrders(responce);
    });
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
