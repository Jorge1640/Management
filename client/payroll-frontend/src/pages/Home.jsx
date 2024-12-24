import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/BrutalistButton.module.css';
import { Building2, Users, LineChart } from 'lucide-react';





const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-800">PayrollPro</span>
            </div>
            <button
              onClick={handleLogin}
              className={styles.brutalistButton}
            >
              <div className={styles.msLogo}>
                <div className={styles.msLogoSquare}></div>
                <div className={styles.msLogoSquare}></div>
                <div className={styles.msLogoSquare}></div>
                <div className={styles.msLogoSquare}></div>
              </div>
              <div className={styles.buttonText}>
                <span>Usuario</span>
                <span>Login</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Sistema de Nómina</span>
            <span className="block text-blue-600">Profesional y Eficiente</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Gestiona la nómina de tu empresa de manera eficiente y segura con nuestra plataforma integral.
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={() => navigate('/payroll')}
            className="flex items-center gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all"
          >
            <LineChart className="h-5 w-5" />
            Dashboard
          </button>
          <button
            onClick={() => navigate('/employee')}
            className="flex items-center gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-md transition-all"
          >
            <Users className="h-5 w-5" />
            Área de Usuario
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center p-6">
              <div className="mx-auto h-12 w-12 text-blue-600">
                <LineChart className="h-12 w-12" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Análisis en Tiempo Real</h3>
              <p className="mt-2 text-base text-gray-500">
                Monitorea y analiza los datos de nómina en tiempo real.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto h-12 w-12 text-blue-600">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Gestión de Empleados</h3>
              <p className="mt-2 text-base text-gray-500">
                Administra fácilmente la información de tus empleados.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto h-12 w-12 text-blue-600">
                <Building2 className="h-12 w-12" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Multi-empresa</h3>
              <p className="mt-2 text-base text-gray-500">
                Gestiona múltiples empresas desde una única plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;