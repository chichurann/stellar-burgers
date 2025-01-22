import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { getIngredientsSelector } from '../../services/slice';
import { useSelector, useDispatch } from '../../services/store';
import { getIngredients } from '../../services/actions';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();

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

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
