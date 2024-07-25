import FoodImage from '../assets/logo.jpg';

const Header = ({cartItemsCount, showCartItems}) => {

  
  console.log("===============Header Component================");

  return ( <>
    <div id="main-header">
      <div id="title">
        <img src={FoodImage} alt="Food Image" />
        <h1>Reactfood</h1>
      </div>
      <button onClick={showCartItems}>Cart({cartItemsCount})</button>
    </div>
  </>  );
}

export default Header;