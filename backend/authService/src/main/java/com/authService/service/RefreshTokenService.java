package com.authService.service;

import com.authService.entity.RefreshToken;
import com.authService.entity.User;
import com.authService.repository.RefreshTokenRepository;
import com.authService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${refresh-token.expiration}")
    private long refreshTokenDuration;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshToken createRefreshToken(
            User user
    ) {

        RefreshToken refreshToken =
                new RefreshToken();

        refreshToken.setUser(user);

        refreshToken.setToken(
                UUID.randomUUID().toString()
        );

        refreshToken.setExpiryDate(
                Instant.now()
                        .plusMillis(
                                refreshTokenDuration
                        )
        );

        return refreshTokenRepository
                .save(refreshToken);
    }

    public RefreshToken verifyExpiration(
            RefreshToken token
    ) {

        if (
                token.getExpiryDate()
                        .compareTo(
                                Instant.now()
                        ) < 0
        ) {

            refreshTokenRepository.delete(
                    token
            );

            throw new RuntimeException(
                    "Refresh token expired"
            );
        }

        return token;
    }

    public Optional<RefreshToken> findByToken(
            String token
    ) {

        return refreshTokenRepository
                .findByToken(token);
    }
    @Transactional
    public void deleteByUserId(
            Long userId
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        refreshTokenRepository
                .deleteByUser(user);
    }
}
