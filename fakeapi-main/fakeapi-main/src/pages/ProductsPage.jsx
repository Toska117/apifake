import React, { useState, useEffect, useMemo } from 'react';
import { getProducts, getProductCategories } from '../services/apiService';
import { useFavoritesContext } from '../contexts/FavoritesContext';
import { useCartContext } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import styles from './ProductsPage.module.css';

function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext();
  const { addItem } = useCartContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsResponse = await getProducts({ limit: 50 });
        const categoriesData = await getProductCategories();
        setAllProducts(productsResponse.data || []);
        setCategories(categoriesData || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error al cargar datos. Inténtalo de nuevo.');
        setAllProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const titleMatch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      return titleMatch && categoryMatch;
    });
  }, [allProducts, searchTerm, selectedCategory]);

  const handleFavoriteToggle = (productId) => {
    if (isFavorite(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  const handleAddToCart = (productId) => {
    addItem(productId, 1);
    console.log(`Producto ${productId} añadido al carrito`);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Productos</h1>

      {/* Buscador y Filtro */}
      <div className={styles.controlsContainer}>
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="Buscar productos"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.categorySelect}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de Productos */}
      {loading && <p className={styles.loadingMessage}>Cargando productos...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <div className={styles.productListGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onFavoriteToggle={handleFavoriteToggle}
                onAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <p className={styles.noProductsMessage}>No se encontraron productos que coincidan con la búsqueda o filtro.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsPage; 