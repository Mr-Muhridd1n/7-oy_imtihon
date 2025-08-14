import { formatNumber } from "../utils";
import { delProduct } from "../app/features/productSlice";
import { useDispatch } from "react-redux";
import { Fragment } from "react";

export const Bascet = ({ product, setOrder }) => {
  const dispatch = useDispatch();
  return (
    <div className={product.bascet.length > 0 ? "" : "your__card__active"}>
      <ul className="your__card__active__list">
        {product.bascet.map((item) => {
          return (
            <Fragment key={item.id}>
              <li className="your__card__active__item">
                <div className="your__card__active__item-wrapper">
                  <h3 className="your__card__active__title">{item.name}</h3>
                  <div className="your__card__active-info">
                    <span className="your__card__active__count">
                      {item.count}x
                    </span>
                    <span className="your__card__active__price-wrapper">
                      @
                      <span className="your__card__active__price">
                        {formatNumber(item.price)}
                      </span>
                    </span>
                    <span className="your__card__active__allPrice">
                      {formatNumber(item.price * item.count)}
                    </span>
                  </div>
                </div>

                <button
                  className="your__card__active__delete"
                  onClick={() => {
                    dispatch(delProduct(item.id));
                  }}
                >
                  <div className="round bascet">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        fill="none"
                        d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                      />
                    </svg>
                  </div>
                </button>
              </li>
              <hr
                style={{
                  backgroundColor: "#f5eeec",
                  height: "1px",
                  marginBottom: "16px",
                  border: "none",
                }}
              />
            </Fragment>
          );
        })}
      </ul>
      <div className="order_total">
        <h3 className="order_total__title">Order Total</h3>
        <h2 className="order_total__price" data-price="0">
          {formatNumber(product.totalPrice)}
        </h2>
      </div>
      <div className="carboon-natural-info">
        <div>
          <img
            src="/images/icon-carbon-neutral.svg"
            width="20"
            height="20"
            alt=""
          />
          <p className="font-weight: 400; color: #260f08">
            This is a<span className="font-weight: 600">carbon-neutral</span>{" "}
            delivery
          </p>
        </div>
      </div>
      <button className="order_conform" onClick={() => setOrder(true)}>
        Confirm Order
      </button>
    </div>
  );
};
