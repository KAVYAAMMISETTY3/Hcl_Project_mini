package com.js.library_management.dto;

import java.time.LocalDate;

public class TransactionResponseDTO {
    private Long transactionId;
    private String userName;
    private String bookTitle;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
//    private Double fine;
 
    public TransactionResponseDTO(Long transactionId, String userName, String bookTitle,
                                  LocalDate borrowDate, LocalDate dueDate, LocalDate returnDate /*Double fine*/) {
        this.setTransactionId(transactionId);
        this.setUserName(userName);
        this.setBookTitle(bookTitle);
        this.setBorrowDate(borrowDate);
        this.setDueDate(dueDate);
        this.setReturnDate(returnDate);
//        this.setFine(fine);
    }
 
	public Long getTransactionId() {
		return transactionId;
	}
 
	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}
 
	public String getUserName() {
		return userName;
	}
 
	public void setUserName(String userName) {
		this.userName = userName;
	}
 
	public LocalDate getBorrowDate() {
		return borrowDate;
	}
 
	public void setBorrowDate(LocalDate borrowDate) {
		this.borrowDate = borrowDate;
	}
 
	public LocalDate getDueDate() {
		return dueDate;
	}
 
	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}
 
	public String getBookTitle() {
		return bookTitle;
	}
 
	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}
 
	public LocalDate getReturnDate() {
		return returnDate;
	}
 
	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}
// 
//	public Double getFine() {
//		return fine;
//	}
// 
//	public void setFine(Double fine) {
//		this.fine = fine;
//	}
}