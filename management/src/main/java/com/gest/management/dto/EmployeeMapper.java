package com.gest.management.dto;

import com.gest.management.entities.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = EmployeeMapper.class)
public interface EmployeeMapper {

    @Mapping(source = "id", target = "id")
    @Mapping(source = "baseSalary", target = "baseSalary")
    @Mapping(source = "contractType", target = "contractType")
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "hireDate", target = "hireDate")
    @Mapping(source = "identification", target = "identification")
    @Mapping(source = "active", target = "isActive")
    @Mapping(source = "lastName", target = "lastName")
    EmployeeResponse entityToDto(Employee employee);



    @Mapping(source = "identification", target = "identification")
    @Mapping(source = "contractType", target = "contractType")
    @Mapping(source = "baseSalary", target = "baseSalary")
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "hireDate", target = "hireDate")
    Employee dtoToEntity(EmployeeRequest dto);


    default List<EmployeeResponse> toEmployeeResponseList(List<Employee> employees) {
        return employees.stream()
                .map(this::entityToDto)
                .toList();
    }

}

