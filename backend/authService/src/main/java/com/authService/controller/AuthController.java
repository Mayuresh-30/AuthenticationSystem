package com.authService.controller;

import com.authService.dto.*;
import com.authService.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserNameResponseWrapper<ApiResponse>> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        UserNameResponseWrapper<ApiResponse> response =
                authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserNameResponseWrapper<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request
    ) {

        UserNameResponseWrapper<AuthResponse> response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<UserNameResponseWrapper<AuthResponse>> refreshToken(
            @Valid @RequestBody RefreshRequest request
    ) {

        UserNameResponseWrapper<AuthResponse> response =
                authService.refreshToken(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(
            @RequestParam Long userId
    ) {

        ApiResponse response =
                authService.logout(userId);

        return ResponseEntity.ok(response);
    }
}
