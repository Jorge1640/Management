package com.gest.management.services.Payroll;

import com.gest.management.domain.PayrollCalculationResult;
import com.gest.management.entities.Employee;
import com.gest.management.entities.Payroll;
import org.springframework.stereotype.Service;

@Service
public class PayrollCalculationService {
    public PayrollCalculationResult calculatePayroll(Employee employee, Payroll payroll) {
        double baseSalary = employee.getBaseSalary();
        double overtimePay = calculateOvertimePay(baseSalary, payroll.getOvertimeHours());
        double healthInsurance = calculateHealthInsurance(baseSalary);
        double pensionContribution = calculatePensionContribution(baseSalary);
        double taxDeductions = calculateTaxDeductions(baseSalary, overtimePay, payroll.getBonus());
        double transportAllowance = calculateTransportAllowance();
        double foodAllowance = calculateFoodAllowance();
        double grossSalary = calculateGrossSalary(baseSalary, overtimePay, payroll.getBonus(), transportAllowance, foodAllowance);
        double netPay = calculateNetPay(grossSalary, healthInsurance, pensionContribution, taxDeductions, payroll.getDeductions());

        return new PayrollCalculationResult(
                overtimePay,
                healthInsurance,
                pensionContribution,
                taxDeductions,
                transportAllowance,
                foodAllowance,
                grossSalary,
                netPay
        );
    }

    private double calculateOvertimePay(double baseSalary, int overtimeHours) {
        double hourlyRate = baseSalary / 240; // Asumiendo 30 días x 8 horas
        return hourlyRate * 1.5 * overtimeHours;
    }

    private double calculateHealthInsurance(double baseSalary) {
        return baseSalary * 0.04; //4% del salario base
    }

    private double calculatePensionContribution(double baseSalary) {
        return baseSalary * 0.04; // 4% del salario base
    }

    private double calculateTaxDeductions(double baseSalary, double overtimePay, double bonus) {
        double taxableIncome = baseSalary + overtimePay + bonus;
        if (taxableIncome <= 5000) {
            return taxableIncome * 0.10;
        } else if (taxableIncome <= 10000) {
            return taxableIncome * 0.15;
        } else {
            return taxableIncome * 0.20;
        }
    }

    private double calculateTransportAllowance() {
        return 100.0; //subsidio fijo de transporte
    }

    private double calculateFoodAllowance() {
        return 10.0 * 30; //subsidio de alimentación basado en días trabajados
    }

    private double calculateGrossSalary(double baseSalary, double overtimePay, double bonus,
                                        double transportAllowance, double foodAllowance) {
        return baseSalary + overtimePay + bonus + transportAllowance + foodAllowance;
    }

    private double calculateNetPay(double grossSalary, double healthInsurance,
                                   double pensionContribution, double taxDeductions, double deductions) {
        return grossSalary - (healthInsurance + pensionContribution + taxDeductions + deductions);
    }
}
