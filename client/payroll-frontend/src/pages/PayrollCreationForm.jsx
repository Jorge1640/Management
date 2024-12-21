import React, { useState } from 'react';
import { Save, DollarSign, Calendar, User } from 'lucide-react';
import apiService from '../services/APIServiceConfiguration'; // Asegúrate de tener la ruta correcta

const PayrollCreationForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [payrollData, setPayrollData] = useState({
    employeeId: '',
    overtimeHours: 0,
    bonus: 0,
    deductions: 0,
    payDate: ''
  });

  // Mantener la misma lógica de validación y manejo de datos
  const validateForm = () => {
    const errors = [];
    if (!payrollData.employeeId || payrollData.employeeId <= 0) {
      errors.push("Employee ID must be greater than zero");
    }
    if (payrollData.overtimeHours < 0 || payrollData.overtimeHours > 100) {
      errors.push("Overtime hours must be between 0 and 100");
    }
    if (payrollData.bonus < 0) {
      errors.push("Bonus cannot be negative");
    }
    if (payrollData.deductions < 0) {
      errors.push("Deductions cannot be negative");
    }
    if (!payrollData.payDate) {
      errors.push("Pay date is required");
    } else {
      const today = new Date();
      const payDate = new Date(payrollData.payDate);
      if (payDate > today) {
        errors.push("Pay date cannot be in the future");
      }
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayrollData(prev => ({
      ...prev,
      [name]: name === 'employeeId' ? parseInt(value) || '' :
              name === 'overtimeHours' ? parseInt(value) || 0 :
              name === 'bonus' || name === 'deductions' ? parseFloat(value) || 0 :
              value
    }));
  };

  const createPayroll = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    const payrollPayload = {
      employeeId: parseInt(payrollData.employeeId),
      overtimeHours: parseInt(payrollData.overtimeHours),
      bonus: parseFloat(payrollData.bonus),
      deductions: parseFloat(payrollData.deductions),
      payDate: payrollData.payDate
    };

    try {
      // Usar el servicio API en lugar de fetch directo
      await apiService.post('/payroll', payrollPayload);
      
      setSuccess('Payroll created successfully!');
      // Limpiar el formulario
      setPayrollData({
        employeeId: '',
        overtimeHours: 0,
        bonus: 0,
        deductions: 0,
        payDate: ''
      });
    } catch (error) {
      console.error('Payroll creation error:', error);
      setError(error.message || 'Error creating payroll');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-gray-100">
          {/* Header Section */}
          <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <h2 className="text-3xl font-bold text-center">Create Payroll</h2>
            <p className="text-blue-100 text-center mt-2">Enter payroll details below</p>
          </div>

          <div className="p-8">
            {/* Notifications */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={createPayroll} className="space-y-6">
              {/* Employee ID Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="employeeId"
                    required
                    min="1"
                    value={payrollData.employeeId}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                    placeholder="Enter employee ID"
                  />
                </div>
              </div>

              {/* Overtime Hours Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Overtime Hours
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="overtimeHours"
                    required
                    min="0"
                    max="100"
                    value={payrollData.overtimeHours}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                    placeholder="Enter overtime hours"
                  />
                </div>
              </div>

              {/* Bonus and Deductions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bonus
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="bonus"
                      min="0"
                      step="0.01"
                      value={payrollData.bonus}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                      placeholder="Enter bonus amount"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Deductions
                  </label>
                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="deductions"
                      min="0"
                      step="0.01"
                      value={payrollData.deductions}
                      onChange={handleInputChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                      placeholder="Enter deductions amount"
                    />
                  </div>
                </div>
              </div>

              {/* Pay Date Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="payDate"
                    required
                    max={new Date().toISOString().split('T')[0]}
                    value={payrollData.payDate}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
              >
                <Save className="mr-2 h-5 w-5" />
                Create Payroll
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollCreationForm;