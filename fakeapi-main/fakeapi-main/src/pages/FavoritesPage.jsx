import React, { useState, useEffect, useMemo } from 'react';
import { useFavoritesContext } from '../contexts/FavoritesContext';
import { useCartContext } from '../contexts/CartContext';
import { getProducts } from '../services/apiService';
import ProductCard from '../components/ProductCard';
import styles from './FavoritesPage.module.css';

function FavoritesPage() {
  const { favoriteIds, removeFavorite, isFavorite } = useFavoritesContext();
  const { addItem: addToCart } = useCartContext();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const productsResponse = await getProducts({ limit: 100 });
        setAllProducts(productsResponse.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error al cargar datos de productos.');
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      fetchAllProducts();
    } else {
      setLoading(false);
      setAllProducts([]);
    }
  }, [favoriteIds]);

  const favoriteProducts = useMemo(() => {
    if (loading || allProducts.length === 0) return [];
    return allProducts.filter(product => favoriteIds.includes(product.id));
  }, [allProducts, favoriteIds, loading]);

  const handleFavoriteToggle = (productId) => {
    removeFavorite(productId);
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
    console.log(`Producto ${productId} añadido al carrito desde favoritos`);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Favoritos</h1>

      {loading && <p className={styles.loadingMessage}>Cargando favoritos...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <div className={styles.favoritesGrid}>
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={true}
                onFavoriteToggle={handleFavoriteToggle}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className={styles.emptyMessage}>No tienes productos guardados como favoritos.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage; 