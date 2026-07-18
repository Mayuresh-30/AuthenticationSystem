package com.authService.service;

import com.authService.dto.*;
import com.authService.entity.RefreshToken;
import com.authService.entity.User;
import com.authService.enums.Role;
import com.authService.exception.DuplicateEntityException;
import com.authService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final RefreshTokenService refreshTokenService;

    public UserNameResponseWrapper<ApiResponse> register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateEntityException("Email already exists");
        }
        if(request.getPassword().length() < 8){
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(Role.SHOPKEEPER);

        userRepository.save(user);

//        return new ApiResponse(
//                true,
//                "Registration successful"
//        );
        return new UserNameResponseWrapper<>(user.getName(),new ApiResponse(true,"Registration SuccessFul"));
    }

    public UserNameResponseWrapper<AuthResponse> login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getEmail(),
                                request.getPassword()
                        )
                );

        UserDetails userDetails =
                (UserDetails) authentication.getPrincipal();

        User user =
                userRepository.findByEmail(
                        userDetails.getUsername()
                ).orElseThrow(
                        () -> new UsernameNotFoundException("User not found")
                );

        String accessToken =
                jwtService.generateToken(userDetails);

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);

//        return new AuthResponse(
//                accessToken,
//                refreshToken.getToken()
//
//        );

        return new UserNameResponseWrapper<AuthResponse>(user.getName(),new AuthResponse( accessToken,
                refreshToken.getToken()));
    }

    public UserNameResponseWrapper<AuthResponse> refreshToken(RefreshRequest request) {

        RefreshToken refreshToken =
                refreshTokenService.findByToken(
                        request.getRefreshToken()
                ).orElseThrow(
                        () -> new RuntimeException("Invalid refresh token")
                );

        refreshTokenService.verifyExpiration(refreshToken);

        User user = refreshToken.getUser();

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .builder()
                        .username(user.getEmail())
                        .password(user.getPassword())
                        .roles(user.getRole().name())
                        .build();

        String accessToken =
                jwtService.generateToken(userDetails);

        return new UserNameResponseWrapper<AuthResponse>(user.getName(),new AuthResponse( accessToken,
                refreshToken.getToken()));
    }


    public ApiResponse logout(Long userId) {

        refreshTokenService.deleteByUserId(userId);

        return new ApiResponse(
                true,
                "Logout successful"
        );
    }
}
