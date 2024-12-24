import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, AlertCircle, Loader } from 'lucide-react';
import apiService from '../services/APIServiceConfiguration';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.get('/employees');
      setEmployees(data);
    } catch (error) {
      setError('No se pudieron cargar los empleados. Por favor, intente nuevamente.');
      console.error('Error loading employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id, employeeName) => {
    if (window.confirm(`¿Está seguro que desea eliminar a ${employeeName}?`)) {
      try {
        await apiService.delete(`/employees/${id}`);
        loadEmployees();
      } catch (error) {
        setError('Error al eliminar el empleado. Por favor, intente nuevamente.');
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await apiService.get(`/employees/${id}`);
      setCurrentEmployee(response);
      navigate(`/create?id=${id}`);
    } catch (error) {
      setError('Error al cargar los detalles del empleado.');
      console.error('Error fetching employee details:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No especificada';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <div className="text-lg text-gray-600">Cargando empleados...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Empleados</h1>
          <p className="text-gray-600 mt-2">
            {employees.length} empleado{employees.length !== 1 ? 's' : ''} registrado{employees.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => navigate('/create')}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Nuevo Empleado</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Nombre Completo', 'Identificación', 'Salario Base', 'Tipo Contrato', 'Fecha Contratación', 'Acciones'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <AlertCircle className="w-12 h-12 mb-4 text-gray-400" />
                      <p className="text-lg font-medium">No hay empleados registrados</p>
                      <p className="text-sm mt-1">Comience agregando un nuevo empleado</p>
                    </div>
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr 
                    key={employee.id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {`${employee.firstName || ''} ${employee.lastName || ''}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {employee.identification || 'Sin identificación'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${employee.baseSalary?.toLocaleString('es-ES') || '0'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                        {employee.contractType || 'No especificado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(employee.hireDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(employee.id)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-4 transition-colors duration-150"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(employee.id, `${employee.firstName} ${employee.lastName}`)}
                        className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors duration-150"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;