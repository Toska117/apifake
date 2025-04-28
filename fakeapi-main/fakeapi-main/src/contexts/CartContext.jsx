import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

// Estado inicial: cargar desde localStorage
const loadInitialState = () => {
  const savedCart = localStorage.getItem('shoppingCart');
  return savedCart ? JSON.parse(savedCart) : { items: {} }; // items: { productId: quantity }
};

// Reducer para manejar acciones del carrito
function cartReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, quantity = 1 } = action.payload;
      const currentQuantity = state.items[productId] || 0;
      newState = {
        ...state,
        items: {
          ...state.items,
          [productId]: currentQuantity + quantity,
        },
      };
      break;
    }
    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      const { [productId]: _, ...remainingItems } = state.items; // Extraer y descartar el item
      newState = { ...state, items: remainingItems };
      break;
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) { // Si la cantidad es 0 o menos, eliminar el item
        const { [productId]: _, ...remainingItems } = state.items;
        newState = { ...state, items: remainingItems };
      } else {
        newState = {
          ...state,
          items: {
            ...state.items,
            [productId]: quantity,
          },
        };
      }
      break;
    }
    case 'CLEAR_CART':
      newState = { items: {} };
      break;
    default:
      throw new Error(`Acción desconocida: ${action.type}`);
  }
  // Guardar en localStorage después de cada cambio
  localStorage.setItem('shoppingCart', JSON.stringify(newState));
  return newState;
}

// Proveedor del contexto
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  const addItem = (productId, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { productId, quantity } });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartItemsArray = Object.entries(state.items).map(([productId, quantity]) => ({
    productId: parseInt(productId, 10), // Asegurar que el ID sea número
    quantity,
  }));

  const totalItems = Object.values(state.items).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <CartContext.Provider value={{ cartState: state, cartItems: cartItemsArray, totalItems, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado
export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
} 