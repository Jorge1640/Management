package com.gest.management.services.Payroll;

import com.gest.management.dto.PayrollMapper;
import com.gest.management.dto.PayrollResponse;
import com.gest.management.entities.Payroll;
import com.gest.management.exceptions.EmployeeNotFoundException;
import com.gest.management.exceptions.PayrollNotFoundException;
import com.gest.management.repository.EmployeeRepo;
import com.gest.management.repository.PayrollRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class PayrollQueryServiceImpl implements PayrollServiceQuery{

    private final PayrollMapper payrollMapper;
    private final PayrollRepo payrollRepo;
    private final EmployeeRepo employeeRepo;

    @Override
    public PayrollResponse getPayrollById(Long payrollId) {
        Payroll payroll = payrollRepo.findById(payrollId).orElseThrow(() -> new PayrollNotFoundException("Payroll not found with: " + payrollId));
        return payrollMapper.entitytoDto(payroll);
    }

    @Override
    public List<PayrollResponse> getAllPayrolls() {
        return payrollMapper.toPayrollResponseList(payrollRepo.findAll());
    }

    @Override
    public List<PayrollResponse> getPayrollsByEmployeeId(Long employeeId) throws EmployeeNotFoundException {
        List<Payroll> payrolls = payrollRepo.findAllByEmployeeId(employeeId);

        if (payrolls.isEmpty()) {
            throw new EmployeeNotFoundException("No payrolls found for employee ID: " + employeeId);
        }

        return payrollMapper.toPayrollResponseList(payrolls);
    }

    @Override
    public List<PayrollResponse> findAllByEmployeeId(Long employeeId) {
        List<Payroll> payrolls = payrollRepo.findAllByEmployeeId(employeeId);
        return payrollMapper.toPayrollResponseList(payrolls);
    }

    @Override
    public List<PayrollResponse> findByEmployee_FirstName(String firstName) {
        List<Payroll> payrolls = payrollRepo.findPayrollByEmployee_FirstName(firstName);
        return payrollMapper.toPayrollResponseList(payrolls);
    }

    @Override
    public List<PayrollResponse> findPayrollByPayDateBetween(LocalDate startDate, LocalDate endDate) {
        log.info("Buscando nóminas entre {} y {}", startDate, endDate);
        List<Payroll> payrolls = payrollRepo.findPayrollByPayDateBetween(startDate, endDate);
        log.info("Nóminas encontradas: {}", payrolls.size());
        return payrollMapper.toPayrollResponseList(payrolls);
    }

    @Override
    public List<PayrollResponse> findPayrollByNetPayGreaterThan(double netPay) {
        List<Payroll> payrolls = payrollRepo.findPayrollByNetPayGreaterThan(netPay);
        return payrollMapper.toPayrollResponseList(payrolls);
    }

    @Override
    public long countByEmployeeId(Long employeeId) {
        return payrollRepo.countByEmployeeId(employeeId);
    }

    @Override
    public List<PayrollResponse> findPayrollByEmployeeContractType(String contractType) {
        List<Payroll> payrolls = payrollRepo.findPayrollByEmployeeContractType(contractType);

        return payrollMapper.toPayrollResponseList(payrolls);
    }


}
