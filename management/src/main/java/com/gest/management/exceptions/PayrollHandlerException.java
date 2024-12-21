package com.gest.management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class PayrollHandlerException {

    @ExceptionHandler(PayrollNotFoundException.class)
    public ResponseEntity<Map<String, String>> Payrollnotfound(PayrollNotFoundException ex) {
        Map<String, String> resp = new HashMap<>();
        resp.put("Payroll_ERROR", ex.getMessage());
        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

}
