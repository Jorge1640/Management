package com.gest.management.repository;

import com.gest.management.entities.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PayrollRepo extends JpaRepository<Payroll,Long> {
    List<Payroll> findAllByEmployeeId(Long employeeId);


    List<Payroll> findPayrollByPayDateBetween(LocalDate startDate, LocalDate endDate);

    List<Payroll> findPayrollByNetPayGreaterThan(double netPay);

    long countByEmployeeId(Long employeeId);

    @Query("SELECT p FROM Payroll p WHERE p.employee.contractType = :contractType")
    List<Payroll> findPayrollByEmployeeContractType(@Param("contractType") String contractType);

    List<Payroll> findPayrollByEmployee_FirstName(String firstName);


}
