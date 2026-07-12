package com.divansh.crm.auth.service;
import com.divansh.crm.auth.dto.LoginRequest;
import com.divansh.crm.auth.dto.AuthResponse;
import com.divansh.crm.auth.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}