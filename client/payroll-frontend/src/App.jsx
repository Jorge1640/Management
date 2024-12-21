import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useLocation
} from 'react-router-dom';
import PayrollDashboard from './pages/PayrollDashboard';
import EmployeePayrollCreationForm from './pages/EmployeePayrollCreationForm';
import PayrollCreationForm from './pages/PayrollCreationForm';
import Login from './pages/Login';
import Home from './pages/Home';
import Employee from './pages/Employee';
import { AuthProvider, useAuth } from './context/AuthContext';

// Componente para proteger rutas
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirige a login y guarda la ubicación anterior
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

// Componente para manejar errores
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { logout } = useAuth();

  React.useEffect(() => {
    const handleError = async (error) => {
      setHasError(true);
      setError(error);
      // Si es error 401, hacer logout y redirigir a login
      if (error.status === 401) {
        await logout();
        window.location.href = '/login';
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [logout]);

  if (hasError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Algo salió mal</h1>
          <p className="text-gray-600">{error?.message || 'Error desconocido'}</p>
        </div>
      </div>
    );
  }

  return children;
};

// Componente para redirigir desde login si ya está autenticado
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const from = location.state?.from || '/';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            {/* Rutas públicas */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route path="/" element={<Home />} />

            {/* Rutas protegidas */}
            <Route
              path="/payroll"
              element={
                <ProtectedRoute>
                  <PayrollDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <ProtectedRoute>
                  <Employee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <EmployeePayrollCreationForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createPayroll"
              element={
                <ProtectedRoute>
                  <PayrollCreationForm />
                </ProtectedRoute>
              }
            />

            {/* Ruta para manejar URLs no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;