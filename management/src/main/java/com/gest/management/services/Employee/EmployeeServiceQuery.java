package com.gest.management.services.Employee;

import com.gest.management.dto.EmployeeResponse;
import com.gest.management.exceptions.EmployeeNotFoundException;

import java.util.List;

public interface EmployeeServiceQuery {

    EmployeeResponse findById(Long id) throws EmployeeNotFoundException;

    List<EmployeeResponse> findAllEmployee();



}
