package com.gest.management.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record PayrollRequest(
        @NotNull(message = "Employee ID is required")
        @Positive(message = "Employee ID must be greater than zero")
        Long employeeId,

        @NotNull(message = "Overtime hours is required")
        @Min(value = 0, message = "Overtime hours cannot be negative")
        @Max(value = 100, message = "Overtime hours cannot exceed 100")
        int overtimeHours,

        @PositiveOrZero(message = "Bonus cannot be negative")
        double bonus,

        @PositiveOrZero(message = "Deductions cannot be negative")
        double deductions,

        @NotNull(message = "Pay date is required")
        @PastOrPresent(message = "Pay date cannot be in the future")
        LocalDate payDate
) {}