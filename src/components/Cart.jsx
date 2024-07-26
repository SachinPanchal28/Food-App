import CartItem from "./CartItem";
import {getCartTotalAmout} from '../utils';

const Cart = ({ cartItems, onClose, onCheckout }) => {
  const totalAmount = getCartTotalAmout (cartItems);
  //   .map((item) => item.price * (item.quantity || 1))
  //   .reduce((total, price) => total + +price, 0);

  // const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

  console.log("===============Cart Component================");

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.length == 0 && <p>No cart items</p>}
        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return <CartItem key={item.id} meal={item} />;
          })}
      </ul>
      <p className="cart-total">${totalAmount} </p>
      <div className="modal-footer">
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
        <button className="button" onClick={() => onCheckout(totalAmount)}>
          Procced to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
