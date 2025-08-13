import { useEffect, useState } from "react";
import "./index.css";
import {
  addProduct,
  addProductCount,
  delProduct,
  delProductCount,
  deleteAll,
} from "./app/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "./utils";
import { Order } from "./components/Order";
import { ProductCard } from "./components/ProductCard";

function App() {
  const BASE_URL = "https://json-api.uz/api/project/dessertss/desserts";
  const [data, setData] = useState(null);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    fetch(BASE_URL).then((data) =>
      data
        .json()
        .then((data) => setData(data))
        .catch((error) => console.log(error.message))
    );
  }, []);
  const dispatch = useDispatch();
  const product = useSelector((store) => store.product);

  return (
    <>
      <header className="header"></header>
      <main className="main">
        <div className="card_container container">
          <div className="card__list__wrapper">
            <h1 className="card__list__title">Desserts</h1>
            <ul className="card__list">
              {data &&
                data.data.map((p) => {
                  return <ProductCard key={p.id} p={p} />;
                })}
            </ul>
          </div>
          <div className="your__card__wrapper">
            <h3 className="your__card__title">
              Your Cart (<span id="card__counter">{product.totalCount}</span>)
            </h3>
            <div
              className={`your__card__default ${
                product.bascet.length > 0 ? "none" : "flex"
              }`}
            >
              <img src="/images/illustration-empty-cart.svg" alt="" />
              <p className="your__card__default-title">
                Your added items will appear here
              </p>
            </div>
            <div
              className={product.bascet.length > 0 ? "" : "your__card__active"}
            >
              <ul className="your__card__active__list">
                {product.bascet.map((item) => {
                  return (
                    <>
                      <li key={item.id} className="your__card__active__item">
                        <div className="your__card__active__item-wrapper">
                          <h3 className="your__card__active__title">
                            {item.name}
                          </h3>
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
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 1.25C5.125 1.25 1.25 5.125 1.25 10C1.25 14.875 5.125 18.75 10 18.75C14.875 18.75 18.75 14.875 18.75 10C18.75 5.125 14.875 1.25 10 1.25ZM10 17.5C5.875 17.5 2.5 14.125 2.5 10C2.5 5.875 5.875 2.5 10 2.5C14.125 2.5 17.5 5.875 17.5 10C17.5 14.125 14.125 17.5 10 17.5Z"
                              fill="#AD8A85"
                            />
                            <path
                              d="M13.375 14.375L10 11L6.625 14.375L5.625 13.375L9 10L5.625 6.625L6.625 5.625L10 9L13.375 5.625L14.375 6.625L11 10L14.375 13.375L13.375 14.375Z"
                              fill="#AD8A85"
                            />
                          </svg>
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
                    </>
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
                    This is a
                    <span className="font-weight: 600">carbon-neutral</span>{" "}
                    delivery
                  </p>
                </div>
              </div>
              <button className="order_conform" onClick={() => setOrder(true)}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
        {order && <Order product={product} setOrder={setOrder} />}
      </main>
      <footer className="footer"></footer>
    </>
  );
}

export default App;
