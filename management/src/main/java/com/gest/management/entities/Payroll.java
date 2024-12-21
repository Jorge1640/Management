package com.gest.management.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "payrolls")
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Min(value = 0)
    @Max(value = 100)
    private int overtimeHours;

    @Column(nullable = false)
    @PositiveOrZero
    private double bonus;

    @Column(nullable = false)
    @PositiveOrZero
    private double deductions;

    @Column(nullable = false)
    private double netPay;

    @Column(nullable = false)
    @NotNull
    private LocalDate payDate;

    @Column(name = "overtime_pay")
    private double overtimePay;

    @Column(name = "gross_salary")
    private double grossSalary;

    @Column(name = "health_insurance")
    private double healthInsurance;

    @Column(name = "pension_contribution")
    private double pensionContribution;

    @Column(name = "tax_deductions")
    private double taxDeductions;

    @Column(name = "transport_allowance")
    private double transportAllowance;

    @Column(name = "food_allowance")
    private double foodAllowance;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;


}
