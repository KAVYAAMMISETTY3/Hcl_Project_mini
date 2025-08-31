package com.js.library_management.service;

import com.js.library_management.dto.BookRequestDTO;
import com.js.library_management.dto.BookResponseDTO;
import com.js.library_management.models.Book;
import com.js.library_management.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import java.util.List;
import java.util.stream.Collectors;
 
@Service
public class BookService {
 
    @Autowired
    private BookRepository bookRepository;
 
    // Add new book
    public BookResponseDTO addBook(BookRequestDTO dto) {
        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setCategory(dto.getCategory());
        book.setIsbn(dto.getIsbn());
        book.setPublishedDate(dto.getPublishedDate());
        book.setQuantity(dto.getQuantity());
        book.setAvailable(dto.isAvailable());
        book.setImageUrl(dto.getImageUrl());
        book.setDescription(dto.getDescription());
        
        
//        book.setTotalCopies(dto.getTotalCopies());
//        book.setAvailableCopies(dto.getTotalCopies());
//        book.setPrice(dto.getPrice());
 
        Book saved = bookRepository.save(book);
        return toResponseDTO(saved);
    }
 
    // Get all books
    public List<BookResponseDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(this::toResponseDTO).collect(Collectors.toList());
    }
 
    // Get book by ID
    public BookResponseDTO getBookById(Long id) {
        return bookRepository.findById(id).map(this::toResponseDTO).orElse(null);
    }
 
    // Delete book
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
 
    // Search books by title keyword
    public List<BookResponseDTO> searchBooks(String keyword) {
        return bookRepository.findByTitleContainingIgnoreCase(keyword)
                .stream().map(this::toResponseDTO).collect(Collectors.toList());
    }
 
    // Helper: convert entity to DTO
    private BookResponseDTO toResponseDTO(Book book) {
        return new BookResponseDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getCategory(),
//                book.getTotalCopies(),
//                book.getAvailableCopies(),
//                book.getPrice()
                book.getIsbn(),
                book.getPublishedDate(),
                book.getQuantity(),
                book.isAvailable(),
                book.getImageUrl(),
                book.getDescription()
        );
    }
}