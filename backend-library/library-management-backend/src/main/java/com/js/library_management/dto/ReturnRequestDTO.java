package com.js.library_management.dto;
 
public class ReturnRequestDTO {
    private Long transactionId;
 
    public ReturnRequestDTO() {
    }
 
    public ReturnRequestDTO(Long transactionId) {
        this.transactionId = transactionId;
    }
 
    public Long getTransactionId() {
        return transactionId;
    }
 
    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }
}