export const getCartTotalAmout = (cartItems) => {
    const totalAmount = cartItems
      .map((item) => item.price * (item.quantity || 1))
      .reduce((total, price) => total + +price, 0);

    return Math.round(totalAmount * 100) / 100;

}