import { createSlice } from "@reduxjs/toolkit";

const updateTotel = (state) => {
  let totalCount = 0;
  let totalPrice = 0;
  state.bascet.map((product) => {
    totalCount += product.count;
    totalPrice += product.price * product.count;
  });
  return { totalCount, totalPrice };
};

const saveLocalStore = (state) => {
  localStorage.setItem("products", JSON.stringify(state));
};

const initialState = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : { bascet: [], totalCount: 0, totalPrice: 0 };

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.bascet = [...state.bascet, payload];
      const { totalCount, totalPrice } = updateTotel(state);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveLocalStore(state);
    },
    delProduct: (state, { payload }) => {
      state.bascet = state.bascet.filter((product) => product.id != payload);
      const { totalCount, totalPrice } = updateTotel(state);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveLocalStore(state);
    },
    addProductCount: (state, { payload }) => {
      state.bascet = state.bascet.map((product) => {
        if (product.id == payload) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
      const { totalCount, totalPrice } = updateTotel(state);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveLocalStore(state);
    },
    delProductCount: (state, { payload }) => {
      state.bascet = state.bascet.map((product) => {
        if (product.id == payload) {
          return { ...product, count: product.count - 1 };
        } else {
          return product;
        }
      });
      const { totalCount, totalPrice } = updateTotel(state);
      state.totalCount = totalCount;
      state.totalPrice = totalPrice;
      saveLocalStore(state);
    },
    deleteAll: (state) => {
      state.bascet = [];
      state.totalCount = 0;
      state.totalPrice = 0;
      localStorage.removeItem("products");
    },
  },
});

export const {
  addProduct,
  addProductCount,
  delProduct,
  delProductCount,
  deleteAll,
} = product.actions;
export default product.reducer;
