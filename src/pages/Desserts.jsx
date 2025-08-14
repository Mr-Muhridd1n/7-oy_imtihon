import { delProduct } from "../app/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../utils";
import { Order } from "../components/Order";
import { ProductCard } from "../components/ProductCard";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import { DefaultBascet } from "../components/DefaultBascet";
import { Bascet } from "../components/Bascet";

export const Desserts = () => {
  const BASE_URL = "https://json-api.uz/api/project/dessertss/desserts";
  const [order, setOrder] = useState(false);
  const { data, error, loading } = useFetch(BASE_URL);

  const dispatch = useDispatch();
  const product = useSelector((store) => store.product);

  if (loading) {
    return (
      <section className="flex loading">
        <div className="loading-text">
          <h3>Loading...</h3>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex loading">
        <div className="error-text">
          <h3>{error}</h3>
        </div>
      </section>
    );
  }

  return (
    <>
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
          {product.bascet.length > 0 ? (
            <Bascet setOrder={setOrder} product={product} />
          ) : (
            <DefaultBascet />
          )}
        </div>
      </div>
      {order && <Order product={product} setOrder={setOrder} />}
    </>
  );
};
