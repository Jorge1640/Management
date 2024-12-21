package com.gest.management.repository;

import com.gest.management.entities.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee,Long> {
    List<Employee> findByLastName(String lastName);



}
