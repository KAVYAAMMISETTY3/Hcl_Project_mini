package com.js.library_management.controller;

import com.js.library_management.dto.*;
import com.js.library_management.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

//    @PostMapping("/register")
//    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserRegisterDTO dto) {
//        return ResponseEntity.ok(userService.registerUser(dto));
//    }
   

//        @PostMapping("/register")
//        public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDTO dto, BindingResult result) {
//            if (result.hasErrors()) {
//                Map<String, String> errors = new HashMap<>();
//                result.getFieldErrors().forEach(error ->
//                    errors.put(error.getField(), error.getDefaultMessage())
//                );
//                return ResponseEntity.badRequest().body(errors);
//            }
//
//            try {
//                UserResponseDTO response = userService.registerUser(dto);
//                return ResponseEntity.ok(response);
//            } catch (IllegalArgumentException ex) {
//                return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
//            }
//        }
    
    @PostMapping("/register")    
    public ResponseEntity<?> register(@Valid @RequestBody UserRegisterDTO user, BindingResult result) {        
    if (result.hasErrors()) {            
    List<String> errors = result.getFieldErrors()
    .stream().map(error -> error.getField() + ": " + error.getDefaultMessage())                    
    .toList();            
    return ResponseEntity.badRequest().body(errors);       
    }   
    if (userService.existsByEmail(user.getEmail())) {          
    	  return ResponseEntity.badRequest().body("Email already registered!");      
    	  }   
     return ResponseEntity.ok(userService.registerUser(user));
    }
   
    


    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserLoginDTO dto) {
        return userService.login(dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
