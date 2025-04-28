import React, { useState, useEffect } from 'react';
import { getOrders } from '../services/apiService';
import styles from './OrdersPage.module.css'; // Importar CSS Module

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersResponse = await getOrders({ limit: 20 });
        setOrders(ordersResponse.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error al cargar las órdenes.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1>Historial de Órdenes</h1>

      {loading && <p className={styles.loadingMessage}>Cargando órdenes...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <div>
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id} className={styles.orderCard}>
                <h4 className={styles.orderHeader}>Orden ID: {order.id} (Usuario ID: {order.userId})</h4>
                <div className={styles.orderDetails}>
                    <p><strong>Total:</strong> ${order.totalAmount?.toFixed(2)}</p>
                    <p><strong>Estado:</strong> {order.status}</p>
                    <p><strong>Fecha Orden:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                    {order.deliveryDate && <p><strong>Fecha Entrega:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>}
                </div>
                <strong>Productos:</strong>
                <ul className={styles.productList}>
                  {order.products?.map(item => (
                    <li key={`${order.id}-${item.productId}`} className={styles.productListItem}>
                      ID: {item.productId}, Cantidad: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>No se encontraron órdenes.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OrdersPage; 