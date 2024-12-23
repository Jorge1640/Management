package com.gest.management.services.Payroll;

import com.gest.management.domain.PayrollCalculationResult;
import com.gest.management.entities.Employee;
import com.gest.management.entities.Payroll;


public interface PayrollCalculationService {

    PayrollCalculationResult calculatePayroll(Employee employee, Payroll payroll);


    double calculateOvertimePay(double baseSalary, int overtimeHours);

    double calculateHealthInsurance(double baseSalary);


    double calculatePensionContribution(double baseSalary);


    double calculateTaxDeductions(double baseSalary, double overtimePay, double bonus);


    double calculateTransportAllowance();


    double calculateFoodAllowance();


    double calculateGrossSalary(double baseSalary, double overtimePay, double bonus,
                                double transportAllowance, double foodAllowance);


    double calculateNetPay(double grossSalary, double healthInsurance,
                           double pensionContribution, double taxDeductions, double deductions);
}
