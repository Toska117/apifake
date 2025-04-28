import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/apiService';
import styles from './UsersPage.module.css';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Podríamos añadir estado para paginación si fuera necesario

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Cargar la primera página de usuarios (la API pagina por defecto)
        const usersResponse = await getUsers({ limit: 20 }); // Pedir 20 usuarios
        setUsers(usersResponse.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los usuarios.');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h1>Usuarios</h1>

      {loading && <p className={styles.loadingMessage}>Cargando usuarios...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && (
        <div>
          {users.length > 0 ? (
            users.map(user => (
              <div key={user.id} className={styles.userCard}>
                <h3 className={styles.userName}>
                  {user.name?.firstname} {user.name?.lastname} ({user.username})
                </h3>
                <p className={styles.userContact}>Email: {user.email}</p>
                <p className={styles.userContact}>Teléfono: {user.phone}</p>
                {user.address && (
                  <div className={styles.userAddress}>
                    <strong>Dirección:</strong><br />
                    {user.address.street}<br />
                    {user.address.city}, {user.address.zipcode}<br />
                    {user.address.country}
                  </div>
                )}
                {/* Podríamos mostrar un enlace a sus órdenes si tuviéramos una vista de detalle */}
                {/* <p>Órdenes: {user.orders?.join(', ')}</p> */}
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>No se encontraron usuarios.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UsersPage; 