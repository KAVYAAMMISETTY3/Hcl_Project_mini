package com.js.library_management.controller;


import com.js.library_management.dto.*;
import com.js.library_management.enums.Role;
import com.js.library_management.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
 
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
 
import java.util.*;
 
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
 
class UserControllerTest {
 
    @Mock
    private UserService userService;
 
    @Mock
    private BindingResult bindingResult;
 
    @InjectMocks
    private UserController userController;
 
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
 
    // 🔹 Register - success
    @Test
    void testRegisterSuccess() {
        UserRegisterDTO dto = new UserRegisterDTO();
        dto.setEmail("user@example.com");
        dto.setName("User");
        dto.setPassword("pass");
 
        UserResponseDTO responseDTO = new UserResponseDTO(1L, "User", "user@example.com", Role.USER);
 
        when(bindingResult.hasErrors()).thenReturn(false);
        when(userService.existsByEmail(dto.getEmail())).thenReturn(false);
        when(userService.registerUser(dto)).thenReturn(responseDTO);
 
        ResponseEntity response = userController.register(dto, bindingResult);
 
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(responseDTO, response.getBody());
    }
 
    // 🔹 Register - validation errors
    @Test
    void testRegisterValidationErrors() {
        UserRegisterDTO dto = new UserRegisterDTO();
 
        when(bindingResult.hasErrors()).thenReturn(true);
        when(bindingResult.getFieldErrors()).thenReturn(List.of(
                new FieldError("user", "email", "Email is required"),
                new FieldError("user", "password", "Password is required")
        ));
 
        ResponseEntity response = userController.register(dto, bindingResult);
 
        assertEquals(400, response.getStatusCodeValue());
        List errors = (List) response.getBody();
        assertTrue(errors.contains("email: Email is required"));
        assertTrue(errors.contains("password: Password is required"));
    }
 
    // 🔹 Register - email already exists
    @Test
    void testRegisterEmailExists() {
        UserRegisterDTO dto = new UserRegisterDTO();
        dto.setEmail("user@example.com");
 
        when(bindingResult.hasErrors()).thenReturn(false);
        when(userService.existsByEmail(dto.getEmail())).thenReturn(true);
 
        ResponseEntity response = userController.register(dto, bindingResult);
 
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Email already registered!", response.getBody());
    }
 
    // 🔹 Login - success
    @Test
    void testLoginSuccess() {
        UserLoginDTO dto = new UserLoginDTO();
        dto.setEmail("user@example.com");
        dto.setPassword("pass");
 
        UserResponseDTO responseDTO = new UserResponseDTO(1L, "User", "user@example.com", Role.USER);
 
        when(userService.login(dto)).thenReturn(Optional.of(responseDTO));
 
        ResponseEntity response = userController.login(dto);
 
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(responseDTO, response.getBody());
    }
 
    // 🔹 Login - failure
    @Test
    void testLoginFailure() {
        UserLoginDTO dto = new UserLoginDTO();
        dto.setEmail("user@example.com");
        dto.setPassword("wrong");
 
        when(userService.login(dto)).thenReturn(Optional.empty());
 
        ResponseEntity response = userController.login(dto);
 
        assertEquals(401, response.getStatusCodeValue());
        assertNull(response.getBody());
    }
 
    // 🔹 Get all users
    @Test
    void testGetAllUsers() {
        List mockList = List.of(
                new UserResponseDTO(1L, "User1", "u1@example.com", Role.USER),
                new UserResponseDTO(2L, "User2", "u2@example.com", Role.USER)
        );
 
        when(userService.getAllUsers()).thenReturn(mockList);
 
        ResponseEntity<List<UserResponseDTO>> response = userController.getAllUsers();
 
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
    }
 
    // 🔹 Get user by ID - found
    @Test
    void testGetUserByIdFound() {
        UserResponseDTO dto = new UserResponseDTO(1L, "User", "user@example.com", Role.USER);
 
        when(userService.getUserById(1L)).thenReturn(Optional.of(dto));
 
        ResponseEntity response = userController.getUserById(1L);
 
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(dto, response.getBody());
    }
 
    // 🔹 Get user by ID - not found
    @Test
    void testGetUserByIdNotFound() {
        when(userService.getUserById(1L)).thenReturn(Optional.empty());
 
        ResponseEntity response = userController.getUserById(1L);
 
        assertEquals(404, response.getStatusCodeValue());
        assertNull(response.getBody());
    }
 
    // 🔹 Delete user
    @Test
    void testDeleteUser() {
        doNothing().when(userService).deleteUser(1L);
 
        ResponseEntity response = userController.deleteUser(1L);
 
        assertEquals(204, response.getStatusCodeValue());
        verify(userService).deleteUser(1L);
    }
}
 
