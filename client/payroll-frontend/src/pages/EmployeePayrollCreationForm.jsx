import React, { useState } from 'react';
import { Plus, User, DollarSign, Calendar } from 'lucide-react';
// src/pages/EmployeePayrollCreationForm.jsx
import apiService from '../services/APIServiceConfiguration';

const EmployeeCreation = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Employee form state
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    identification: '',
    baseSalary: '',
    contractType: 'FULL_TIME',
    hireDate: ''
  });

  // Validación del formulario antes de enviar
  const validateForm = () => {
    const errors = [];
    
    if (employeeData.firstName.length < 2 || employeeData.firstName.length > 50) {
      errors.push("First name must be between 2 and 50 characters");
    }
    
    if (employeeData.lastName.length < 2 || employeeData.lastName.length > 50) {
      errors.push("Last name must be between 2 and 50 characters");
    }
    
    if (!/^[0-9]{10}$/.test(employeeData.identification)) {
      errors.push("Identification must be 10 digits");
    }
    
    if (!employeeData.baseSalary || employeeData.baseSalary <= 0) {
      errors.push("Base salary must be greater than zero");
    }
    
    if (!['FULL_TIME', 'PART_TIME', 'TEMPORARY'].includes(employeeData.contractType)) {
      errors.push("Invalid contract type");
    }
    
    if (!employeeData.hireDate) {
      errors.push("Hire date is required");
    }
    
    return errors;
  };

  // Handle employee form input changes
  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Create employee using the API service
  const createEmployee = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    // Validar antes de enviar
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      setIsLoading(false);
      return;
    }

    // Preparar los datos en el formato correcto
    const employeePayload = {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      identification: employeeData.identification,
      baseSalary: parseFloat(employeeData.baseSalary),
      contractType: employeeData.contractType,
      hireDate: employeeData.hireDate,
      isActive: true
    };

    try {
      await apiService.post('/employees', employeePayload);

      // Reset form after successful creation
      setEmployeeData({
        firstName: '',
        lastName: '',
        identification: '',
        baseSalary: '',
        contractType: 'FULL_TIME',
        hireDate: ''
      });

      setSuccess('Employee created successfully!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Employee</h2>

        {/* Error Handling */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
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
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}

        {/* Employee Creation Form */}
        <form onSubmit={createEmployee} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">First Name</label>
              <div className="flex items-center border rounded-lg">
                <User className="ml-3 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  required
                  minLength="2"
                  maxLength="50"
                  value={employeeData.firstName}
                  onChange={handleEmployeeChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Enter first name"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2">Last Name</label>
              <div className="flex items-center border rounded-lg">
                <User className="ml-3 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  required
                  minLength="2"
                  maxLength="50"
                  value={employeeData.lastName}
                  onChange={handleEmployeeChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Enter last name"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2">Identification</label>
            <div className="flex items-center border rounded-lg">
              <User className="ml-3 text-gray-400" />
              <input
                type="text"
                name="identification"
                required
                pattern="[0-9]{10}"
                value={employeeData.identification}
                onChange={handleEmployeeChange}
                className="w-full p-2 rounded-lg"
                placeholder="Enter 10 digit identification"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Base Salary</label>
              <div className="flex items-center border rounded-lg">
                <DollarSign className="ml-3 text-gray-400" />
                <input
                  type="number"
                  name="baseSalary"
                  required
                  min="0.01"
                  step="0.01"
                  value={employeeData.baseSalary}
                  onChange={handleEmployeeChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Base salary"
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2">Contract Type</label>
              <select
                name="contractType"
                value={employeeData.contractType}
                onChange={handleEmployeeChange}
                className="w-full p-2 border rounded-lg"
                required
                disabled={isLoading}
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="TEMPORARY">Temporary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2">Hire Date</label>
            <div className="flex items-center border rounded-lg">
              <Calendar className="ml-3 text-gray-400" />
              <input
                type="date"
                name="hireDate"
                required
                max={new Date().toISOString().split('T')[0]}
                value={employeeData.hireDate}
                onChange={handleEmployeeChange}
                className="w-full p-2 rounded-lg"
                disabled={isLoading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`w-full flex items-center justify-center p-3 ${
              isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
            } text-white rounded-lg`}
            disabled={isLoading}
          >
            <Plus className="mr-2" /> 
            {isLoading ? 'Creating Employee...' : 'Create Employee'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeCreation;