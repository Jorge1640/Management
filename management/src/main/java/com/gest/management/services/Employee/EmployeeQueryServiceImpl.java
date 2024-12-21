package com.gest.management.services.Employee;

import com.gest.management.dto.EmployeeMapper;
import com.gest.management.dto.EmployeeResponse;
import com.gest.management.entities.Employee;
import com.gest.management.exceptions.EmployeeNotFoundException;
import com.gest.management.repository.EmployeeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class EmployeeQueryServiceImpl implements EmployeeServiceQuery{

    private final EmployeeMapper mapper;
    private final EmployeeRepo repo;

    @Override
    public EmployeeResponse findById(Long id) throws EmployeeNotFoundException {
        Employee employee = repo.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee not found with: " + id));
        return mapper.entityToDto(employee);
    }

    @Override
    public List<EmployeeResponse> findAllEmployee() {
        return mapper.toEmployeeResponseList(repo.findAll());
    }
}
