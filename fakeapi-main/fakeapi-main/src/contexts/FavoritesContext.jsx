import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const FavoritesContext = createContext();

// Crear el proveedor del contexto
export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    // Cargar favoritos desde localStorage al inicio
    const savedFavorites = localStorage.getItem('favoriteProductIds');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Guardar favoritos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('favoriteProductIds', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const addFavorite = (productId) => {
    setFavoriteIds((prevIds) => {
      if (!prevIds.includes(productId)) {
        return [...prevIds, productId];
      }
      return prevIds; // No añadir si ya existe
    });
  };

  const removeFavorite = (productId) => {
    setFavoriteIds((prevIds) => prevIds.filter((id) => id !== productId));
  };

  const isFavorite = (productId) => {
    return favoriteIds.includes(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook personalizado para usar el contexto (opcional pero recomendado)
export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
} 