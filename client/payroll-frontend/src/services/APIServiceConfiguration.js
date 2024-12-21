

const API_BASE_URL = 'http://localhost:8080/api/v1';

const defaultOptions = {
  credentials: 'include', //enviar las cookies de sesión
  headers: {
    'Content-Type': 'application/json',
  },
};

const handleResponse = async (response) => {

  if (response.redirected) {
    window.location.href = response.url;
    return;
  }

  if (response.status === 401) {
    // Redirigir al login si no está autenticado
    window.location.href = '/login';
    throw new Error('Por favor, inicie sesión para continuar');
  }

  // Intentar obtener el cuerpo de la respuesta como texto primero
  const text = await response.text();
  
  if (!response.ok) {
    // Intentar parsear el texto como JSON
    try {
      const errorData = JSON.parse(text);
      throw new Error(errorData.message || errorData.error || 'Error en la operación');
    } catch (e) {
      // Si no es JSON, usar el texto directamente
      throw new Error(text || 'Error en la operación');
    }
  }

  // Si la respuesta está vacía, retornar null
  if (!text) return null;

  // Intentar parsear la respuesta como JSON
  try {
    return JSON.parse(text);
  } catch (e) {
    // Si no es JSON, retornar el texto
    return text;
  }
};

const apiService = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        method: 'GET',
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  },

  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        method: 'PUT',
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error updating ${endpoint}:`, error);
      throw error;
    }
  },

  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...defaultOptions,
        method: 'DELETE',
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error deleting ${endpoint}:`, error);
      throw error;
    }
  }
};

export default apiService;