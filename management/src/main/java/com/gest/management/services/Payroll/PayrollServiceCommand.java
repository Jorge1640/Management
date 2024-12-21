package com.gest.management.services.Payroll;

import com.gest.management.dto.PayrollRequest;
import com.gest.management.dto.PayrollResponse;
import com.gest.management.exceptions.EmployeeNotFoundException;

public interface PayrollServiceCommand {

    PayrollResponse createPayroll(PayrollRequest request) throws EmployeeNotFoundException;

    public void editPayroll(Long payrollId,PayrollRequest request);

    public void deletePayroll(Long payrollId);
}
