import React, { useState, useEffect, useMemo } from 'react';
import { useCartContext } from '../contexts/CartContext';
import { getProducts } from '../services/apiService';
import styles from './CartPage.module.css'; // Importar CSS Module

// Estilos (podrían moverse a CSS)
const cartItemStyle = {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  padding: '1rem 0',
  gap: '1rem',
};

const itemImageStyle = {
  width: '80px',
  height: '80px',
  objectFit: 'contain',
};

const itemDetailsStyle = {
  flexGrow: 1,
};

const quantityControlStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const buttonStyle = {
  padding: '0.3rem 0.6rem',
  cursor: 'pointer',
};

const removeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  marginLeft: '1rem',
};

const totalStyle = {
  marginTop: '1rem',
  paddingTop: '1rem',
  borderTop: '2px solid #ccc',
  textAlign: 'right',
  fontSize: '1.2em',
  fontWeight: 'bold',
};

function CartPage() {
  const { cartItems, totalItems, addItem, removeItem, updateQuantity, clearCart } = useCartContext();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todos los productos para obtener detalles (nombre, precio, imagen)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const productsResponse = await getProducts({ limit: 100 });
        setAllProducts(productsResponse.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error al cargar datos de productos para el carrito.');
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };
    if (cartItems.length > 0) {
        fetchAllProducts();
    } else {
        setLoading(false);
        setAllProducts([]);
    }
  }, [cartItems.length]);

  // Combinar datos del carrito (ID, cantidad) con detalles del producto (nombre, precio, imagen)
  const detailedCartItems = useMemo(() => {
    if (loading || error || allProducts.length === 0) return [];
    return cartItems.map(cartItem => {
      const productDetails = allProducts.find(p => p.id === cartItem.productId);
      return {
        ...cartItem,
        ...productDetails,
      };
    }).filter(item => item.title);
  }, [cartItems, allProducts, loading, error]);

  // Calcular el total del carrito
  const cartTotal = useMemo(() => {
    return detailedCartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }, [detailedCartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity)) {
      updateQuantity(productId, quantity);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Carrito de Compras</h1>

      {loading && <p className={styles.loadingMessage}>Cargando datos del carrito...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <div>
          {detailedCartItems.length > 0 ? (
            <div>
              {detailedCartItems.map(item => (
                <div key={item.productId} className={styles.cartItem}>
                  <img src={item.image} alt={item.title} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <p className={styles.itemPrice}>${item.price?.toFixed(2)}</p>
                  </div>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 0} // Cambiado a <= 0 para permitir eliminar via input
                    >
                      -
                    </button>
                    <input
                       type="number"
                       value={item.quantity}
                       onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                       className={styles.quantityInput}
                       min="0" // Permitir 0 para eliminar via input
                     />
                    <button
                       className={styles.quantityButton}
                       onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className={styles.removeButton}
                    aria-label="Eliminar producto del carrito"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <div className={styles.totalsContainer}>
                <span className={styles.cartTotal}>
                  Total ({totalItems} items): ${cartTotal.toFixed(2)}
                </span>
                 <button onClick={clearCart} className={styles.clearCartButton}>Vaciar Carrito</button>
              </div>
            </div>
          ) : (
            <p className={styles.emptyCartMessage}>Tu carrito está vacío.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CartPage; 