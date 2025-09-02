package com.js.library_management.dto;

public class BorrowRequestDTO {
    private Long userId;
    private Long bookId;
 
    public BorrowRequestDTO() {
    }
 
    public BorrowRequestDTO(Long userId, Long bookId) {
        this.userId = userId;
        this.bookId = bookId;
    }
 
    public Long getUserId() {
        return userId;
    }
 
    public void setUserId(Long userId) {
        this.userId = userId;
    }
 
    public Long getBookId() {
        return bookId;
    }
 
    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }
}
