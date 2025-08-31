package com.js.library_management.dto;

import java.time.LocalDate;

public class BookRequestDTO {
    private String title;
    private String author;
    private String category;
    private String isbn;
    private LocalDate publishedDate;
    private int quantity;
    private boolean available;
    private String imageUrl; 
    private String description;
    
    

//    private int totalCopies;
//    private double price;
 
    // Getters & Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
 
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
 
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

//    public int getTotalCopies() { return totalCopies; }
//    public void setTotalCopies(int totalCopies) { this.totalCopies = totalCopies; }
// 
//    public double getPrice() { return price; }
//    public void setPrice(double price) { this.price = price; }

    public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getIsbn() {
		return isbn;
	}
	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	public LocalDate getPublishedDate() {
		return publishedDate;
	}
	public void setPublishedDate(LocalDate publishedDate) {
		this.publishedDate = publishedDate;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public boolean isAvailable() {
		return available;
	}
	public void setAvailable(boolean available) {
		this.available = available;
	}
	
}