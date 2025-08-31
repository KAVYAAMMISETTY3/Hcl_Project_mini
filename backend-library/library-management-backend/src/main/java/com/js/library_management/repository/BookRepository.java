package com.js.library_management.repository;

import com.js.library_management.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
 
import java.util.List;
 
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByTitleContainingIgnoreCase(String keyword);
    List<Book> findByCategory(String category);
}