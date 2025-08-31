package com.js.library_management.controller;


import com.js.library_management.dto.UserLoginDTO;
import com.js.library_management.dto.UserRegisterDTO;
import com.js.library_management.dto.UserResponseDTO;
import com.js.library_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {
 
    @Autowired
    private UserService userService;
 
    // Register new user
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRegisterDTO dto) {
        return ResponseEntity.ok(userService.registerUser(dto));
    }
 
    // Login
    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginDTO dto) {
        return userService.login(dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build()); // Unauthorized
    }
 
    // Get all users
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
 
    // Get user by id
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
 
    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
