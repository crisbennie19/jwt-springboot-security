package com.starkmark;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.starkmark.entities.User;
import com.starkmark.repositories.UserRepository;
import java.util.stream.Collectors;

@SpringBootApplication
public class SpringJwtSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringJwtSecurityApplication.class, args);
	}
	
	@Autowired
	UserRepository userRepo;
	
	@PostConstruct
	public void initUser() {

		   List<User> users = Stream.of(
	                new User(101, "cris1", "pass1", "xadmin@gmail.com"),
	                new User(102, "cris2", "pass2", "ashish@gmail.com"),
	                new User(103, "cris3", "pass3", "gurpreet@gmail.com"),
	                new User(104, "cris4", "pass4", "mohit@gmail.com")
	        ).collect(Collectors.toList());
		   userRepo.saveAll(users);
	
	}
}
