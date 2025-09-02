package com.js.library_management.service;

import com.js.library_management.dto.UserLoginDTO;
import com.js.library_management.dto.UserRegisterDTO;
import com.js.library_management.dto.UserResponseDTO;
import com.js.library_management.models.User;
import com.js.library_management.enums.Role;
import com.js.library_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
 
@Service
public class UserService {
 
    @Autowired
    private UserRepository userRepository;
    //admin
    
    public Optional<UserResponseDTO> adminLogin(UserLoginDTO dto) {
        String adminEmail = "admin@library.com";
        String adminPassword = "Admin@123"; // You can hash this if needed

        if (dto.getEmail().equals(adminEmail) && dto.getPassword().equals(adminPassword)) {
            return Optional.of(new UserResponseDTO(0L, "Admin", adminEmail, Role.ADMIN));
        }

        return Optional.empty();
    }
    public boolean existsByEmail(String email) {
    	return userRepository.findByEmail(email).isPresent();
    }
 
    // Register new user
    public UserResponseDTO registerUser(UserRegisterDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); //  later: hash password
        user.setRole(Role.USER);
 
        User saved = userRepository.save(user);
        return new UserResponseDTO(saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }
 
    // Login
    public Optional<UserResponseDTO> login(UserLoginDTO dto) {
        return userRepository.findByEmail(dto.getEmail())
                .filter(user -> user.getPassword().equals(dto.getPassword()))
                .map(user -> new UserResponseDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()));
    }
 
    // Get all users
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()))
                .collect(Collectors.toList());
    }
 
    // Get user by ID
    public Optional<UserResponseDTO> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserResponseDTO(user.getId(), user.getName(), user.getEmail(), user.getRole()));
    }
 
    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    
    
}

