import React from 'react';
import { Link } from 'react-router-dom'; // Para futuro enlace a detalle
import styles from './ProductCard.module.css'; // Usaremos CSS Modules

function ProductCard({ product, isFavorite, onFavoriteToggle, onAddToCart }) {
  if (!product) return null; // No renderizar si no hay producto

  return (
    <div className={styles.card}>
      {/* Botón Favoritos */}
      <button
        onClick={() => onFavoriteToggle(product.id)}
        className={styles.favoriteButton}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {/* Imagen del producto (podría ser un Link al detalle) */}
      {/* <Link to={`/products/${product.id}`}> */}
      <img src={product.image} alt={product.title} className={styles.image} />
      {/* </Link> */}

      {/* Detalles del producto */}
      <div className={styles.details}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price?.toFixed(2)}</p>
        <p className={styles.category}>Categoría: {product.category}</p>
      </div>

      {/* Botón Añadir al Carrito */}
      <button
        onClick={() => onAddToCart(product.id)}
        className={styles.addToCartButton}
      >
        Añadir al Carrito
      </button>
    </div>
  );
}

export default ProductCard; 