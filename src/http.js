export const getAvailableMeals = async() => {
  const response = await fetch('http://localhost:3000/meals') ;
  const meals = await response.json();

  if(!response.ok) throw new Error('failed to fetch meals');
  return meals;

}