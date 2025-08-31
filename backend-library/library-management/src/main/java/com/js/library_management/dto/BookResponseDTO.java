package com.js.library_management.dto;

import java.time.LocalDate;
public class BookResponseDTO {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String category;
    private LocalDate publishedDate;
    private int quantity;
    private boolean available;
    private String imageUrl;
    private String description;

    public BookResponseDTO(Long id, String title, String author, String category, String isbn,
                           LocalDate publishedDate, int quantity, boolean available, String imageUrl,String description) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.isbn = isbn;
        this.publishedDate = publishedDate;
        this.quantity = quantity;
        this.available = available;
        this.imageUrl = imageUrl;
        this.description=description;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getCategory() { return category; }
    public String getIsbn() { return isbn; }
    public LocalDate getPublishedDate() { return publishedDate; }
    public int getQuantity() { return quantity; }
    public boolean isAvailable() { return available; } // ✅ FIXED
    public String getImageUrl() { return imageUrl; }
    public String getDescription() { return description; }
}
