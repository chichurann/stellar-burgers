import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedsSelector } from '../../services/slice';
import { getFeeds } from '../../services/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const { orders } = useSelector(getFeedsSelector);

  if (orders && orders.length) {
    return (
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeeds())} />
    );
  }
  return <Preloader />;
};
