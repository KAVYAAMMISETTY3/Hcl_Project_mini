package com.js.library_management.models;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
 
@Entity
@Table(name = "books")
public class Book {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    private String title;
 
    private String author;
    private String isbn;
 
    private String category;
    private LocalDate publishedDate;
    private int quantity;
    private boolean available;
    private String imageUrl; 

@Column(length = 1000)
private String description;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
 
    
	// Getters & Setters
    public Long getId() { return id; }
    public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setId(Long id) { this.id = id; }
 
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
 
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
 
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
 
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
 