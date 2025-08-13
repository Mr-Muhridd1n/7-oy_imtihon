import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  addProductCount,
  delProduct,
  delProductCount,
} from "../app/features/productSlice";

export const ProductCard = ({ p }) => {
  const { name, image, id, category, price } = p;
  const dispatch = useDispatch();
  const product = useSelector((store) => store.product);
  const count = product.bascet.find((i) => i.id == id);

  return (
    <li className="card__item">
      <figure>
        <img
          src={image.desktop}
          width="250.67"
          height="240"
          alt={name}
          id={count ? "card__item__image" : ""}
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
            src="../public/images/icon-add-to-cart.svg"
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3334 2.5C14.4584 2.5 17.8334 5.875 17.8334 10C17.8334 14.125 14.4584 17.5 10.3334 17.5C6.20837 17.5 2.83337 14.125 2.83337 10C2.83337 5.875 6.20837 2.5 10.3334 2.5ZM10.3334 1.25C5.52087 1.25 1.58337 5.1875 1.58337 10C1.58337 14.8125 5.52087 18.75 10.3334 18.75C15.1459 18.75 19.0834 14.8125 19.0834 10C19.0834 5.1875 15.1459 1.25 10.3334 1.25Z"
                fill="white"
              />
              <path
                d="M5.33337 9.375H15.3334V10.625H5.33337V9.375Z"
                fill="white"
              />
            </svg>
          </button>
          <span className="add-count">{count ? count.count : 0}</span>
          <button
            className="plus-count"
            onClick={() => {
              dispatch(addProductCount(id));
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.3334 2.5C14.4584 2.5 17.8334 5.875 17.8334 10C17.8334 14.125 14.4584 17.5 10.3334 17.5C6.20837 17.5 2.83337 14.125 2.83337 10C2.83337 5.875 6.20837 2.5 10.3334 2.5ZM10.3334 1.25C5.52087 1.25 1.58337 5.1875 1.58337 10C1.58337 14.8125 5.52087 18.75 10.3334 18.75C15.1459 18.75 19.0834 14.8125 19.0834 10C19.0834 5.1875 15.1459 1.25 10.3334 1.25Z"
                fill="white"
              />
              <path
                d="M15.3334 9.375H10.9584V5H9.70837V9.375H5.33337V10.625H9.70837V15H10.9584V10.625H15.3334V9.375Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </figure>
      <div className="card__item__info">
        <h4 className="card__item__info-title">{category}</h4>
        <h3 className="card__item__info-description">{name}</h3>
        <span className="card__item__info-price">${price}</span>
      </div>
    </li>
  );
};
