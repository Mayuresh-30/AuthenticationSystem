package com.authService.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public String extractEmail(String token) {
        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver
    ) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    public String generateToken(
            UserDetails userDetails
    ) {

        Date now = new Date();

        Date expirationDate =
                new Date(
                        System.currentTimeMillis()
                                + jwtExpiration
                );

        return Jwts.builder()
                .subject(
                        userDetails.getUsername()
                )
                .issuedAt(
                        now
                )
                .expiration(
                        expirationDate
                )
                .signWith(
                        getSigningKey()
                )
                .compact();
    }

    public boolean validateToken(
            String token,
            UserDetails userDetails
    ) {

        String email =
                extractEmail(token);

        return email.equals(
                userDetails.getUsername()
        )
                &&
                !isTokenExpired(token);
    }

    private boolean isTokenExpired(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getExpiration
        ).before(
                new Date()
        );
    }

    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()
                .verifyWith(
                        getSigningKey()
                )
                .build()
                .parseSignedClaims(
                        token
                )
                .getPayload();
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                jwtSecret.getBytes(StandardCharsets.UTF_8)
        );
    }
}
