import { useContext, useRef, useState } from "react";
import { CartContext } from "../store/CartContext";
import Input from "./Input";
import { getCartTotalAmout } from "../utils";

const CheckoutDetails = ({ onCancel, submitOrder }) => {
  const { cartMeals } = useContext(CartContext);
  const totalAmount = getCartTotalAmout(cartMeals);
  const [inputError, setInputError] = useState("");

  const onSubmitOrder = (event) => {
    event.preventDefault();
    if (inputError) {
      setInputError("");
    }
    const fd = new FormData(event.target);
    const checkoutData = Object.fromEntries(fd.entries());
    if (
      checkoutData.email === null ||
      !checkoutData.email.includes("@") ||
      checkoutData.name === null ||
      checkoutData.name.trim() === "" ||
      checkoutData.street === null ||
      checkoutData.street.trim() === "" ||
      checkoutData.postalCode === null ||
      checkoutData.postalCode.trim() === "" ||
      checkoutData.city === null ||
      checkoutData.city.trim() === ""
    ) {
      setInputError(
        "Missing data: Email, name, street, postal code or city is missing."
      );
      return;
    }

    submitOrder(checkoutData);
  };

  const onInputBlur = (event, identifier) => {
    const inputValue = event.target.value;
    let errorMsg = "";
    if (identifier === "email" && !inputValue.includes("@")) {
      errorMsg = "Invalid email address";
    }
    setInputValidations((prevErrors) => {
      return { ...prevErrors, [identifier]: errorMsg };
    });
  };

  return (
    <form onSubmit={(event) => onSubmitOrder(event)}>
      <h2>Checkout</h2>
      {inputError && <p className="control-error">{inputError}</p>}
      <p>Total Amout: ${totalAmount}</p>
      <Input id="name" type="text" label="Full Name" />
      <Input id="email" type="email" label="Email Address" />
      <Input id="street" type="text" label="Street" />
      <div className="control-row">
        <Input id="postalCode" type="numer" label="Postal Code" />
        <Input id="city" type="text" label="City" />
      </div>
      <div className="modal-footer">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button className="button">Submit Order</button>
      </div>
    </form>
  );
};

export default CheckoutDetails;
