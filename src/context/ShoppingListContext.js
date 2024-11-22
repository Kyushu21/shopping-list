import React, { createContext, useReducer, useEffect } from 'react';

const ShoppingListContext = createContext();

const shoppingListReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload;
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    case 'EDIT_PRODUCT':
      return state.map(product => product._id === action.payload._id ? action.payload : product);
    case 'DELETE_PRODUCT':
      return state.filter(product => product._id !== action.payload);
    case 'TOGGLE_PRODUCT':
      return state.map(product => product._id === action.payload._id ? { ...product, purchased: !product.purchased } : product);
    default:
      return state;
  }
};

const ShoppingListProvider = ({ children }) => {
  const [shoppingList, dispatch] = useReducer(shoppingListReducer, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();
      dispatch({ type: 'SET_PRODUCTS', payload: data });
    };

    fetchProducts();
  }, []);

  return (
    <ShoppingListContext.Provider value={{ shoppingList, dispatch }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export { ShoppingListContext, ShoppingListProvider };