package com.gest.management.services.Payroll;

import com.gest.management.dto.PayrollResponse;
import com.gest.management.exceptions.EmployeeNotFoundException;

import java.time.LocalDate;
import java.util.List;

public interface PayrollServiceQuery {

    PayrollResponse getPayrollById(Long payrollId);

    List<PayrollResponse> getAllPayrolls();

    List<PayrollResponse> getPayrollsByEmployeeId(Long employeeId) throws EmployeeNotFoundException;

    List<PayrollResponse> findAllByEmployeeId(Long employeeId);

    List<PayrollResponse> findByEmployee_FirstName(String firstName);
    List<PayrollResponse> findPayrollByPayDateBetween(LocalDate startDate, LocalDate endDate);

    List<PayrollResponse> findPayrollByNetPayGreaterThan(double netPay);

    long countByEmployeeId(Long employeeId);

    List<PayrollResponse> findPayrollByEmployeeContractType(String contractType);


}
