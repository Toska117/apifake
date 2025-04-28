import React, { useState, useEffect } from 'react';
import { getReviews } from '../services/apiService';
import StarRating from '../components/StarRating';
import styles from './ReviewsPage.module.css';

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsResponse = await getReviews({ limit: 30 });
        setReviews(reviewsResponse.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error al cargar las reseñas.');
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1>Reseñas de Productos</h1>

      {loading && <p className={styles.loadingMessage}>Cargando reseñas...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <div>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className={styles.reviewCard}>
                <h4 className={styles.reviewTitle}>{review.title}</h4>
                <StarRating rating={review.rating} />
                <p className={styles.reviewContent}>{review.content}</p>
                <small className={styles.reviewMeta}>
                  Producto ID: {review.productId} | Usuario ID: {review.userId} | Fecha: {new Date(review.date).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>No se encontraron reseñas.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewsPage; 