package com.gest.management.dto;

import java.time.LocalDate;

public record PayrollResponse(
        Long id,
        int overtimeHours,
        double bonus,
        double deductions,
        double netPay,
        LocalDate payDate,
        double overtimePay,
        double grossSalary,
        double healthInsurance,
        double pensionContribution,
        double taxDeductions,
        double transportAllowance,
        double foodAllowance,

        EmployeeResponse employee
) {

}
