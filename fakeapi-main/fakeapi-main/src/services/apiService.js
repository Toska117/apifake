import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fakeapi.net', // Según la documentación
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener productos con paginación, búsqueda y filtros
export const getProducts = async (params = {}) => {
  try {
    // La API espera price como JSON stringificado si es un rango
    if (params.price && typeof params.price === 'object') {
      params.price = JSON.stringify(params.price);
    }
    const response = await apiClient.get('/products', { params });
    // La API devuelve los datos dentro de un objeto { data: [], pagination: {} }
    return response.data; // Devolvemos el objeto completo { data, pagination }
  } catch (error) {
    console.error('Error fetching products:', error);
    // Podríamos lanzar el error o devolver un objeto de error estandarizado
    throw error;
  }
};

// Función para obtener categorías de productos
export const getProductCategories = async () => {
  try {
    const response = await apiClient.get('/products/categories');
    return response.data; // Devuelve un array de strings
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
};

// Función para obtener usuarios
export const getUsers = async (params = {}) => {
  try {
    const response = await apiClient.get('/users', { params });
    // Devuelve { data: [], pagination: {} }
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Función para obtener reseñas
export const getReviews = async (params = {}) => {
  try {
    const response = await apiClient.get('/reviews', { params });
    // Devuelve { data: [], pagination: {} }
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Función para obtener órdenes
export const getOrders = async (params = {}) => {
  try {
    const response = await apiClient.get('/orders', { params });
    // Devuelve { data: [], pagination: {} }
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Podríamos añadir funciones para orders, etc. aquí más tarde

export default apiClient; // Exportar la instancia por si se necesita directamente 