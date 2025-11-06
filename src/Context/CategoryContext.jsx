import { createContext, useContext, useEffect, useReducer, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorage";

const categoryContext = createContext();

function categoryReducer(state, action) {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "REMOVE_CATEGORY":
      return state.filter((category) => category.id !== action.payload);
    case "UPDATE_CATEGORY":
      return state.map((category) =>
        category.id === action.payload.id ? { ...category, ...action.payload } : products,
      );
    default:
      throw new Error("خطایی رخ داده است");
  }
}

export function CategoryProvider({ children }) {
  const [storedCategories, setStoredCategories] = useLocalStorageState("categories", []);
  const [category, dispatch] = useReducer(categoryReducer, storedCategories);

  useEffect(() => {
    setStoredCategories(category);
  }, [category, setStoredCategories]);

  return (
    <categoryContext.Provider value={{ category, dispatch }}>{children}</categoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(categoryContext);
  if (!context) throw new Error("useCategory must be used within a CategoryProvider");
  return context;
}
