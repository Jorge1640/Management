import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Define la URL base de tu API
const API_BASE_URL = 'http://localhost:8080'; // Ajusta esto según tu puerto

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Función para verificar el estado de autenticación
  const checkAuth = async () => {
    try {
      // Primero verificamos el estado de autenticación
      const statusResponse = await fetch(`${API_BASE_URL}/api/v1/auth/check`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        
        if (statusData.authenticated) {
          // Si está autenticado, obtenemos la información del usuario
          const userResponse = await fetch(`${API_BASE_URL}/api/v1/auth/user-info`, {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            throw new Error('Error al obtener información del usuario');
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar autenticación al montar el componente
  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    try {
      // Redirigir al endpoint de login de OAuth2
      window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Asumiendo que tienes un endpoint de logout en el backend
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};