import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';

const navStyles = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  height: '60px',
  backgroundColor: '#f0f0f0',
  borderTop: '1px solid #ccc',
  padding: '0 10px',
};

const linkStyles = {
  textDecoration: 'none',
  color: '#333',
  padding: '10px',
  borderRadius: '5px',
  textAlign: 'center',
};

const activeLinkStyles = {
  fontWeight: 'bold',
  color: '#007bff',
  backgroundColor: '#e0e0e0',
};

const badgeStyle = {
  backgroundColor: 'red',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: '0.7em',
  position: 'absolute',
  top: '5px',
  right: '5px',
};

function BottomNav() {
  const { totalItems } = useCartContext();

  return (
    <nav style={navStyles}>
      <NavLink
        to="/"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles
        }
      >
        Productos
      </NavLink>
      <NavLink
        to="/cart"
        style={({ isActive }) => ({
          ...linkStyles,
          position: 'relative',
          ...(isActive && activeLinkStyles),
        })}
      >
        Carrito
        {totalItems > 0 && (
          <span style={badgeStyle}>{totalItems}</span>
        )}
      </NavLink>
      <NavLink
        to="/users"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles
        }
      >
        Usuarios
      </NavLink>
      <NavLink
        to="/reviews"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles
        }
      >
        Reseñas
      </NavLink>
      <NavLink
        to="/favorites"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles
        }
      >
        Favoritos
      </NavLink>
      <NavLink
        to="/orders"
        style={({ isActive }) =>
          isActive ? { ...linkStyles, ...activeLinkStyles } : linkStyles
        }
      >
        Órdenes
      </NavLink>
    </nav>
  );
}

export default BottomNav; 