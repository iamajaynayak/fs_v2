import "./checkout-item.css";
import { connect } from "react-redux";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cartAction.js";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container mr-1">
        <img className="checkout-item-img" src={imageUrl} alt="item" />
      </div>
      <span className="description mr-1">{name}</span>
      <span className="quantity mr-1">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          {" "}
          &#10095;{" "}
        </div>
      </span>
      <span className="price mr-1">₹{price}</span>
      <div className="remove-button mr-1" onClick={() => clearItem(cartItem)}>
        {" "}
        &#10005;{" "}
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
