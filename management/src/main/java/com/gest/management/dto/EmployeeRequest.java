package com.gest.management.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.util.List;

public record EmployeeRequest (@NotBlank(message = "First name is required")
                               @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
                               String firstName,

                               @NotBlank(message = "Last name is required")
                               @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
                               String lastName,

                               @NotNull(message = "Hire date is required")
                               @NotBlank(message = "Identification is required")
                               @Pattern(regexp = "^[0-9]{10}$", message = "Identification must be 10 digits")
                               String identification,

                               @Positive(message = "Base salary must be greater than zero")
                               @DecimalMin(value = "0.0", message = "Base salary cannot be negative")
                               double baseSalary,

                               @NotBlank(message = "Contract type is required")
                               @Pattern(regexp = "^(FULL_TIME|PART_TIME|TEMPORARY)$", message = "Invalid contract type")
                               String contractType,

                               @NotNull(message = "Hire date is required")
                               @PastOrPresent(message = "Hire date cannot be in the future")
                               LocalDate hireDate
                               ){
}
