import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@components';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientsSelector } from '../../services/slice';
import { useSelector, useDispatch } from '../../services/store';
import { getIngredients } from '../../services/actions';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const ingredients = useSelector(getIngredientsSelector);

  const ingredientData =
    ingredients &&
    [...ingredients.buns, ...ingredients.sauces, ...ingredients.mains].find(
      (item) => item._id === window.location.pathname.split('/ingredients/')[1]
    );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <Modal
      title='Ingredient Details'
      onClose={() => {
        navigate('/');
      }}
    >
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
