package com.gest.management.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@AllArgsConstructor
@Getter
@Setter
public class PayrollCalculationResult {
    private final double overtimePay;
    private final double healthInsurance;
    private final double pensionContribution;
    private final double taxDeductions;
    private final double transportAllowance;
    private final double foodAllowance;
    private final double grossSalary;
    private final double netPay;
}
