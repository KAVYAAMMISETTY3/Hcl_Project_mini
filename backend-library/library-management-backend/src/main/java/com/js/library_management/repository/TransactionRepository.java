package com.js.library_management.repository;


import com.js.library_management.models.Transaction;
import com.js.library_management.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
}