import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          'https://reactmeals-b0a28-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
        );
        if (!response.ok) {
          throw new Error(
            'Something went wrong, refresh page or try again later.'
          );
        }
        const responseData = await response.json();
        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: responseData[key].id,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
        setHttpError('');
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      price={meal.price}
      description={meal.description}
      name={meal.name}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {httpError !== '' && <p>{httpError}</p>}
        {!isLoading && httpError === '' && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
