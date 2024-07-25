
import { memo } from "react";
import Meal from "./Meal";

const Home = ({availableMeals}) => {

  console.log("===============Home Component================");

  return ( <>
    <div id="meals">
      {availableMeals.map(meal => {
        return <Meal key={meal.id} meal={meal} />
      })}
    </div>
  </> );
}

export default memo(Home);