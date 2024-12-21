package com.gest.management.dto;

import java.time.LocalDate;

public record EmployeeResponse(Long id,
        String firstName,
         String lastName,
         String identification,
         double baseSalary,
         String contractType,
         LocalDate hireDate,
        boolean isActive) {
}
