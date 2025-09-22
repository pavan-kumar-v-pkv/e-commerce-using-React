import dayjs from "dayjs";
import axios from "axios";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((item) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === item.deliveryOptionId;
            }
          );

          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${item.productId}`);
            await loadCart();
          };

          return (
            <div key={item.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={item.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{item.product.name}</div>
                  <div className="product-price">
                    {formatMoney(item.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions deliveryOptions={deliveryOptions} item={item} loadCart={loadCart} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
