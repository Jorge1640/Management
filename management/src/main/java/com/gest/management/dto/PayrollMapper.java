package com.gest.management.dto;

import com.gest.management.entities.Payroll;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {EmployeeMapper.class})
    public interface PayrollMapper {
        @Mapping(source = "employeeId", target = "employee.id")
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "employee", ignore = true)
        @Mapping(target = "netPay", ignore = true)
        @Mapping(target = "overtimePay", ignore = true)
        @Mapping(target = "grossSalary", ignore = true)
        @Mapping(target = "healthInsurance", ignore = true)
        @Mapping(target = "pensionContribution", ignore = true)
        @Mapping(target = "taxDeductions", ignore = true)
        @Mapping(target = "transportAllowance", ignore = true)
        @Mapping(target = "foodAllowance", ignore = true)
        Payroll dtotoEntity(PayrollRequest request);

        @Mapping(source = "employee", target = "employee")
        PayrollResponse entitytoDto(Payroll payroll);



    default List<PayrollResponse> toPayrollResponseList(List<Payroll> payrolls) {
        return payrolls.stream()
                .map(this::entitytoDto)
                .toList();
    }
}

