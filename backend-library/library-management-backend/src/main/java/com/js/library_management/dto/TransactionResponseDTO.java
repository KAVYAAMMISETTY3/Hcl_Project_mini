package com.js.library_management.dto;

import java.time.LocalDate;

public class TransactionResponseDTO {
    private Long transactionId;
    private String userName;
    private String bookTitle;
    private LocalDate borrowDate;
    private LocalDate returnDate;
    private Double fine;

    public TransactionResponseDTO(Long transactionId, String userName, String bookTitle,
                                  LocalDate borrowDate, LocalDate returnDate, Double fine) {
        this.transactionId = transactionId;
        this.userName = userName;
        this.bookTitle = bookTitle;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.fine = fine;
    }

    // Getters and setters
    public Long getTransactionId() { return transactionId; }
    public String getUserName() { return userName; }
    public String getBookTitle() { return bookTitle; }
    public LocalDate getBorrowDate() { return borrowDate; }
    public LocalDate getReturnDate() { return returnDate; }
    public Double getFine() { return fine; }

    public void setTransactionId(Long transactionId) { this.transactionId = transactionId; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }
    public void setBorrowDate(LocalDate borrowDate) { this.borrowDate = borrowDate; }
    public void setReturnDate(LocalDate returnDate) { this.returnDate = returnDate; }
    public void setFine(Double fine) { this.fine = fine; }
}
