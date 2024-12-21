package com.gest.management.services.Employee;


import com.gest.management.dto.EmployeeRequest;
import com.gest.management.dto.PayrollRequest;

public interface EmployeeServiceCommand {

    public void createEmployee(EmployeeRequest request);

    public void editEmployee(Long id,EmployeeRequest request);

    public void deleteEmployee(Long id);




}
