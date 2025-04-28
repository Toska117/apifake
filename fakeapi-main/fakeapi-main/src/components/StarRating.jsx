import React from 'react';
import styles from './StarRating.module.css'; // Crear CSS Module

// Componente reutilizable para mostrar estrellas
const StarRating = ({ rating = 0 }) => { // Default a 0
  const roundedRating = Math.round(rating * 2) / 2; // Redondear a .5 más cercano
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<span key={i} className={styles.starFilled}>★</span>);
    } else if (i === fullStars + 1 && hasHalfStar) {
      // Podríamos usar un icono de media estrella si tuviéramos una librería de iconos
      stars.push(<span key={i} className={styles.starHalf}>★</span>); // Usar estrella llena por ahora
    } else {
      stars.push(<span key={i} className={styles.starEmpty}>☆</span>);
    }
  }
  // No mostrar el número si el rating es 0 o inválido
  const ratingText = rating > 0 ? `(${rating.toFixed(1)})` : '';

  return <div className={styles.starRatingContainer}>{stars} {ratingText}</div>;
};

export default StarRating; 