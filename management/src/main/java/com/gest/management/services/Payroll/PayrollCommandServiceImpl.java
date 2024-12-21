package com.gest.management.services.Payroll;

import com.gest.management.domain.PayrollCalculationResult;
import com.gest.management.dto.PayrollMapper;
import com.gest.management.dto.PayrollRequest;
import com.gest.management.dto.PayrollResponse;
import com.gest.management.entities.Employee;
import com.gest.management.entities.Payroll;
import com.gest.management.exceptions.EmployeeNotFoundException;
import com.gest.management.repository.EmployeeRepo;
import com.gest.management.repository.PayrollRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class PayrollCommandServiceImpl implements PayrollServiceCommand {

    private final PayrollMapper payrollMapper;
    private final PayrollRepo payrollRepo;
    private final EmployeeRepo employeeRepo;
    private final PayrollCalculationService payrollCalculationService;


    @Override
    public void editPayroll(Long payrollId, PayrollRequest request) {
        Optional<Payroll> payroll = payrollRepo.findById(payrollId);
        if (payroll.isPresent()) {
            Payroll payroll1 = payroll.get();
            payroll1.setOvertimeHours(request.overtimeHours());
            payroll1.setBonus(request.bonus());
        }
    }

    @Override
    public void deletePayroll(Long payrollId) {
        payrollRepo.deleteById(payrollId);
    }

    public PayrollResponse createPayroll(PayrollRequest request) throws EmployeeNotFoundException {

        Employee employee = employeeRepo.findById(request.employeeId())
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));


        Payroll payroll = new Payroll();
        payroll.setEmployee(employee);
        payroll.setOvertimeHours(request.overtimeHours());
        payroll.setBonus(request.bonus());
        payroll.setDeductions(request.deductions());
        payroll.setPayDate(request.payDate());

        PayrollCalculationResult calculationResult = payrollCalculationService.calculatePayroll(employee, payroll);

        payroll.setOvertimePay(calculationResult.getOvertimePay());
        payroll.setHealthInsurance(calculationResult.getHealthInsurance());
        payroll.setPensionContribution(calculationResult.getPensionContribution());
        payroll.setTaxDeductions(calculationResult.getTaxDeductions());
        payroll.setTransportAllowance(calculationResult.getTransportAllowance());
        payroll.setFoodAllowance(calculationResult.getFoodAllowance());
        payroll.setGrossSalary(calculationResult.getGrossSalary());
        payroll.setNetPay(calculationResult.getNetPay());

        return payrollMapper.entitytoDto(payrollRepo.save(payroll));
    }
}
