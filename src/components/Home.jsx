
import Meal from "./Meal";

const Home = ({availableMeals}) => {

  return ( <>
    <div id="meals">
      {availableMeals.map(meal => {
        return <Meal key={meal.id} meal={meal} />
      })}
    </div>
  </> );
}

export default Home;