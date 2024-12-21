package com.gest.management.services.Employee;

import com.gest.management.dto.EmployeeMapper;
import com.gest.management.dto.EmployeeRequest;
import com.gest.management.entities.Employee;
import com.gest.management.repository.EmployeeRepo;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class EmployeeCommandServiceImpl implements EmployeeServiceCommand{

    private final EmployeeRepo employeeRepo;
    private final EmployeeMapper mapper;

    @Override
    public void createEmployee(EmployeeRequest request) {
        Employee employee = employeeRepo.save(mapper.dtoToEntity(request));

    }

    @Override
    public void editEmployee(Long id, EmployeeRequest request) {
        Optional<Employee> employee = employeeRepo.findById(id);
        if (employee.isPresent()) {
           Employee employee1 = employee.get();
            employee1.setBaseSalary(request.baseSalary());
            employee1.setContractType(request.contractType());
            employee1.setIdentification(request.identification());
            employee1.setLastName(request.lastName());
            employee1.setHireDate(request.hireDate());

        employeeRepo.save(employee1);
        }else {
           throw new EntityNotFoundException("Employee with ID " + id + " not found");
        }

    }

    @Override
    public void deleteEmployee(Long id) {
    employeeRepo.deleteById(id);
    }



}
