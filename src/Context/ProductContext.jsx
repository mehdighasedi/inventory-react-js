import { createContext, useContext, useEffect, useReducer, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorage";

const ProductContext = createContext();

function productReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return [...state, action.payload];
    case "REMOVE_PRODUCTS":
      return state.filter((products) => products.id !== action.payload);
    case "UPDATE_PRODUCTS":
      return state.map((products) =>
        products.id === action.payload.id ? { ...products, ...action.payload } : products,
      );
    default:
      throw new Error("خطایی رخ داده است");
  }
}

export function ProductProvider({ children }) {
  const [storedProducts, setStoredProducts] = useLocalStorageState("products", []);
  const [products, dispatch] = useReducer(productReducer, storedProducts);

  useEffect(() => {
    setStoredProducts(products);
  }, [products, setStoredProducts]);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductsProvider");
  return context;
}
