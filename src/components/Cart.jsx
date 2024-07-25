import CartItem from "./CartItem";

const Cart = ({ cartItems, onClose }) => {
  const totalAmount = cartItems.map(item => item.price * (item.quantity || 1)).reduce((total, price) => total + +price, 0);
  const roundedTotalAmount = Math.round(totalAmount * 100) / 100;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.length == 0 && <p>No cart items</p>}
        {cartItems.length > 0 && cartItems.map(item => {
          return <CartItem key={item.id} meal={item} />
        })}

      </ul>
      <p className="cart-total">${roundedTotalAmount} </p>
      <div style={{display: 'flex', height: '2.5rem', justifyContent:'end'}}>
        <button onClick={onClose} style={{ backgroundColor: "white", marginRight: '1rem', padding: '0.5rem 1.2rem', fontSize: '1rem', border: '1px solid white', borderRadius: '4px' }}>Cancel</button>
        <button className="button">Procced to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;