import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  addProductCount,
  delProduct,
  delProductCount,
} from "../app/features/productSlice";
import { formatNumber } from "../utils";

export const ProductCard = ({ p }) => {
  const { name, image, id, category, price } = p;
  const dispatch = useDispatch();
  const product = useSelector((store) => store.product);
  const count = product.bascet.find((i) => i.id == id);

  return (
    <li className="card__item">
      <figure>
        <img
          className={`card__image ${count ? "active" : ""}`}
          src={image.desktop}
          alt={name}
        />
        <button
          className={`add_to_card ${count ? "none" : "flex"}`}
          onClick={() => {
            dispatch(
              addProduct({
                id,
                count: 1,
                price,
                name,
                category,
                image: image.desktop,
              })
            );
          }}
        >
          <img
            src="/images/icon-add-to-cart.svg"
            width="20"
            height="20"
            alt="shopping svg image"
          />
          <span>Add to Cart</span>
        </button>
        <div
          className={`add_to_card-active 
                            ${count ? "flex" : "none"}
                          `}
        >
          <button
            className="minus-count"
            onClick={() => {
              count.count > 1
                ? dispatch(delProductCount(id))
                : dispatch(delProduct(id));
            }}
          >
            <div className="round product">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path fill="none" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </div>
          </button>
          <span className="add-count">{count ? count.count : 0}</span>
          <button
            className="plus-count"
            onClick={() => {
              dispatch(addProductCount(id));
            }}
          >
            <div className="round product">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="none"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </div>
          </button>
        </div>
      </figure>
      <div className="card__item__info">
        <h4 className="card__item__info-title">{category}</h4>
        <h3 className="card__item__info-description">{name}</h3>
        <span className="card__item__info-price">{formatNumber(price)}</span>
      </div>
    </li>
  );
};
