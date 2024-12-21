package com.gest.management.controller;


import com.gest.management.dto.EmployeeRequest;
import com.gest.management.dto.EmployeeResponse;
import com.gest.management.exceptions.EmployeeNotFoundException;
import com.gest.management.services.Employee.EmployeeServiceCommand;
import com.gest.management.services.Employee.EmployeeServiceQuery;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeServiceQuery employeeServiceQuery;
    private final EmployeeServiceCommand employeeServiceCommand;

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) throws EmployeeNotFoundException {
        EmployeeResponse response = employeeServiceQuery.findById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        List<EmployeeResponse> employees = employeeServiceQuery.findAllEmployee();
        return ResponseEntity.ok(employees);
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<String> handleEmployeeNotFoundException(EmployeeNotFoundException ex) {
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Void> createEmployee(@RequestBody @Valid EmployeeRequest request) {
        employeeServiceCommand.createEmployee(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEmployee(
            @PathVariable Long id,
            @RequestBody EmployeeRequest request) {
        employeeServiceCommand.editEmployee(id, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeServiceCommand.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
