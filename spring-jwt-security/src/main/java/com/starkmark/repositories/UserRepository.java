package com.starkmark.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.starkmark.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUserName(String username);

}
