package com.gest.management.exceptions;

public class PayrollNotFoundException extends RuntimeException {
    public PayrollNotFoundException(String message) {
        super(message);
    }
}
