package com.js.library_management.controller;

import com.js.library_management.dto.BorrowRequestDTO;
import com.js.library_management.dto.ReturnRequestDTO;
import com.js.library_management.dto.TransactionResponseDTO;
import com.js.library_management.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @PostMapping("/borrow")
    public ResponseEntity<TransactionResponseDTO> borrowBook(@RequestBody BorrowRequestDTO request) {
        return ResponseEntity.ok(transactionService.borrowBook(request));
    }
    @PostMapping("/return")
    public ResponseEntity<TransactionResponseDTO> returnBook(@RequestBody ReturnRequestDTO request) {
        return ResponseEntity.ok(transactionService.returnBook(request));
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TransactionResponseDTO>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getUserTransactions(userId));
    }
    @GetMapping
    public ResponseEntity<List<TransactionResponseDTO>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }
}