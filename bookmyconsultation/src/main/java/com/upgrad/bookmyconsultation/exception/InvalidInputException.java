package com.upgrad.bookmyconsultation.exception;

import java.util.List;

public class InvalidInputException extends Exception{
    private List<String> attributeNames;

    public InvalidInputException(List<String> attributeNames) {
        this.attributeNames = attributeNames;
    }

    public List<String> getAttributeNames() {
        return attributeNames;
    }
}
