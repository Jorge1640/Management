import React, { useState, useEffect } from 'react';
import { 
  Search, Edit, Trash2, Plus, Filter, X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/BrutalistButton.module.css';


const PayrollDashboard = () => {
  const navigate = useNavigate();
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [filters, setFilters] = useState({
    firstName: '',
    startDate: '',
    endDate: '',
    contractType: '',
    minNetPay: ''
  });

  // Base API URL
  const BASE_URL = 'http://localhost:8080/api/v1/payroll';
  // Centralized fetch method with error handling
  const fetchData = async (url, errorMessage = 'Error fetching data') => {
    try {
      const response = await fetch(url, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      return await response.json();
    } catch (error) {
      console.error(errorMessage, error);
      setError(errorMessage);
      return [];
    }
};

  // Fetch all payrolls
  const fetchPayrolls = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchData(BASE_URL, 'Error when loading payroll');
      setPayrolls(data);
    } finally {
      setLoading(false);
    }
  };

  // Apply multiple filters
  const applyFilters = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = BASE_URL;
      const params = [];

      // Add filters based on input
      if (filters.firstName) {
        url = `${BASE_URL}/employee/firstname/${encodeURIComponent(filters.firstName)}`;
      }

      if (filters.contractType) {
        url = `${BASE_URL}/employee/contract-type/${filters.contractType}`;
      }

      if (filters.startDate && filters.endDate) {
        url = `${BASE_URL}/date-range?startDate=${filters.startDate}&endDate=${filters.endDate}`;
      }

      if (filters.minNetPay) {
        url = `${BASE_URL}/net-pay/greater-than/${filters.minNetPay}`;
      }

      // Fetch filtered data
      const data = await fetchData(url, 'Error al aplicar filtros');
      
      // Update payrolls or show message if no results
      if (data.length === 0) {
        setError('No se encontraron resultados con los filtros aplicados');
      }
      setPayrolls(data);
    } finally {
      setLoading(false);
    }
  };

  // Delete payroll method
  const deletePayroll = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta nómina?')) return;
    
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar nómina');
      }

      await fetchPayrolls();
    } catch (error) {
      console.error('Error al eliminar nómina:', error);
      setError('No se pudo eliminar la nómina');
    }
};

  const createNewPayroll = () => {
    navigate('/create');
  };

  // Edit payroll (placeholder)
  const editPayroll = (payroll) => {
    // TODO: Implement actual edit logic
    alert(`Editar nómina para ${payroll.employee.firstName} ${payroll.employee.lastName}`);
  };

  // View payroll details
  const viewPayrollDetails = (payroll) => {
    setSelectedPayroll(payroll);
  };

  // Close payroll details modal
  const closePayrollDetails = () => {
    setSelectedPayroll(null);
  };
   // Navigation handlers
   const handleNewPayroll = () => {
    navigate('/createPayroll');
  };

  const handleNewEmployee = () => {
    navigate('/create');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Initial load
  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          {/* Header and New Payroll Button */}
          <div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold">Dashboard de Nóminas</h2>
  <div className="flex space-x-4">
      <button 
      onClick={handleNewPayroll}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      <Plus className="w-4 h-4 mr-2" />
      New Payroll
    </button>
  </div>
</div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {/* Filters Section */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input 
              type="text"
              placeholder="Nombre del empleado"
              value={filters.firstName}
              onChange={(e) => setFilters(prev => ({ ...prev, firstName: e.target.value }))}
              className="px-4 py-2 border rounded-lg"
            />
            
            <select 
              value={filters.contractType}
              onChange={(e) => setFilters(prev => ({ ...prev, contractType: e.target.value }))}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="">Tipo de Contrato</option>
              <option value="FULL_TIME">Tiempo Completo</option>
              <option value="PART_TIME">Medio Tiempo</option>
            </select>

            <div className="flex items-center space-x-2">
              <label>Desde:</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                className="px-4 py-2 border rounded-lg"
              />
              <label>Hasta:</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                className="px-4 py-2 border rounded-lg"
              />
            </div>

            <input 
              type="number"
              placeholder="Salario Mínimo"
              value={filters.minNetPay}
              onChange={(e) => setFilters(prev => ({ ...prev, minNetPay: e.target.value }))}
              className="px-4 py-2 border rounded-lg w-32"
            />

            <button 
              onClick={applyFilters}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Filter className="w-4 h-4 mr-2" />
              Aplicar Filtros
            </button>
          </div>

          {/* Payrolls Table */}
          {loading ? (
            <div className="flex-col gap-4 w-full flex items-center justify-center py-4">
              <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full">
                </div>
              </div>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">Empleado</th>
                  <th className="px-6 py-3 text-left">Fecha</th>
                  <th className="px-6 py-3 text-left">Salario Base</th>
                  <th className="px-6 py-3 text-left">Pago Neto</th>
                  <th className="px-6 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.length > 0 ? (
                  payrolls.map((payroll) => (
                    <tr 
                      key={payroll.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => viewPayrollDetails(payroll)}
                    >
                      <td className="px-6 py-4">
                        {payroll.employee.firstName} {payroll.employee.lastName}
                      </td>
                      <td className="px-6 py-4">{payroll.payDate}</td>
                      <td className="px-6 py-4">${payroll.employee.baseSalary.toFixed(2)}</td>
                      <td className="px-6 py-4">${payroll.netPay.toFixed(2)}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button 
                          className="text-blue-500 hover:bg-blue-100 p-1 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            editPayroll(payroll);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-500 hover:bg-red-100 p-1 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePayroll(payroll.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No hay nóminas disponibles
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Payroll Details Modal */}
      {selectedPayroll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative">
            <button 
              onClick={closePayrollDetails} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6">Detalles de Nómina</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Información del Empleado</h3>
                <p>Nombre: {selectedPayroll.employee.firstName} {selectedPayroll.employee.lastName}</p>
                <p>ID: {selectedPayroll.employee.id}</p>
                <p>Identificación: {selectedPayroll.employee.identification}</p>
                <p>Tipo de Contrato: {selectedPayroll.employee.contractType}</p>
                <p>Fecha de Contratación: {selectedPayroll.employee.hireDate}</p>
                <p>Estado: {selectedPayroll.employee.isActive ? 'Activo' : 'Inactivo'}</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Detalles de Nómina</h3>
                <p>Salario Base: ${selectedPayroll.employee.baseSalary.toFixed(2)}</p>
                <p>Salario Bruto: ${selectedPayroll.grossSalary.toFixed(2)}</p>
                <p>Pago Neto: ${selectedPayroll.netPay.toFixed(2)}</p>
                <p>Fecha de Pago: {selectedPayroll.payDate}</p>
                
                <h4 className="font-semibold mt-4">Deducciones</h4>
                <p>Horas Extra: {selectedPayroll.overtimeHours} hrs</p>
                <p>Pago de Horas Extra: ${selectedPayroll.overtimePay.toFixed(2)}</p>
                <p>Bono: ${selectedPayroll.bonus.toFixed(2)}</p>
                <p>Seguro de Salud: ${selectedPayroll.healthInsurance.toFixed(2)}</p>
                <p>Contribución de Pensión: ${selectedPayroll.pensionContribution.toFixed(2)}</p>
                <p>Deducciones de Impuestos: ${selectedPayroll.taxDeductions.toFixed(2)}</p>
                <p>Total de Deducciones: ${selectedPayroll.deductions.toFixed(2)}</p>
                
                <h4 className="font-semibold mt-4">Asignaciones</h4>
                <p>Asignación de Transporte: ${selectedPayroll.transportAllowance.toFixed(2)}</p>
                <p>Asignación de Alimentación: ${selectedPayroll.foodAllowance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PayrollDashboard;