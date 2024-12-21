package com.gest.management.controller;


import com.gest.management.dto.PayrollRequest;
import com.gest.management.dto.PayrollResponse;
import com.gest.management.exceptions.EmployeeNotFoundException;
import com.gest.management.services.Payroll.PayrollServiceCommand;
import com.gest.management.services.Payroll.PayrollServiceQuery;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/payroll")
@RequiredArgsConstructor
public class PayrollController {

    private final PayrollServiceCommand payrollService;
    private final PayrollServiceQuery payrollServiceQuery;

    @PostMapping
    public ResponseEntity<PayrollResponse> createPayroll(@RequestBody @Valid PayrollRequest request) throws EmployeeNotFoundException {
        payrollService.createPayroll(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePayroll(
            @PathVariable("id") Long payrollId,
            @RequestBody PayrollRequest request) {
        payrollService.editPayroll(payrollId, request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(@PathVariable("id") Long payrollId) {
        payrollService.deletePayroll(payrollId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PayrollResponse> getPayrollById(@PathVariable("id") Long payrollId) {
        PayrollResponse response = payrollServiceQuery.getPayrollById(payrollId);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PayrollResponse>> getAllPayrolls() {
        List<PayrollResponse> payrolls = payrollServiceQuery.getAllPayrolls();
        return ResponseEntity.ok(payrolls);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<PayrollResponse>> getPayrollsByEmployeeId(
            @PathVariable Long employeeId) throws EmployeeNotFoundException {
        List<PayrollResponse> payrolls = payrollServiceQuery.getPayrollsByEmployeeId(employeeId);
        return ResponseEntity.ok(payrolls);
    }
    @GetMapping("/employee/firstname/{firstName}")
    public ResponseEntity<List<PayrollResponse>> getPayrollByEmployeeFirstName(
            @PathVariable("firstName") String firstName) {
        List<PayrollResponse> payrolls = payrollServiceQuery.findByEmployee_FirstName(firstName);
        return ResponseEntity.ok(payrolls);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<PayrollResponse>> getPayrollsByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<PayrollResponse> payrolls = payrollServiceQuery.findPayrollByPayDateBetween(startDate, endDate);
        return ResponseEntity.ok(payrolls);
    }

    @GetMapping("/net-pay/greater-than/{netPay}")
    public ResponseEntity<List<PayrollResponse>> getPayrollsByNetPayGreaterThan(@PathVariable double netPay) {
        List<PayrollResponse> payrolls = payrollServiceQuery.findPayrollByNetPayGreaterThan(netPay);
        return ResponseEntity.ok(payrolls);
    }

    @GetMapping("/employee/{employeeId}/count")
    public ResponseEntity<Long> countPayrollsByEmployeeId(@PathVariable Long employeeId) {
        long count = payrollServiceQuery.countByEmployeeId(employeeId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/employee/contract-type/{contractType}")
    public ResponseEntity<List<PayrollResponse>> getPayrollsByContractType(@PathVariable String contractType) {
        List<PayrollResponse> payrolls = payrollServiceQuery.findPayrollByEmployeeContractType(contractType);
        return ResponseEntity.ok(payrolls);
    }



}
