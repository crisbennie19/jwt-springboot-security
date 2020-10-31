package com.starkmark.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.starkmark.DTOs.AuthRequest;
import com.starkmark.service.CustomUserDetailService;
import com.starkmark.util.JWTUtill;

@RestController

public class UserController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JWTUtill util;

	@GetMapping("/")
	public String welcomeUser() {
		return "Welcome to this home page";
	}
	@PostMapping("/authenticate")
	public String generateToken(@RequestBody AuthRequest authRequest) throws Exception { 	
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		}catch (Exception e) {
           throw new Exception("Invalid username and password");
		}
		return util.generateToken(authRequest.getUsername());
	}
}
