package com.authService.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlenotFound(UserNotFoundException ex){
        ErrorResponse error = ErrorResponse.builder()
                .status(404)
                .message("User Not Found")
                .error(ex.getMessage())
                .build();
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(DuplicateEntityException.class)
    public ResponseEntity<ErrorResponse> alreadyExist(DuplicateEntityException ex){
        ErrorResponse error = ErrorResponse.builder()
                .status(409)
                .message("User Already Exist")
                .error(ex.getMessage())
                .build();
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> argumentNotValid(MethodArgumentNotValidException ex){
        ErrorResponse error = ErrorResponse.builder()
                .status(400)
                .message("Arguments are not matching")
                .error(ex.getMessage())
                .build();
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> illegleArgs(IllegalArgumentException ex){
        ErrorResponse error = ErrorResponse.builder()
                .status(400)
                .message("Arguments are illegle")
                .error(ex.getMessage())
                .build();
        return ResponseEntity.badRequest().body(error);
    }
}
