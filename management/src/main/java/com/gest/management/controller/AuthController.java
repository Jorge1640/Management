package com.gest.management.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @GetMapping("/login")
    public Map<String, String> login() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Necesita iniciar sesión");
        return response;
    }

    @GetMapping("/check")  // Added this endpoint
    public ResponseEntity<Map<String, Boolean>> checkAuth(Authentication authentication) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user-info")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            throw new RuntimeException("No hay usuario autenticado");
        }

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("name", principal.getAttribute("name"));
        userInfo.put("email", principal.getAttribute("email"));
        userInfo.put("picture", principal.getAttribute("picture"));

        return userInfo;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Boolean>> getAuthStatus(Authentication authentication) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("authenticated", authentication != null && authentication.isAuthenticated());
        return ResponseEntity.ok(response);
    }
}