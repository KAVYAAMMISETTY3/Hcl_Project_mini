package com.js.library_management.service;

import com.js.library_management.dto.BorrowRequestDTO;
import com.js.library_management.dto.ReturnRequestDTO;
import com.js.library_management.dto.TransactionResponseDTO;
import com.js.library_management.models.Book;
import com.js.library_management.models.Transaction;
import com.js.library_management.models.User;
import com.js.library_management.repository.BookRepository;
import com.js.library_management.repository.TransactionRepository;
import com.js.library_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;
    private static final int BORROW_DAYS = 14;
    private static final double FINE_PER_DAY = 10.0;
    public TransactionResponseDTO borrowBook(BorrowRequestDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        if (book.getQuantity() <= 0) {
            throw new RuntimeException("No copies available");
        }
        // decrease book stock
        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);
        Transaction transaction = new Transaction();
        transaction.setUser(user);
        transaction.setBook(book);
        transaction.setBorrowDate(LocalDate.now());
        transaction.setDueDate(LocalDate.now().plusDays(BORROW_DAYS));
        transaction.setFine(0.0);
        Transaction saved = transactionRepository.save(transaction);
        return mapToDTO(saved);
    }
    public TransactionResponseDTO returnBook(ReturnRequestDTO request) {
        Transaction transaction = transactionRepository.findById(request.getTransactionId())
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        if (transaction.getReturnDate() != null) {
            throw new RuntimeException("Book already returned");
        }
        transaction.setReturnDate(LocalDate.now());
        // increase book stock
        Book book = transaction.getBook();
        book.setQuantity(book.getQuantity() + 1);
        bookRepository.save(book);
        // calculate fine
        if (transaction.getReturnDate().isAfter(transaction.getDueDate())) {
            long daysLate = ChronoUnit.DAYS.between(transaction.getDueDate(), transaction.getReturnDate());
            transaction.setFine(daysLate * FINE_PER_DAY);
        }
        Transaction saved = transactionRepository.save(transaction);
        return mapToDTO(saved);
    }
    public List<TransactionResponseDTO> getUserTransactions(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return transactionRepository.findByUser(user).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    public List<TransactionResponseDTO> getAllTransactions() {
        return transactionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    private TransactionResponseDTO mapToDTO(Transaction transaction) {
        return new TransactionResponseDTO(
                transaction.getId(),
                transaction.getUser().getName(),
                transaction.getBook().getTitle(),
                transaction.getBorrowDate(),
                transaction.getDueDate(),
                transaction.getReturnDate(),
                transaction.getFine()
        );
    }
}