package com.js.library_management.repository;

import com.js.library_management.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
 
import java.util.Optional;
 
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
